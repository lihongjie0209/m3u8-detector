# 📁 项目文件结构完整指南

本文档详细说明了 M3U8 资源探测器项目中每个文件和目录的用途。

## 📊 项目结构概览

```
m3u8-detector/
├── .github/                    # GitHub 配置
│   └── workflows/              # GitHub Actions 工作流
│       ├── ci.yml              # 持续集成工作流
│       └── release.yml         # 自动发布工作流
│
├── docs/                       # 需求文档
│   └── requirement.md          # 项目原始需求文档
│
├── icons/                      # 扩展图标资源
│   ├── generate-icons.ps1      # PowerShell 图标生成脚本（已废弃）
│   ├── icon.svg                # 原始 SVG 图标
│   ├── icon16.png              # 16x16 工具栏图标
│   ├── icon48.png              # 48x48 扩展管理图标
│   ├── icon128.png             # 128x128 Chrome Web Store 图标
│   └── README.md               # 图标使用说明
│
├── scripts/                    # 构建和自动化脚本
│   ├── build.js                # 构建和打包脚本
│   ├── clean.js                # 清理构建产物
│   ├── dev.js                  # 开发模式文件监视
│   ├── generate-icons.js       # Node.js 图标生成脚本
│   ├── release.js              # 自动化发布脚本
│   ├── validate.js             # 文件完整性验证
│   └── README.md               # 脚本使用说明
│
├── background.js               # 后台服务工作者
├── content.js                  # 内容脚本
├── manifest.json               # 扩展清单文件
│
├── popup.html                  # 弹出窗口 HTML
├── popup.js                    # 弹出窗口逻辑
├── popup.css                   # 弹出窗口样式
│
├── options.html                # 选项页面 HTML
├── options.js                  # 选项页面逻辑
│
├── package.json                # Node.js 项目配置
├── package-lock.json           # 依赖锁定文件
├── .gitignore                  # Git 忽略规则
├── LICENSE                     # MIT 许可证
│
├── README.md                   # 项目主文档
├── CHANGELOG.md                # 版本更新日志
│
├── QUICKSTART.md               # 快速开始指南
├── QUICKSTART-COMPLETE.md      # 完整快速开始（0→发布）
├── CHEATSHEET.md               # 命令速查表
├── FILES.md                    # 文件说明文档
├── MIGRATION.md                # PowerShell → Node.js 迁移指南
│
├── RELEASE.md                  # 完整发布指南
├── RELEASE-QUICK.md            # 发布快速参考
├── GITHUB-SETUP.md             # GitHub 仓库设置指南
└── CI-CD-SUMMARY.md            # CI/CD 系统总结
```

## 🔍 文件详细说明

### 🎯 核心扩展文件

#### `manifest.json`
**用途：** Chrome 扩展的配置清单文件  
**关键配置：**
- `manifest_version: 3` - 使用 Manifest V3 标准
- `permissions` - 扩展所需权限（storage, activeTab, webRequest）
- `background` - 后台服务工作者配置
- `content_scripts` - 内容脚本注入规则
- `action` - 工具栏图标和弹出窗口配置

#### `background.js` (276 行)
**用途：** 后台服务工作者，核心检测逻辑  
**主要功能：**
- 监听 `chrome.webRequest` 网络请求
- 检测 `.m3u8` 资源
- 管理检测结果存储
- 更新工具栏 badge
- 处理来自 popup 和 content 的消息
- 管理标签页关闭时的清理

#### `content.js` (118 行)
**用途：** 注入到网页的内容脚本  
**主要功能：**
- 扫描页面 DOM 查找 m3u8 链接
- 监听 DOM 变化（MutationObserver）
- 多策略检测：
  - `<a>` 标签 href 属性
  - `<video>` 和 `<source>` 标签
  - `<script>` 标签中的 URL
  - 自定义 data 属性
- 向 background 发送检测结果

#### `popup.html` + `popup.js` + `popup.css`
**用途：** 工具栏图标点击后显示的弹出窗口  
**功能：**
- 显示当前页面检测到的 m3u8 链接列表
- 提供一键复制功能
- 清空检测结果
- 跳转到选项页面
- 响应式 UI 设计

#### `options.html` + `options.js`
**用途：** 扩展的设置页面  
**功能：**
- 配置检测选项
- 自定义扩展行为
- 保存用户偏好设置

