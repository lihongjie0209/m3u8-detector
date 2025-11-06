# 🎯 下一步该做什么？

**恭喜！你现在拥有了一个完整的 M3U8 资源探测器 Chrome 扩展项目，包括自动化 CI/CD 发布系统。**

但是... 项目还在本地，需要推送到 GitHub 并测试发布流程。按照以下步骤完成设置！

---

## 📋 快速检查清单

在开始之前，确认以下内容：

- [ ] 你已经在 `d:\code\m3u8-detector` 目录
- [ ] 运行了 `npm install` 并成功安装依赖
- [ ] 运行了 `npm run validate` 并通过验证
- [ ] 运行了 `npm run build` 并生成了 ZIP 文件

如果全部通过，继续下一步！ ✅

---

## 🚀 立即行动（必需完成）

### 第 1 步：安装必要工具（5 分钟）

```powershell
# 1. 安装 Git（如果还没有）
winget install Git.Git

# 2. 安装 GitHub CLI
winget install GitHub.cli

# 3. 重启 PowerShell（使环境变量生效）
# 关闭并重新打开 PowerShell
```

**验证安装：**
```bash
git --version    # 应显示 git version 2.x.x
gh --version     # 应显示 gh version 2.x.x
```

---

### 第 2 步：配置 Git 和 GitHub（3 分钟）

```bash
# 配置 Git 用户信息
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"

# 登录 GitHub
gh auth login
# 按照提示选择：
# - GitHub.com
# - HTTPS
# - Yes (authenticate Git)
# - Login with a web browser（推荐）
```

**验证配置：**
```bash
git config --list | Select-String "user"    # 显示你的用户信息
gh auth status                              # 显示 "Logged in to github.com"
```

---

### 第 3 步：初始化并推送到 GitHub（3 分钟）

```bash
# 进入项目目录（如果还没有）
cd d:\code\m3u8-detector

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建首次提交
git commit -m "Initial commit: M3U8 Detector v1.0.0"

# 创建 GitHub 仓库并推送（一条命令完成！）
gh repo create m3u8-detector --public --source=. --remote=origin

# 如果上面的命令已经推送，跳过此步骤
# 否则手动推送：
git push -u origin main
```

**验证推送：**
```bash
# 在浏览器中打开你的仓库
gh repo view --web
```

你应该看到所有文件都在 GitHub 上了！ 🎉

---

### 第 4 步：验证 GitHub Actions（2 分钟）

1. 访问你的 GitHub 仓库
2. 点击顶部的 **"Actions"** 标签
3. 你应该看到 **"CI"** 工作流正在运行（或已完成）
4. 等待它变成绿色 ✅

如果失败了（红色 ❌），点击查看日志，通常是因为：
- 忘记推送 `icons/` 目录中的 PNG 文件
- `package.json` 配置问题

---

### 第 5 步：发布第一个版本（2 分钟）

```bash
# 发布补丁版本（1.0.0 → 1.0.1）
npm run release:patch
```

**你会看到脚本自动完成：**
- ✔ 检查环境
- ✔ 更新版本号
- ✔ 更新 CHANGELOG
- ✔ 创建 Git commit
- ✔ 创建 Git tag (v1.0.1)
- ✔ 推送到 GitHub

**然后在 GitHub 上：**
1. 点击 **"Actions"** 标签
2. 看到 **"Release"** 工作流运行中
3. 等待完成（约 1-2 分钟）
4. 点击右侧 **"Releases"**
5. 看到 **v1.0.1** 版本，带有 `m3u8-detector.zip` 下载！

🎉 **恭喜！你已经完成了第一次自动化发布！**

---

## 🎓 学习下一步

现在你已经有了一个工作的项目，可以：

### 📖 深入了解（推荐阅读）

1. **[QUICKSTART-COMPLETE.md](QUICKSTART-COMPLETE.md)**  
   从零到发布的完整指南，包含所有细节

2. **[RELEASE.md](RELEASE.md)**  
   完整的发布指南，400+ 行详细说明

3. **[PROJECT-FILES.md](PROJECT-FILES.md)**  
   项目文件结构完整指南，了解每个文件的作用

4. **[CHEATSHEET.md](CHEATSHEET.md)**  
   命令速查表，日常开发必备

### 🧪 测试扩展功能

1. 打开 Chrome
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"（右上角）
4. 点击"加载已解压的扩展程序"
5. 选择 `d:\code\m3u8-detector` 目录
6. 访问视频网站测试检测功能！

### 🔧 开始开发

```bash
# 开启开发模式（自动监视文件变化）
npm run dev

# 在另一个终端，随时验证
npm run validate
npm run build
```

修改代码后，在 Chrome 扩展页面点击"重新加载"图标。

---

## 🎯 常见后续任务

### 修复 README 中的占位符

在推送后，更新 `README.md` 中的占位符：

```markdown
# 查找并替换 "yourusername" 为你的 GitHub 用户名

[![GitHub Release](https://img.shields.io/github/v/release/yourusername/m3u8-detector?style=flat-square)](https://github.com/yourusername/m3u8-detector/releases)
```

