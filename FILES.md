# 📋 项目文件清单

## 核心扩展文件

| 文件 | 说明 | 大小 |
|------|------|------|
| `manifest.json` | 扩展配置文件（Manifest V3） | ~500 B |
| `background.js` | 后台服务脚本（网络监听） | ~3 KB |
| `content.js` | 内容脚本（DOM扫描） | ~3 KB |
| `popup.html` | 弹出窗口UI | ~1 KB |
| `popup.js` | 弹出窗口逻辑 | ~2 KB |
| `popup.css` | 弹出窗口样式 | ~2 KB |
| `options.html` | 设置页面UI | ~3 KB |
| `options.js` | 设置页面逻辑 | ~1 KB |

## 资源文件

| 文件 | 说明 | 大小 |
|------|------|------|
| `icons/icon16.png` | 16x16图标 | 0.34 KB |
| `icons/icon48.png` | 48x48图标 | 0.93 KB |
| `icons/icon128.png` | 128x128图标 | 2.05 KB |
| `icons/icon.svg` | SVG源文件 | ~1 KB |

## 构建脚本 (Node.js)

| 文件 | 说明 | 功能 |
|------|------|------|
| `scripts/build.js` | 构建脚本 | 打包扩展为ZIP |
| `scripts/clean.js` | 清理脚本 | 删除构建产物 |
| `scripts/generate-icons.js` | 图标生成 | 生成PNG图标 |
| `scripts/dev.js` | 开发模式 | 监听文件变化 |
| `scripts/validate.js` | 验证脚本 | 检查文件完整性 |
| `scripts/README.md` | 脚本文档 | 使用说明 |

## 文档文件

| 文件 | 说明 |
|------|------|
| `README.md` | 项目主文档（完整说明） |
| `QUICKSTART.md` | 快速开始指南 |
| `CHEATSHEET.md` | 命令速查表 |
| `SUMMARY.md` | 项目总结 |
| `MIGRATION.md` | 构建系统迁移说明 |
| `LICENSE` | MIT开源协议 |
| `docs/requirement.md` | 原始需求文档 |

## 配置文件

| 文件 | 说明 |
|------|------|
| `package.json` | 项目配置（包含npm scripts） |
| `package-lock.json` | 依赖锁定文件 |
| `.gitignore` | Git忽略配置 |
| `cli.js` | CLI入口（可选） |

## 总计

- **核心文件**: 8个（扩展必需）
- **资源文件**: 4个（图标）
- **构建脚本**: 6个（Node.js）
- **文档文件**: 7个
- **配置文件**: 4个
- **总计**: 29个文件

## 生成的文件

### 构建输出
- `dist/m3u8-detector.zip` - 扩展安装包（~20KB）

### 依赖
- `node_modules/` - 155个npm包（开发依赖）

## 文件大小统计

### 源代码
```
核心JavaScript: ~12 KB
HTML文件: ~4 KB
CSS文件: ~2 KB
配置文件: ~2 KB
图标文件: ~3.5 KB
------
总计: ~23.5 KB
```

### 构建产物
```
m3u8-detector.zip: ~20 KB（压缩后）
```

### 完整项目（包含node_modules）
```
约 145 MB（主要是canvas和其依赖）
```

## 可选文件

以下文件是可选的，删除不影响扩展功能：

- ✅ 可删除文档：`QUICKSTART.md`, `SUMMARY.md`, `MIGRATION.md`, `CHEATSHEET.md`
- ✅ 可删除配置：`cli.js`（如果不使用CLI）
- ✅ 可删除源文件：`icons/icon.svg`（已生成PNG）
- ✅ 可删除脚本：整个`scripts/`目录（发布后不需要）

## 最小发布包

仅包含扩展运行必需的文件：

```
m3u8-detector/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── popup.css
├── options.html
├── options.js
├── LICENSE
├── README.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

**大小**: ~23 KB（未压缩）

---

更新时间: 2024-11-06
