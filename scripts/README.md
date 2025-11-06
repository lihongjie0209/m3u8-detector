# 构建脚本使用说明

本项目提供了一套完整的Node.js构建脚本，用于开发、构建和打包Chrome扩展。

## 📦 安装依赖

首次使用前，需要安装Node.js依赖：

```bash
npm install
```

### 依赖说明
- **archiver**: 用于创建ZIP压缩包
- **canvas**: 用于生成PNG图标
- **chokidar**: 用于监听文件变化（开发模式）

## 🚀 可用命令

### 开发命令

#### `npm run dev`
启动开发模式，监听文件变化：
```bash
npm run dev
```

功能：
- 实时监听源代码变化
- 自动提示需要刷新扩展
- 支持热重载提醒

#### `npm run validate`
验证扩展文件的完整性：
```bash
npm run validate
```

检查项：
- ✅ 必需文件是否存在
- ✅ manifest.json格式是否正确
- ✅ 图标文件是否完整
- ✅ 统计代码文件数量

### 构建命令

#### `npm run build`
构建扩展包：
```bash
npm run build
```

功能：
- 自动验证文件（prebuild）
- 打包所有必需文件到ZIP
- 输出到 `dist/m3u8-detector.zip`
- 显示文件大小和路径

#### `npm run rebuild`
清理并重新构建：
```bash
npm run rebuild
```

等同于执行：
```bash
npm run clean && npm run build
```

#### `npm run clean`
清理构建产物：
```bash
npm run clean
```

删除：
- `dist/` 目录
- 根目录的 `.zip` 文件
- 临时文件（`.tmp`, `.temp`, `~`）

### 资源生成

#### `npm run generate-icons`
生成PNG图标：
```bash
npm run generate-icons
```

功能：
- 从代码生成 16x16、48x48、128x128 PNG图标
- 高质量渐变背景
- 自动抗锯齿处理

## 📝 脚本详解

### build.js - 构建脚本
位置：`scripts/build.js`

功能：
- 创建 `dist` 目录
- 打包所有必需文件
- 排除不必要的文件（如 `.ps1`、开发文档）
- 生成 ZIP 压缩包

输出：`dist/m3u8-detector.zip`

### clean.js - 清理脚本
位置：`scripts/clean.js`

功能：
- 递归删除 `dist` 目录
- 删除根目录的 ZIP 文件
- 清理临时文件

### generate-icons.js - 图标生成脚本
位置：`scripts/generate-icons.js`

功能：
- 使用 Canvas API 绘制图标
- 生成三种尺寸的PNG图标
- 支持渐变、圆角、抗锯齿

技术：
- Node.js Canvas 库
- 高质量图像渲染
- 自动缩放适配

### dev.js - 开发模式脚本
位置：`scripts/dev.js`

功能：
- 监听文件变化（JS/HTML/CSS/JSON）
- 实时显示变化提示
- 优雅退出处理

使用场景：
- 开发时自动提醒刷新扩展
- 避免忘记重新加载扩展

### validate.js - 验证脚本
位置：`scripts/validate.js`

功能：
- 检查必需文件
- 验证 manifest.json 格式
- 检查图标完整性
- 统计代码信息

## 🔄 工作流程

### 日常开发流程

1. **初次设置**
   ```bash
   npm install
   npm run generate-icons
   ```

2. **开发模式**
   ```bash
   npm run dev
   ```
   - 修改代码
   - 看到提示后在 `chrome://extensions/` 刷新扩展
   - 继续开发

3. **验证和构建**
   ```bash
   npm run validate  # 验证文件
   npm run build     # 构建扩展包
   ```

### 发布流程

1. **清理并重新构建**
   ```bash
   npm run rebuild
   ```

2. **检查输出**
   ```
   dist/m3u8-detector.zip
   ```

3. **上传到Chrome Web Store**
   - 登录 [Chrome开发者控制台](https://chrome.google.com/webstore/devconsole)
   - 上传 ZIP 文件
   - 填写商店信息
   - 提交审核

## 🛠️ 故障排除

### 安装依赖失败

**问题**：`canvas` 安装失败

**Windows解决方案**：
```bash
# 需要安装 Windows Build Tools
npm install --global --production windows-build-tools

# 或使用预编译版本
npm install canvas --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/
```

**Linux解决方案**：
```bash
# Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# CentOS/RHEL
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

**macOS解决方案**：
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

### 图标生成失败

如果 `canvas` 无法安装，可以：

1. **使用PowerShell脚本**（仅Windows）：
   ```bash
   powershell -ExecutionPolicy Bypass -File icons/generate-icons.ps1
   ```

2. **使用在线工具**：
   - 上传 `icons/icon.svg` 到 [CloudConvert](https://cloudconvert.com/svg-to-png)
   - 生成 16x16、48x48、128x128 PNG

3. **跳过图标生成**：
   - 项目已包含预生成的图标
   - 可以直接使用

### 打包时缺少文件

运行验证命令检查：
```bash
npm run validate
```

根据提示补充缺失的文件。

## 📚 技术栈

- **Node.js** ≥14.0.0
- **archiver** - ZIP压缩
- **canvas** - 图像生成
- **chokidar** - 文件监听

## 🎯 最佳实践

1. **开发前**：运行 `npm run validate` 确保环境正常
2. **开发中**：使用 `npm run dev` 监听文件变化
3. **提交前**：运行 `npm run build` 确保可以正常构建
4. **发布前**：运行 `npm run rebuild` 清理重建

## 📖 相关文档

- [README.md](../README.md) - 项目主文档
- [QUICKSTART.md](../docs/QUICKSTART.md) - 快速开始指南
- [SUMMARY.md](../docs/SUMMARY.md) - 项目总结

---

如有问题，请提交 Issue 或查看完整文档。
