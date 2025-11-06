# 图标生成说明

由于需要PNG格式的图标，您可以使用以下方法之一来生成：

## 方法1：使用在线工具
1. 访问 https://cloudconvert.com/svg-to-png
2. 上传 `icon.svg` 文件
3. 分别生成 16x16、48x48 和 128x128 像素的PNG图片
4. 将生成的图片重命名为 `icon16.png`、`icon48.png`、`icon128.png`
5. 放置在 `icons` 文件夹中

## 方法2：使用Inkscape（免费软件）
1. 下载安装 Inkscape: https://inkscape.org/
2. 打开 `icon.svg`
3. 文件 -> 导出PNG图像
4. 分别设置尺寸为 16、48、128 并导出

## 方法3：使用ImageMagick命令行
```bash
# 安装ImageMagick后运行
magick icon.svg -resize 128x128 icon128.png
magick icon.svg -resize 48x48 icon48.png
magick icon.svg -resize 16x16 icon16.png
```

## 临时方案
在开发测试期间，Chrome扩展也可以暂时使用SVG图标，但建议最终使用PNG以获得更好的兼容性。
