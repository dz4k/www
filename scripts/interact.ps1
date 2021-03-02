
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

if ($action -eq 'reply') {
    $replycontext = "<!doctype html><meta charset=utf-8><blockquote>" + `
        $h.SelectNodes("//*[contains(@class,'e-content')]")[0].InnerHtml | `
        pandoc -f html -t markdown
}

$filename = "$psscriptroot/../entries/$slug.md"

& {

    "---"
    "date: $isodate"
    if ($title) {
        "${prop}:"
        "  name: `"$title`""
        "  url: $url"
    if ($replycontext) {
        "  context: |"
        $replycontext.Split("`n") | %{ "    $_" } }
    } else {
        "${prop}: $url"
    }
    "---"
} | set-content $filename

write-host "$verb `"$title`" <$url> : $filename"
