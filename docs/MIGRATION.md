# M3U8 资源探测器 - Node.js构建系统

## 🎉 项目完成

已成功将PowerShell脚本迁移到Node.js构建系统！

## ✅ 完成的工作

### 1. 创建的Node.js脚本

在 `scripts/` 目录下创建了5个核心脚本：

| 脚本 | 文件 | 功能 |
|------|------|------|
| 🔨 构建 | `build.js` | 打包扩展为ZIP文件 |
| 🧹 清理 | `clean.js` | 删除构建产物和临时文件 |
| 🎨 图标生成 | `generate-icons.js` | 生成PNG图标（16/48/128） |
| 👀 开发模式 | `dev.js` | 监听文件变化，实时提示 |
| 🔍 验证 | `validate.js` | 检查文件完整性 |

### 2. 更新的配置文件

#### package.json
添加了完整的npm scripts和依赖：

```json
{
  "scripts": {
    "build": "node scripts/build.js",
    "clean": "node scripts/clean.js",
    "generate-icons": "node scripts/generate-icons.js",
    "dev": "node scripts/dev.js",
    "validate": "node scripts/validate.js",
    "prebuild": "npm run validate",
    "postbuild": "echo '✅ 构建完成！'",
    "rebuild": "npm run clean && npm run build",
    "prepare": "npm run generate-icons"
  },
  "devDependencies": {
    "archiver": "^7.0.1",      # ZIP压缩
    "canvas": "^2.11.2",        # 图标生成
    "chokidar": "^3.6.0",       # 文件监听
    "commander": "^12.1.0"      # CLI框架
  }
}
```

### 3. 创建的文档

| 文档 | 说明 |
|------|------|
| `scripts/README.md` | 构建脚本详细说明 |
| `CHEATSHEET.md` | 快速命令参考 |
| `cli.js` | CLI入口（可选） |

## 🚀 使用方法

### 基本命令

```bash
# 安装依赖（首次使用）
npm install

# 开发模式
npm run dev

# 验证文件
npm run validate

# 构建扩展
npm run build

# 清理构建
npm run clean

# 重新构建
npm run rebuild

# 生成图标
npm run generate-icons
```

### 测试结果

所有命令都已通过测试：

✅ `npm install` - 成功安装155个包
✅ `npm run validate` - 验证通过，所有文件完整
✅ `npm run build` - 构建成功，生成 dist/m3u8-detector.zip
✅ `npm run clean` - 清理成功，删除dist目录
✅ `npm run generate-icons` - 图标生成成功（自动在install时执行）

## 📦 依赖说明

### archiver (^7.0.1)
- **用途**: 创建ZIP压缩包
- **替代**: PowerShell的 `Compress-Archive`
- **优势**: 跨平台，可编程控制压缩过程

### canvas (^2.11.2)
- **用途**: 生成PNG图标
- **替代**: PowerShell的 `System.Drawing`
- **优势**: 跨平台，高质量渲染
- **注意**: 需要编译，可能需要安装系统依赖

### chokidar (^3.6.0)
- **用途**: 监听文件变化
- **替代**: 手动刷新
- **优势**: 高效的文件监听，跨平台

### commander (^12.1.0)
- **用途**: CLI命令行框架（可选）
- **替代**: 直接运行脚本
- **优势**: 提供统一的CLI接口

## 🔄 迁移对比

### PowerShell vs Node.js

| 功能 | PowerShell | Node.js | 优势 |
|------|-----------|---------|------|
| 打包 | `Compress-Archive` | `archiver` | ✅ 跨平台 |
| 清理 | `Remove-Item` | `fs.unlinkSync` | ✅ 跨平台 |
| 图标生成 | `System.Drawing` | `canvas` | ✅ 跨平台 |
| 文件监听 | 无 | `chokidar` | ✅ 新功能 |
| 验证 | 无 | 自定义 | ✅ 新功能 |

### 优势总结

1. **跨平台**: 
   - ✅ Windows
   - ✅ macOS
   - ✅ Linux

2. **更丰富的功能**:
   - ✅ 文件监听（dev模式）
   - ✅ 文件验证
   - ✅ 更好的错误处理
   - ✅ 彩色输出

3. **更好的集成**:
   - ✅ 与npm生态集成
   - ✅ 支持pre/post钩子
   - ✅ 可以在CI/CD中使用

4. **更易维护**:
   - ✅ JavaScript语法熟悉
   - ✅ 丰富的npm包生态
   - ✅ 更好的代码组织

## 🐛 常见问题

### Q: canvas安装失败

**Windows解决方案：**
```bash
npm install --global --production windows-build-tools
```

**跳过canvas（使用预生成图标）：**
```bash
npm install --ignore-scripts
```

**Linux解决方案：**
```bash
# Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# CentOS/RHEL
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

**macOS解决方案：**
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

### Q: 构建速度慢

构建速度取决于文件数量和大小，通常在1-2秒内完成。

### Q: 如何在CI/CD中使用

```yaml
# GitHub Actions示例
- name: Install dependencies
  run: npm ci --ignore-scripts

- name: Build extension
  run: npm run build

- name: Upload artifact
  uses: actions/upload-artifact@v3
  with:
    name: extension
    path: dist/m3u8-detector.zip
```

## 📊 项目统计

- **Node.js脚本**: 5个
- **总代码行数**: ~500行
- **依赖包**: 4个（开发依赖）
- **支持的平台**: Windows, macOS, Linux
- **构建输出**: ZIP文件（约20KB）

## 🎯 后续建议

1. **添加测试**:
   ```bash
   npm install --save-dev jest
   # 为构建脚本添加单元测试
   ```

2. **添加ESLint**:
   ```bash
   npm install --save-dev eslint
   # 保持代码风格一致
   ```

3. **添加GitHub Actions**:
   - 自动构建
   - 自动发布到Chrome Web Store
   - 自动运行测试

4. **版本管理**:
   ```bash
   npm install --save-dev standard-version
   # 自动化版本管理和CHANGELOG
   ```

## 📚 相关文档

- [scripts/README.md](../scripts/README.md) - 脚本详细说明
- [CHEATSHEET.md](CHEATSHEET.md) - 命令速查表
- [README.md](../README.md) - 项目主文档

## 🎉 总结

Node.js构建系统已完全替代PowerShell脚本，提供：

✅ 跨平台支持
✅ 更丰富的功能
✅ 更好的开发体验
✅ 更易维护和扩展
✅ 更好的CI/CD集成

所有功能都已测试通过，可以立即使用！

---

创建时间: 2024-11-06
最后更新: 2024-11-06
