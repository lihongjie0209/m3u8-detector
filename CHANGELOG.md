# 更新日志

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2024-11-06

### 新增
- ✨ 自动检测网页中的m3u8资源链接
- 🌐 网络请求监听，实时捕获m3u8资源
- 🔍 DOM扫描，查找页面中的m3u8链接
- 📋 一键复制链接到剪贴板
- 🎯 Badge数字显示资源数量
- ⚙️ 扩展设置页面，支持自动检测开关
- 🎨 现代化的UI设计

### 技术特性
- 📦 使用Chrome Extension Manifest V3
- 🚀 双重检测机制（网络层 + 页面层）
- 🔄 MutationObserver动态监听DOM变化
- 💾 chrome.storage存储用户设置
- 🎭 防抖优化，避免频繁扫描

### 开发工具
- 🛠️ Node.js构建脚本（替代PowerShell）
- 📦 npm scripts自动化工作流
- 🔍 文件验证和完整性检查
- 👀 开发模式文件监听
- 🎨 自动图标生成

### 文档
- 📚 完整的README文档
- 🚀 快速开始指南
- 📋 命令速查表
- 🔧 构建脚本说明

---

## 版本说明

### [Major版本] - 重大更新
重大架构变更、不兼容的API更改

### [Minor版本] - 功能更新
新增功能，向下兼容

### [Patch版本] - 问题修复
Bug修复、性能优化、文档更新

---

[1.0.0]: https://github.com/yourusername/m3u8-detector/releases/tag/v1.0.0
