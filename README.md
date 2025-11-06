# M3U8 资源探测器

<div align="center">

![M3U8 Detector](icons/icon128.png)

一个强大的Chrome浏览器扩展，用于自动检测和管理网页中的m3u8视频流资源。

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue?style=flat-square&logo=google-chrome)](https://chrome.google.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/lihongjie0209/m3u8-detector?style=flat-square)](https://github.com/lihongjie0209/m3u8-detector/releases)
[![CI Status](https://img.shields.io/github/actions/workflow/status/lihongjie0209/m3u8-detector/ci.yml?style=flat-square&label=CI)](https://github.com/lihongjie0209/m3u8-detector/actions)

</div>

## ✨ 功能特性

- 🔍 **自动检测** - 实时监控网络请求，自动捕获m3u8资源
- 📄 **页面扫描** - 智能扫描页面DOM，查找隐藏的m3u8链接
- 🎯 **直观显示** - 工具栏Badge实时显示检测到的资源数量
- 📋 **一键复制** - 便捷的复制功能，快速获取资源链接
- 🔄 **动态监听** - 监听页面DOM变化，实时更新资源列表
- ⚙️ **灵活配置** - 可自定义检测规则和显示选项

## 📸 功能演示

### 主界面
弹出窗口展示检测到的所有m3u8资源，提供清晰的列表视图和便捷的复制按钮。

### 设置页面
提供丰富的配置选项，可以根据需要启用或禁用特定功能。

## 🚀 安装方法

### 方法一：从源码安装（开发模式）

1. **克隆或下载此项目**
   ```bash
   git clone https://github.com/yourusername/m3u8-detector.git
   cd m3u8-detector
   ```

2. **打开Chrome扩展管理页面**
   - 在Chrome地址栏输入：`chrome://extensions/`
   - 或点击菜单 → 更多工具 → 扩展程序

3. **启用开发者模式**
   - 点击右上角的"开发者模式"开关

4. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

5. **完成安装**
   - 扩展图标将出现在Chrome工具栏
   - 点击图标即可使用

### 方法二：从Chrome Web Store安装（即将上线）

待扩展发布到Chrome Web Store后，可直接安装。

## 📖 使用指南

### 基本使用

1. **访问包含视频的网页**
   - 打开任何可能包含m3u8资源的网页
   - 扩展会自动开始检测

2. **查看检测结果**
   - 工具栏图标上的Badge数字显示检测到的资源数量
   - 点击图标打开弹出窗口查看详细列表

3. **复制资源链接**
   - 在弹出窗口中点击"📋 复制"按钮
   - 链接将被复制到剪贴板

4. **清除列表**
   - 点击"清除列表"按钮可清空当前页面的检测记录
   - 页面刷新时会自动清空

### 高级功能

#### 自定义设置

点击弹出窗口的"设置"按钮，可以配置：

- **启用自动检测** - 控制是否扫描页面DOM内容
- **显示通知** - 检测到新资源时显示桌面通知（待实现）

#### 检测原理

扩展采用双重检测机制：

1. **网络层检测**
   - 使用Chrome的webRequest API监听所有网络请求
   - 自动捕获包含`.m3u8`的资源请求
   - 无需页面加载完成即可检测

2. **页面层检测**
   - 扫描所有`<a>`标签的href属性
   - 检查`<video>`和`<source>`标签的src属性
   - 分析JavaScript代码中的URL字符串
   - 检查所有元素的data属性
   - 使用MutationObserver监听DOM变化

## 🏗️ 项目结构

```
m3u8-detector/
├── manifest.json          # 扩展配置文件
├── background.js          # 后台服务脚本（网络监听、状态管理）
├── content.js            # 内容脚本（页面扫描）
├── popup.html            # 弹出窗口界面
├── popup.js              # 弹出窗口逻辑
├── popup.css             # 弹出窗口样式
├── options.html          # 设置页面界面
├── options.js            # 设置页面逻辑
├── icons/                # 图标资源
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
├── scripts/              # 构建脚本（Node.js）
│   ├── build.js         # 打包脚本
│   ├── clean.js         # 清理脚本
│   ├── generate-icons.js # 图标生成脚本
│   ├── dev.js           # 开发模式脚本
│   ├── validate.js      # 验证脚本
│   └── README.md        # 脚本使用说明
├── docs/                 # 文档
│   └── requirement.md    # 需求文档
├── package.json          # 项目配置和脚本
└── README.md            # 项目说明
```

## 🔧 开发指南

### 技术栈

- **Chrome Extension Manifest V3** - 最新的扩展开发标准
- **Vanilla JavaScript** - 无需任何框架，纯原生JS
- **Chrome APIs**
  - `chrome.webRequest` - 网络请求监听
  - `chrome.storage` - 数据存储
  - `chrome.runtime` - 消息传递
  - `chrome.tabs` - 标签页管理

### 开发环境设置

1. **安装必要工具**
   - Node.js（≥14.0.0）
   - Chrome浏览器（最新版本）
   - 代码编辑器（推荐VS Code）

2. **安装项目依赖**
   ```bash
   npm install
   ```

3. **可用的开发命令**
   ```bash
   npm run dev          # 启动开发模式，监听文件变化
   npm run validate     # 验证扩展文件完整性
   npm run build        # 构建扩展包
   npm run clean        # 清理构建产物
   npm run rebuild      # 清理并重新构建
   npm run generate-icons  # 生成图标文件
   ```

4. **代码修改后重载**
   - 使用 `npm run dev` 开发模式会自动提示
   - 在`chrome://extensions/`页面点击扩展的刷新按钮
   - 或使用快捷键重载

> 📖 详细的脚本使用说明请查看 [scripts/README.md](scripts/README.md)

### 调试技巧

#### 调试后台脚本
```javascript
// 在chrome://extensions/页面
// 点击扩展的"Service Worker"链接
// 在打开的DevTools中查看console日志
console.log('M3U8资源探测器已启动');
```

#### 调试内容脚本
```javascript
// 在目标网页上按F12打开DevTools
// 内容脚本的console.log会显示在网页的控制台中
console.log('M3U8检测内容脚本已加载');
```

#### 调试弹出窗口
```javascript
// 右键点击扩展图标 → 检查弹出内容
// 在打开的DevTools中调试popup.js
```

## 🛠️ 功能扩展建议

以下是一些可以进一步实现的功能：

### 短期计划
- [ ] 添加桌面通知功能
- [ ] 支持资源URL过滤和正则匹配
- [ ] 导出检测结果为JSON/TXT文件
- [ ] 添加链接有效性检测

### 长期计划
- [ ] 通过WebSocket与本地下载工具通信
- [ ] 集成常用的m3u8下载工具
- [ ] 支持视频预览功能
- [ ] 添加资源收藏和历史记录
- [ ] 支持批量操作和导出
- [ ] 提供API给第三方工具调用

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 发布流程

本项目使用自动化发布流程：

1. **本地开发发布**
   ```bash
   # 安装 GitHub CLI（首次使用）
   winget install GitHub.cli
   gh auth login
   
   # 使用自动化脚本发布新版本
   npm run release:patch  # 1.0.0 → 1.0.1 (bug fixes)
   npm run release:minor  # 1.0.0 → 1.1.0 (new features)
   npm run release:major  # 1.0.0 → 2.0.0 (breaking changes)
   ```

2. **GitHub Actions 自动发布**
   - 推送版本标签后，GitHub Actions 自动构建并创建 Release
   - 查看 `.github/workflows/release.yml` 了解详情

3. **持续集成**
   - 每次推送和 PR 都会触发自动测试
   - 支持 Node.js 16/18/20 多版本测试
   - 查看 `.github/workflows/ci.yml` 了解详情

详细的发布文档：
- 📖 [完整发布指南](RELEASE.md) - 详细说明和最佳实践
- 🚀 [快速发布参考](RELEASE-QUICK.md) - 常用命令速查
- 📝 [更新日志](CHANGELOG.md) - 版本历史记录

### 提交Issue
- 请详细描述问题或建议
- 提供复现步骤（如果是bug）
- 附上截图或日志（如果可能）

### 提交PR
1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📝 更新日志

### v1.0.0 (2024-11-06)
- ✨ 初始版本发布
- 🔍 实现基本的m3u8资源检测功能
- 📋 提供复制链接功能
- ⚙️ 添加基础设置选项
- 🎨 设计现代化的UI界面

## ⚠️ 注意事项

1. **隐私保护**
   - 扩展仅在本地处理数据，不上传任何信息到服务器
   - 所有检测到的链接仅存储在浏览器内存中

2. **使用限制**
   - 某些网站可能使用防护措施阻止扩展检测
   - 加密或混淆的m3u8链接可能无法识别

3. **法律声明**
   - 请遵守相关法律法规
   - 仅用于合法的学习和研究目的
   - 不得用于侵犯版权的行为

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/yourusername/m3u8-detector/issues)
- 发送邮件至：your.email@example.com

## 🙏 致谢

感谢所有为这个项目提供建议和贡献的朋友们！

---

<div align="center">

Made with ❤️ by [Your Name]

如果这个项目对你有帮助，欢迎给个⭐️

</div>