改为：
```markdown
[![GitHub Release](https://img.shields.io/github/v/release/你的用户名/m3u8-detector?style=flat-square)](https://github.com/你的用户名/m3u8-detector/releases)
```

然后：
```bash
git add README.md
git commit -m "docs: update repository URLs"
git push
```

### 添加项目截图

1. 在 Chrome 中使用扩展，截图
2. 保存图片到 `screenshots/` 目录
3. 更新 `README.md` 添加图片：
   ```markdown
   ![功能演示](screenshots/demo.png)
   ```
4. 提交并推送

### 发布到 Chrome Web Store

1. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. 注册开发者账号（一次性费用 $5）
3. 上传 `dist/m3u8-detector.zip`
4. 填写商店列表信息
5. 提交审核

详细指南见官方文档。

---

## 🆘 遇到问题？

### 问题 1: git 或 gh 命令未找到

**解决方案：**
```bash
# 重新安装
winget install Git.Git
winget install GitHub.cli

# 重启 PowerShell
```

### 问题 2: gh auth login 失败

**解决方案：**
```bash
# 使用网页浏览器方式
gh auth login
# 选择 "Login with a web browser"
# 在浏览器中完成授权
```

### 问题 3: npm run release:patch 失败

**常见原因和解决方案：**

1. **未认证 GitHub CLI**
   ```bash
   gh auth status
   gh auth login
   ```

2. **有未提交的更改**
   ```bash
   git status
   git add .
   git commit -m "your message"
   ```

3. **tag 已存在**
   ```bash
   # 删除本地 tag
   git tag -d v1.0.1
   # 删除远程 tag
   git push origin :refs/tags/v1.0.1
   ```

### 问题 4: GitHub Actions 失败

**解决步骤：**
1. 访问仓库 → Actions 标签
2. 点击失败的工作流
3. 查看详细日志
4. 常见问题：
   - 忘记推送 `icons/*.png` 文件
   - `package.json` 配置错误

### 问题 5: 扩展在 Chrome 中加载失败

**解决方案：**
```bash
npm run validate    # 检查文件完整性
npm run build      # 重新构建
# 然后在 Chrome 扩展页面重新加载
```

---

## 📚 完整文档索引

| 文档 | 用途 | 何时阅读 |
|------|------|---------|
| [README.md](../README.md) | 项目主文档 | 首次了解项目 |
| [QUICKSTART-COMPLETE.md](QUICKSTART-COMPLETE.md) | 完整快速开始 | 首次设置 |
| [NEXT-STEPS.md](NEXT-STEPS.md) | 下一步指南（本文件） | 完成初始化后 |
| [CHEATSHEET.md](CHEATSHEET.md) | 命令速查 | 日常开发 |
| [PROJECT-FILES.md](PROJECT-FILES.md) | 文件结构 | 了解项目结构 |
| [MIGRATION.md](MIGRATION.md) | 迁移指南 | 理解脚本变更 |
| [RELEASE.md](RELEASE.md) | 完整发布指南 | 深入了解发布流程 |
| [RELEASE-QUICK.md](RELEASE-QUICK.md) | 发布快速参考 | 发布版本时 |
| [GITHUB-SETUP.md](GITHUB-SETUP.md) | GitHub 设置 | GitHub 配置问题 |
| [CI-CD-SUMMARY.md](CI-CD-SUMMARY.md) | CI/CD 总结 | 了解自动化系统 |
| [PROJECT-CHECKLIST.md](PROJECT-CHECKLIST.md) | 项目检查清单 | 验证项目完成度 |
| [CHANGELOG.md](CHANGELOG.md) | 版本历史 | 查看更新记录 |

---

## ✅ 完成确认

完成上述所有步骤后，确认：

- [x] Git 和 GitHub CLI 已安装并配置
- [x] 代码已推送到 GitHub
- [x] GitHub Actions CI 运行成功（绿色 ✓）
- [x] 第一个 Release 创建成功（v1.0.1）
- [x] 可以下载 `m3u8-detector.zip`
- [x] Chrome 扩展加载成功并正常工作

**全部完成？恭喜！你已经掌握了完整的开发和发布流程！** 🎉

---

## 🚀 现在开始开发吧！

```bash
# 创建新功能分支
git checkout -b feature/awesome-feature

# 开启开发模式
npm run dev

# 开始编码！
# 编辑 background.js, content.js, popup.js 等文件
# Chrome 扩展页面点击"重新加载"测试

# 完成后提交
git add .
git commit -m "feat: add awesome feature"
git push origin feature/awesome-feature

# 在 GitHub 创建 Pull Request
gh pr create

# 合并后发布新版本
git checkout main
git pull
npm run release:minor  # 新功能用 minor 版本
```

---

## 💡 提示

- 经常运行 `npm run validate` 确保文件完整
- 使用 `npm run dev` 提高开发效率
- 发布前运行 `npm run release:dry` 预演
- 查看 `CHEATSHEET.md` 快速找到命令
- 遇到问题先看文档，再搜索错误信息

---

**Happy Coding! 开始你的 Chrome 扩展开发之旅吧！** 🚀✨

有问题？查看相关文档或在 GitHub Issues 中提问。
