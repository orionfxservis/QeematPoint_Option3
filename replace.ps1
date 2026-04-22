$files = Get-ChildItem -Path '.' -Recurse -Filter '*.html'
foreach ($f in $files) {
    if ($f.Name -match '\.bak$') { continue }
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $content = $content.Replace('Qeemat Point', 'StopBuy')
    $content = $content.Replace('قِیمَت پوائنٹ', 'اسٹاپ بائے')
    $utf8NoBom = New-Object System.Text.UTF8Encoding($False)
    [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
}