---

### ⚙️ GitHub Actions 工作流

#### `.github/workflows/ci.yml` (40 行)
**触发条件：**
- Push 到 `main` 或 `develop` 分支
- 针对 `main` 或 `develop` 的 Pull Request

**测试矩阵：**
- Node.js: 16.x, 18.x, 20.x
- OS: ubuntu-latest

**工作流程：**
1. Checkout 代码
2. 设置 Node.js 环境
3. 安装依赖（`npm ci --ignore-scripts`）
4. 验证文件（`npm run validate`）
5. 构建项目（`npm run build`）
6. 上传构建产物（保留 1 天）

#### `.github/workflows/release.yml` (62 行)
**触发条件：**
- 推送形如 `v*.*.*` 的 git tag

**工作流程：**
1. Checkout 代码
2. 提取版本号（从 tag）
3. 设置 Node.js 18.x
4. 安装依赖（`npm ci --ignore-scripts`）
5. 验证文件
6. 构建扩展包
7. 创建 GitHub Release
8. 上传 `m3u8-detector.zip`

**使用的 GitHub Actions：**
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `softprops/action-gh-release@v2`

---

### 🛠️ 构建脚本

#### `scripts/build.js` (109 行)
**用途：** 构建和打包扩展为 ZIP 文件  
**功能：**
- 创建 `dist/` 目录
- 使用 archiver 压缩文件
- 排除不必要的文件（node_modules, .git, scripts, docs, markdown 文件等）
- 输出包大小信息
- 生成 `dist/m3u8-detector.zip`

**依赖：** archiver

#### `scripts/clean.js` (51 行)
**用途：** 清理构建产物  
**功能：**
- 删除 `dist/` 目录
- 删除所有 `.zip` 文件
- 提供详细的清理日志

#### `scripts/validate.js` (99 行)
**用途：** 验证项目文件完整性  
**功能：**
- 检查必需文件是否存在
- 验证 manifest.json 格式
- 验证图标文件存在
- 检查核心脚本文件
- 输出详细的验证报告

#### `scripts/dev.js` (91 行)
**用途：** 开发模式文件监视器  
**功能：**
- 监视关键文件变化
- 自动触发重新构建
- 防抖处理（避免频繁构建）
- 彩色输出日志

**依赖：** chokidar

#### `scripts/generate-icons.js` (153 行)
**用途：** 从 SVG 生成 PNG 图标  
**功能：**
- 读取 `icons/icon.svg`
- 生成 16x16, 48x48, 128x128 尺寸的 PNG
- 使用 canvas 渲染
- 输出详细的生成日志

**依赖：** canvas

#### `scripts/release.js` (436 行)
**用途：** 自动化版本发布脚本  
**功能：**
- 检查 GitHub CLI 安装和认证
- 检查工作目录状态
- 更新 package.json 和 manifest.json 版本
- 更新 CHANGELOG.md
- 创建 git commit 和 tag
- 推送到 GitHub
- 可选：构建项目

**依赖：** commander, fs, child_process

**命令行选项：**
```bash
-v, --version <type>   版本类型 (patch|minor|major)
--dry-run              预演模式
--skip-build          跳过构建
--skip-push           跳过推送
```

---

### 📦 图标资源

#### `icons/icon.svg`
**用途：** 原始矢量图标  
**特点：** 可缩放、无损质量、用于生成 PNG

#### `icons/icon16.png`
**用途：** 工具栏图标  
**尺寸：** 16x16 像素  
**显示位置：** Chrome 工具栏

#### `icons/icon48.png`
**用途：** 扩展管理页面图标  
**尺寸：** 48x48 像素  
**显示位置：** chrome://extensions/

#### `icons/icon128.png`
**用途：** Chrome Web Store 列表图标  
**尺寸：** 128x128 像素  
**显示位置：** 安装过程、Web Store 列表

#### `icons/generate-icons.ps1`
**状态：** 已废弃，保留用于参考  
**替代：** 使用 `scripts/generate-icons.js`

---

### 📝 配置文件

#### `package.json`
**用途：** Node.js 项目配置  
**关键内容：**
- 项目元数据（name, version, description）
- npm scripts（build, clean, dev, validate, release）
- 开发依赖：
  - `archiver@^7.0.1` - ZIP 压缩
  - `canvas@^2.11.2` - PNG 生成
  - `chokidar@^3.6.0` - 文件监视
  - `commander@^12.1.0` - CLI 框架
