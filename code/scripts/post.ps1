
param ($action, $url)

Import-Module PowerHTML

$date = get-date 
$isodate = get-date -date $date -format o
$slug = get-date -date $date -format 'yyyy-MM-dd-HH-mm'

$prop = @{
    like="likeOf"
    repost="repostOf"
    reply="replyTo"
    bookmark="bookmarkOf"
}[$action]

$h = (Invoke-WebRequest $url).Content | ConvertFrom-Html
$title = $h.SelectNodes("//title")[0].InnerText

$url = $url

if ($action -eq 'reply') {
    $replycontext = "<!doctype html><meta charset=utf-8><blockquote>" + `
        $h.SelectNodes("//*[contains(@class,'e-content')]")[0].InnerHtml | `
        pandoc -f html -t markdown
}

$filename = "$psscriptroot/../posts/$slug.md"

& {

    "---"
    "date: $isodate"
    if ($title) {
        "${prop}:"
        "  name: `"$title`""
        "  url: $url"
    } else {
        "${prop}: $url"
    }
    "---"
    if ($replycontext) { "`n"+$replycontext }
} | set-content $filename

$filename
