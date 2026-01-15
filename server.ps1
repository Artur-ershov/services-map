# Simple HTTP Server for static files
$port = 8000
$root = Get-Location

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "HTTP Server started at http://localhost:$port/"
Write-Host "Serving files from: $root"
Write-Host "Press Ctrl+C to stop"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") {
        $localPath = "/index.html"
    }
    
    $filePath = Join-Path $root $localPath.TrimStart("/")
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        
        # Determine MIME type
        $mimeType = "text/html"
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        switch ($ext) {
            ".css" { $mimeType = "text/css" }
            ".js" { $mimeType = "application/javascript" }
            ".svg" { $mimeType = "image/svg+xml" }
            ".ttf" { $mimeType = "font/ttf" }
            ".png" { $mimeType = "image/png" }
            ".jpg" { $mimeType = "image/jpeg" }
            ".jpeg" { $mimeType = "image/jpeg" }
        }
        
        $response.ContentType = $mimeType
        $response.ContentLength64 = $content.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $response.Close()
        continue
    }
    
    $response.Close()
}

