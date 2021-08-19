
Import-Module PowerHTML

Function Get-WebmentionEndpoint {
    [OutputType([uri])]
    Param ([uri]$target)
    
    Try {
        $resp = Invoke-WebRequest $target
        $doc = $resp | ConvertFrom-HTML

        # TODO handle HTTP Link header
        $link = $doc.SelectSingleNode('//link[@rel="webmention"]')
        If (-not $link) { Return $null }
        $endpoint = $null
        $href = $link.Attributes['href'].Value
        [uri]::TryCreate($target, $href, [ref]$endpoint) > $null
        Return $endpoint
    } Catch {
        Write-Host "$target : Error looking for webmention endpoint"
        return $null
    }
}

Function Send-Webmention ([uri]$source, [uri]$target) {
    $endpoint = Get-WebmentionEndpoint $target
    if (-not $endpoint) {
        Write-Host "$target : No webmention endpoint"
        Return
    }
    Write-Host "$target : Sending webmention to $endpoint"
        Invoke-WebRequest $endpoint -Method Post `
        -ContentType text/x-www-form-urlencoded `
        -Body @{ source = $source; target = $target }
}

