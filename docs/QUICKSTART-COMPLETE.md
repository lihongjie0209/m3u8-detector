# 🚀 快速开始 - 从零到发布

**5 分钟快速设置 M3U8 Detector 的完整开发和发布环境。**

## ⚡ 超快速版（已熟悉流程）

```bash
# 1. 安装工具
winget install Git.Git
winget install GitHub.cli
winget install OpenJS.NodeJS

# 2. 配置
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
gh auth login

# 3. 初始化项目
cd d:\code\m3u8-detector
npm install

# 4. 推送到 GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create m3u8-detector --public --source=. --remote=origin
git push -u origin main

# 5. 发布第一个版本
npm run release:patch
```

搞定！🎉

---

## 📝 详细步骤版（首次使用）

### 第 1 步：安装必要工具（5 分钟）

```powershell
# 打开 PowerShell（管理员模式）

# 安装 Git
winget install Git.Git

# 安装 GitHub CLI
winget install GitHub.cli

# 安装 Node.js（如果还没有）
winget install OpenJS.NodeJS

# 重启 PowerShell 使环境变量生效
```

**验证安装：**
```bash
git --version          # 应显示 git version 2.x.x
gh --version           # 应显示 gh version 2.x.x
node --version         # 应显示 v16.x 或更高
npm --version          # 应显示 8.x 或更高
```

### 第 2 步：配置 Git 和 GitHub（2 分钟）

```bash
# 配置 Git 用户信息
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"

# 登录 GitHub CLI
gh auth login
# 选择：
# - GitHub.com
# - HTTPS
# - Yes (authenticate Git)
# - Login with a web browser（推荐）或 Paste an authentication token
```

**验证配置：**
```bash
git config --list | Select-String "user"    # 应显示你的名字和邮箱
gh auth status                              # 应显示 "Logged in to github.com"
```

### 第 3 步：准备项目（1 分钟）

```bash
# 进入项目目录
cd d:\code\m3u8-detector

# 安装依赖
npm install
# 应看到 "added 155 packages"

# 验证项目
npm run validate
# 应显示所有文件存在

# 构建测试
npm run build
# 应创建 dist/m3u8-detector.zip
```

### 第 4 步：创建 GitHub 仓库（2 分钟）

**方式 A：使用 GitHub CLI（推荐）**
```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: M3U8 Detector v1.0.0"

# 创建 GitHub 仓库并推送
gh repo create m3u8-detector --public --source=. --remote=origin

# 推送代码
git push -u origin main
```

**方式 B：手动创建**
1. 访问 https://github.com/new
2. 仓库名：`m3u8-detector`
3. 选择 Public
4. 不勾选任何初始化选项
5. 点击 "Create repository"

```bash
# 初始化并推送
git init
git add .
git commit -m "Initial commit: M3U8 Detector v1.0.0"
git remote add origin https://github.com/你的用户名/m3u8-detector.git
git push -u origin main
```

### 第 5 步：验证 GitHub Actions（1 分钟）

1. 访问你的 GitHub 仓库
2. 点击 "Actions" 标签
3. 应该看到 "CI" 工作流正在运行或已完成（绿色 ✓）

### 第 6 步：发布第一个版本（1 分钟）

```bash
# 发布补丁版本（1.0.0 → 1.0.1）
npm run release:patch
```

**你会看到：**
```
✔ 检测到 GitHub CLI
✔ 已认证 GitHub CLI
✔ 工作目录干净
✔ 更新版本为 1.0.1
✔ 更新 CHANGELOG.md
✔ 创建提交
✔ 创建标签 v1.0.1
✔ 推送到 GitHub

🎉 成功！版本 v1.0.1 已发布！
```

### 第 7 步：验证发布（1 分钟）

1. 访问 GitHub 仓库
2. 点击 "Actions"，应该看到 "Release" 工作流运行中
3. 等待完成（约 1-2 分钟）
4. 点击 "Releases"
5. 应该看到 `v1.0.1` 版本，带有 `m3u8-detector.zip` 下载

---

## 🎯 日常使用

### 开发新功能

