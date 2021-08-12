#!/usr/bin/env pwsh

param ($action, $url, $title)

Import-Module PowerHTML

function df($d, $f) { get-date -date $d -format $f }

$date = get-date 
$isodate = get-date -date $date -format o
$slug = $title ? "$(df $date yyyy-MM-dd)-$(slugify 	$title)" : (df $date yyyy-MM-dd-HH-mm)

$prop = @{
    like="like of"
    repost="repost of"
    reply="reply to"
    bookmark="bookmark of"
    post=$null
}[$action]

if ($url) {
	$h = (Invoke-WebRequest $url).Content | ConvertFrom-Html
	$targettitle = (
	    $h.SelectNodes("//h1")[0] ?? $h.SelectNodes("//title")[0]
	).InnerText
}

if ($action -eq 'reply') {
    $replycontext = "<!doctype html><meta charset=utf-8>" + `
        $h.SelectNodes("//*[contains(@class,'e-content')]")[0].InnerHtml | `
        pandoc -f html -t markdown
}

$filename = "$psscriptroot/../entries/$slug.md"

& {

	"---"
	if ($title) { "title: $title" }
	"date: $isodate"
	if ($url) {
		if ($targettitle) {
			"${prop}:"
			"  name: $targettitle"
			"  url: $url"
			if ($replycontext) {
				"  context: |"
				$replycontext.Split("`n") | %{ "    $_" }
			}
		} else {
			"${prop}: $url"
		}
	}
	"---"
} | set-content $filename

write-host "$verb `"$title`" <$url> : $filename"
$filename