- 引擎要求：`node >=14.0.0`

#### `package-lock.json`
**用途：** 依赖版本锁定  
**作用：** 确保在不同环境中安装相同版本的依赖

#### `.gitignore`
**用途：** Git 版本控制忽略规则  
**忽略内容：**
- node_modules/
- dist/
- *.zip
- OS 临时文件
- IDE 配置文件
- 日志文件

#### `LICENSE`
**用途：** 开源许可证  
**类型：** MIT License  
**权限：** 允许商业使用、修改、分发

---

### 📚 文档文件

#### 核心文档

**`README.md`** (283 行)
- 项目主文档
- 功能特性介绍
- 安装和使用说明
- 开发指南
- 贡献说明
- 发布流程概述

**`CHANGELOG.md`**
- 版本更新历史
- 每个版本的变更记录
- 遵循 Keep a Changelog 格式

#### 快速入门

**`QUICKSTART.md`**
- 5 分钟快速开始
- 基本使用流程
- 常用命令

**`QUICKSTART-COMPLETE.md`** (370+ 行)
- 从零到发布的完整指南
- 详细的逐步说明
- 包含工具安装、配置、开发、发布全流程
- 故障排除
- 检查清单

**`CHEATSHEET.md`**
- 命令速查表
- npm scripts 快速参考
- Git 命令参考
- 开发工作流程

#### 技术文档

**`FILES.md`** (本文件)
- 项目文件结构说明
- 每个文件的详细用途
- 依赖关系说明

**`MIGRATION.md`**
- PowerShell → Node.js 迁移指南
- 说明为什么迁移
- 新旧脚本对比
- 迁移步骤

#### 发布文档

**`RELEASE.md`** (400+ 行)
- 完整发布指南
- 环境准备
- 发布流程详解
- 版本规范（Semantic Versioning）
- GitHub Actions 详解
- 最佳实践
- 故障排除

**`RELEASE-QUICK.md`**
- 发布命令快速参考
- 常用操作一览
- 快速故障排除

**`GITHUB-SETUP.md`** (300+ 行)
- GitHub 仓库设置完整指南
- Git 和 GitHub CLI 安装
- 仓库初始化步骤
- GitHub Actions 配置
- 测试发布流程
- 详细的故障排除

**`CI-CD-SUMMARY.md`** (350+ 行)
- CI/CD 系统实施总结
- 已添加文件清单
- 核心功能说明
- 工作流程图解
- 安全考虑
- 版本规范指南

#### 需求文档

**`docs/requirement.md`**
- 项目原始需求文档
- 功能需求
- 技术需求
- 实现参考

---

## 📊 文件统计

### 按类型分类

| 类型 | 数量 | 文件 |
|------|------|------|
| 扩展核心 | 8 | manifest.json, background.js, content.js, popup.*, options.* |
| 图标资源 | 5 | icon.svg, icon*.png, README.md, generate-icons.ps1 |
| 构建脚本 | 7 | build.js, clean.js, dev.js, validate.js, generate-icons.js, release.js, README.md |
| GitHub Actions | 2 | ci.yml, release.yml |
| 配置文件 | 4 | package.json, package-lock.json, .gitignore, LICENSE |
| 文档 | 13 | README.md, CHANGELOG.md, QUICKSTART*.md, RELEASE*.md, GITHUB-SETUP.md, CI-CD-SUMMARY.md, FILES.md, CHEATSHEET.md, MIGRATION.md |
| 需求文档 | 1 | docs/requirement.md |

**总计：** 40 个文件（不含 node_modules, dist, .git）

### 代码量统计（估算）

| 类型 | 行数 | 占比 |
|------|------|------|
| JavaScript | ~1,500 | 40% |
| Markdown | ~2,000 | 53% |
| JSON | ~100 | 3% |
| HTML | ~100 | 3% |
| CSS | ~50 | 1% |
| **总计** | **~3,750** | **100%** |

---

## 🔗 文件依赖关系

### 运行时依赖

```
manifest.json
├── background.js
├── content.js
├── popup.html → popup.js → popup.css
├── options.html → options.js
└── icons/*.png
```