```bash
# 1. 创建功能分支
git checkout -b feature/my-new-feature

# 2. 编辑代码...

# 3. 开启开发模式（自动重新构建）
npm run dev

# 4. 在 Chrome 中测试
# chrome://extensions/ → 重新加载扩展

# 5. 提交更改
git add .
git commit -m "feat: add awesome feature"
git push origin feature/my-new-feature

# 6. 在 GitHub 创建 Pull Request
gh pr create --title "Add awesome feature" --body "Description..."

# 7. 合并后，切回主分支
git checkout main
git pull
```

### 发布新版本

```bash
# Bug 修复（1.0.1 → 1.0.2）
npm run release:patch

# 新功能（1.0.2 → 1.1.0）
npm run release:minor

# 重大更新（1.1.0 → 2.0.0）
npm run release:major
```

### 预览发布（不实际发布）

```bash
npm run release:dry
```

---

## 🔧 Chrome 扩展测试

### 首次加载

1. 打开 Chrome
2. 访问 `chrome://extensions/`
3. 启用 "开发者模式"（右上角）
4. 点击 "加载已解压的扩展程序"
5. 选择项目根目录

### 测试功能

1. 访问包含 m3u8 视频的网站（如视频网站）
2. 点击扩展图标
3. 应该看到检测到的 m3u8 链接
4. 测试复制功能
5. 测试设置页面

### 开发调试

```bash
# 监视文件更改，自动重新构建
npm run dev

# 在另一个终端运行验证
npm run validate
```

修改代码后，在 Chrome 中点击扩展卡片上的 "重新加载" 图标。

---

## 📋 常用命令速查

```bash
# 开发
npm install              # 安装依赖
npm run dev             # 开发模式（文件监视）
npm run build           # 构建 ZIP 包
npm run validate        # 验证文件完整性

# 清理
npm run clean           # 删除构建文件
npm run rebuild         # 清理并重新构建

# 图标
npm run generate-icons  # 生成 PNG 图标

# 发布
npm run release:patch   # 发布补丁版本 (x.x.X)
npm run release:minor   # 发布次要版本 (x.X.0)
npm run release:major   # 发布主要版本 (X.0.0)
npm run release:dry     # 预演发布流程

# Git
git status              # 查看状态
git log --oneline       # 查看提交历史
git tag                 # 查看所有标签
gh release list         # 查看所有 Release
```

---

## ❓ 遇到问题？

### 构建失败
```bash
# 清理并重新安装
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Actions 失败
1. 访问 Actions 标签
2. 点击失败的工作流
3. 查看日志找出原因
4. 常见问题：
   - 忘记推送 icons/ 目录
   - package.json 配置错误
   - 权限不足（检查 Secrets）

### 发布脚本错误
```bash
# 检查 GitHub CLI
gh auth status

# 重新登录
gh auth logout
gh auth login

# 检查 Git 状态
git status

# 查看帮助
node scripts/release.js --help
```

---

## 📚 更多文档

| 文档 | 说明 |
|------|------|
| [README.md](../README.md) | 项目主文档 |
| [RELEASE.md](RELEASE.md) | 完整发布指南 |
| [RELEASE-QUICK.md](RELEASE-QUICK.md) | 发布命令速查 |
| [GITHUB-SETUP.md](GITHUB-SETUP.md) | GitHub 详细设置 |
| [CI-CD-SUMMARY.md](CI-CD-SUMMARY.md) | CI/CD 系统总结 |
| [CHANGELOG.md](CHANGELOG.md) | 版本历史 |

---

## ✅ 完成检查清单

设置完成后，确认以下项目：

- [ ] 所有工具已安装（git, gh, node, npm）
- [ ] GitHub CLI 已认证
- [ ] 项目依赖已安装
- [ ] 代码已推送到 GitHub
- [ ] GitHub Actions 运行成功
- [ ] 首次 Release 创建成功
- [ ] Chrome 扩展测试正常

全部完成？**恭喜！你已经掌握了完整的开发和发布流程！** 🎉

---

## 🚀 现在可以开始开发了！

```bash
# 创建新功能
git checkout -b feature/awesome-feature

# 开启开发模式
npm run dev

# 开始编码！
```

Happy coding! 💻✨
