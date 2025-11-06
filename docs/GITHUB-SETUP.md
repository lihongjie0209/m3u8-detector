# GitHub 仓库设置指南

本指南将帮助您将项目推送到 GitHub 并设置自动化发布流程。

## 📋 前置条件

### 1. 安装 Git
```bash
# Windows (使用 winget)
winget install Git.Git

# 或从官网下载
# https://git-scm.com/download/win
```

### 2. 安装 GitHub CLI
```bash
# Windows (使用 winget)
winget install GitHub.cli

# 或从官网下载
# https://cli.github.com/
```

### 3. 配置 Git
```bash
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"
```

## 🚀 初始化仓库

### 步骤 1: 创建 GitHub 仓库

有两种方式：

#### 方式 A: 使用 GitHub CLI（推荐）
```bash
# 在项目根目录执行
gh auth login

# 创建公开仓库
gh repo create m3u8-detector --public --source=. --remote=origin

# 或创建私有仓库
gh repo create m3u8-detector --private --source=. --remote=origin
```

#### 方式 B: 在 GitHub 网站手动创建
1. 访问 https://github.com/new
2. 仓库名称：`m3u8-detector`
3. 选择公开或私有
4. **不要**勾选"Add a README file"（我们已经有了）
5. 点击"Create repository"

### 步骤 2: 初始化本地仓库（如果还没有）
```bash
# 在项目根目录执行
git init
```

### 步骤 3: 添加远程仓库（如果使用方式B）
```bash
# 替换 yourusername 为你的 GitHub 用户名
git remote add origin https://github.com/yourusername/m3u8-detector.git
```

### 步骤 4: 提交并推送代码
```bash
# 添加所有文件
git add .

# 创建首次提交
git commit -m "Initial commit: M3U8 Detector v1.0.0"

# 推送到 GitHub（首次推送）
git push -u origin main

# 如果默认分支是 master，先重命名
git branch -M main
git push -u origin main
```

## ⚙️ 配置 GitHub Actions

### 步骤 1: 确认工作流文件

确保以下文件存在：
- `.github/workflows/release.yml` - 自动发布工作流
- `.github/workflows/ci.yml` - 持续集成工作流

这些文件已经包含在项目中，会在推送后自动激活。

### 步骤 2: 配置 GitHub Token（如需要）

对于私有仓库或需要额外权限的操作：

1. 访问 https://github.com/settings/tokens/new
2. 创建一个 Personal Access Token (classic)
3. 选择权限：
   - `repo` (完整仓库访问)
   - `workflow` (工作流权限)
4. 复制生成的 token

5. 在仓库中添加 Secret：
   - 访问仓库 → Settings → Secrets and variables → Actions
   - 点击 "New repository secret"
   - Name: `GH_TOKEN`
   - Value: 粘贴你的 token

**注意：** 对于公开仓库，GitHub Actions 提供的 `GITHUB_TOKEN` 通常已经足够。

## 🎉 测试自动化发布

### 步骤 1: 使用发布脚本
```bash
# 确保已认证 GitHub CLI
gh auth status

# 发布一个补丁版本 (1.0.0 → 1.0.1)
npm run release:patch
```

### 步骤 2: 观察 GitHub Actions

1. 访问你的仓库
2. 点击 "Actions" 标签
3. 你应该看到一个正在运行的工作流："Release"
4. 等待工作流完成（通常 1-2 分钟）

### 步骤 3: 检查 Release

1. 点击 "Releases" 标签（右侧栏）
2. 你应该看到新创建的 Release：`v1.0.1`
3. Release 包含：
   - 自动生成的更新说明
   - `m3u8-detector.zip` 下载包
   - Source code 压缩包

## 📝 日常发布流程

### 开发新功能
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并提交
git add .
git commit -m "feat: add new feature"

# 3. 推送分支
git push origin feature/new-feature

# 4. 在 GitHub 创建 Pull Request

# 5. 合并到 main 后
git checkout main
git pull
```

### 发布新版本
```bash
# Bug 修复 (1.0.1 → 1.0.2)
npm run release:patch

# 新功能 (1.0.2 → 1.1.0)
npm run release:minor

# 重大更新 (1.1.0 → 2.0.0)
npm run release:major
```

## 🔧 故障排除

### 问题 1: gh 命令未找到
```bash
# 重新安装 GitHub CLI
winget install GitHub.cli

# 或添加到 PATH
# C:\Program Files\GitHub CLI\
```

### 问题 2: 认证失败
```bash
# 重新登录
gh auth logout
gh auth login
```

### 问题 3: 推送被拒绝
```bash
# 拉取最新更改
git pull --rebase origin main

# 解决冲突后推送
git push
```

### 问题 4: GitHub Actions 失败

1. 检查 Actions 标签中的日志
2. 常见原因：
   - Node.js 版本不兼容（已配置 16/18/20）
   - 依赖安装失败（检查 package.json）
   - 权限问题（检查 token）

### 问题 5: Release 创建失败

确认：
```bash
# 检查 tag 是否存在
git tag

# 检查远程 tag
git ls-remote --tags origin

# 删除错误的 tag（如需要）
git tag -d v1.0.1
git push origin :refs/tags/v1.0.1
```

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/actions)
- [GitHub CLI 文档](https://cli.github.com/manual/)
- [Semantic Versioning](https://semver.org/)
- [完整发布指南](RELEASE.md)
- [快速发布参考](RELEASE-QUICK.md)

## ✅ 检查清单

在推送到 GitHub 前确认：

- [ ] Git 已安装并配置
- [ ] GitHub CLI 已安装并认证
- [ ] 项目已初始化 Git 仓库
- [ ] 远程仓库已创建
- [ ] 所有文件已提交
- [ ] 首次推送成功
- [ ] GitHub Actions 工作流已激活
- [ ] 测试发布流程成功

完成后，你的项目就拥有了完整的自动化发布流程！🎉
