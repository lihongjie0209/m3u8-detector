Add-Type -AssemblyName System.Drawing

# 创建128x128的主图标
$bmp = New-Object System.Drawing.Bitmap(128, 128)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# 绘制渐变背景
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.Point]::new(0, 0),
    [System.Drawing.Point]::new(128, 128),
    [System.Drawing.Color]::FromArgb(102, 126, 234),
    [System.Drawing.Color]::FromArgb(118, 75, 162)
)
$graphics.FillRectangle($brush, 0, 0, 128, 128)

# 绘制白色视频框
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 255, 255, 255))
$graphics.FillRectangle($whiteBrush, 24, 24, 80, 56)

# 绘制播放按钮
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(102, 126, 234))
$points = @(
    [System.Drawing.Point]::new(54, 44),
    [System.Drawing.Point]::new(54, 68),
    [System.Drawing.Point]::new(78, 56)
)
$graphics.FillPolygon($blueBrush, $points)

# 绘制流式传输线条
$graphics.FillRectangle($whiteBrush, 24, 88, 24, 4)
$graphics.FillRectangle($whiteBrush, 52, 88, 24, 4)
$graphics.FillRectangle($whiteBrush, 80, 88, 24, 4)

# 保存128x128图标
$bmp.Save("$PSScriptRoot\icon128.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created icon128.png"

# 创建48x48图标
$bmp48 = New-Object System.Drawing.Bitmap($bmp, 48, 48)
$bmp48.Save("$PSScriptRoot\icon48.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created icon48.png"

# 创建16x16图标
$bmp16 = New-Object System.Drawing.Bitmap($bmp, 16, 16)
$bmp16.Save("$PSScriptRoot\icon16.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created icon16.png"

# 清理资源
$graphics.Dispose()
$brush.Dispose()
$whiteBrush.Dispose()
$blueBrush.Dispose()
$bmp.Dispose()
$bmp48.Dispose()
$bmp16.Dispose()

Write-Host "All icons generated successfully!"