### 构建依赖

```
package.json
└── scripts/
    ├── build.js → archiver
    ├── clean.js
    ├── dev.js → chokidar
    ├── generate-icons.js → canvas
    ├── release.js → commander, gh CLI
    └── validate.js
```

### GitHub Actions 依赖

```
.github/workflows/release.yml
├── package.json
├── scripts/validate.js
├── scripts/build.js
└── icons/*.png (预生成)

.github/workflows/ci.yml
├── package.json
├── scripts/validate.js
└── scripts/build.js
```

---

## 📖 文档阅读顺序推荐

### 🚀 新手入门（首次使用）
1. `README.md` - 了解项目
2. `QUICKSTART-COMPLETE.md` - 跟随指南设置
3. `CHEATSHEET.md` - 记住常用命令
4. `docs/requirement.md` - 理解需求

### 🔧 开发者（日常开发）
1. `CHEATSHEET.md` - 命令参考
2. `scripts/README.md` - 脚本说明
3. `FILES.md` (本文件) - 文件结构
4. `manifest.json` + 核心 JS 文件 - 代码

### 📦 发布管理（版本发布）
1. `RELEASE-QUICK.md` - 快速参考
2. `RELEASE.md` - 详细流程
3. `CHANGELOG.md` - 更新日志
4. `CI-CD-SUMMARY.md` - CI/CD 系统

### 🆕 迁移参考（理解变更）
1. `MIGRATION.md` - PowerShell → Node.js
2. `scripts/README.md` - 新脚本系统
3. `CI-CD-SUMMARY.md` - 自动化系统

### 🐛 故障排除
1. `QUICKSTART-COMPLETE.md` - 常见问题
2. `GITHUB-SETUP.md` - GitHub 问题
3. `RELEASE.md` - 发布问题
4. `scripts/README.md` - 脚本问题

---

## 🎯 关键文件速查

### 需要编辑版本号的文件
- `package.json` - `version` 字段
- `manifest.json` - `version` 字段
- `CHANGELOG.md` - 添加新版本记录

*注意：使用 `npm run release:*` 会自动更新*

### 需要提交到 Git 的文件
✅ **必须提交：**
- 所有源代码文件
- `package.json`, `manifest.json`
- 所有文档
- `.github/workflows/*.yml`
- `icons/*.png` (预生成的图标)

❌ **不应提交（.gitignore）：**
- `node_modules/`
- `dist/`
- `*.zip`
- 日志文件
- OS 临时文件

### 不能删除的文件
⚠️ **核心文件（删除会导致扩展无法运行）：**
- `manifest.json`
- `background.js`
- `content.js`
- `popup.*`
- `icons/*.png`

⚠️ **构建必需文件：**
- `package.json`
- `scripts/build.js`
- `scripts/validate.js`

⚠️ **CI/CD 必需文件：**
- `.github/workflows/*.yml`
- `scripts/release.js`

---

## 🔄 文件生命周期

### 开发阶段创建
- 源代码文件（手动编写）
- 配置文件（手动编写）
- 文档（手动编写）

### 构建时生成
- `dist/m3u8-detector.zip` (通过 `npm run build`)
- 可选：`icons/*.png` (通过 `npm run generate-icons`)

### 自动生成（Git）
- `package-lock.json` (通过 `npm install`)
- `.git/` 目录（通过 `git init`）

### CI/CD 自动创建
- GitHub Release（通过 GitHub Actions）
- 构建产物（在 Actions 中）

---

## 📝 维护建议

### 定期更新
- `CHANGELOG.md` - 每次发布前更新
- `README.md` - 功能变更时更新
- 版本号 - 通过 release 脚本自动更新

### 同步修改（保持一致性）
- 修改 `manifest.json` 版本 → 同步 `package.json`
- 添加新功能 → 更新 `README.md` 和 `CHANGELOG.md`
- 修改脚本 → 更新 `scripts/README.md`

### 文档完整性检查
```bash
# 确保所有引用的文件存在
npm run validate

# 检查文档中的链接
# (手动检查 README.md 等文档中的链接)
```

---

这个项目拥有完整的文档体系和自动化工具链！每个文件都有其明确的用途和位置。🎉

如需了解具体文件的详细内容，请直接查看对应的文件。
