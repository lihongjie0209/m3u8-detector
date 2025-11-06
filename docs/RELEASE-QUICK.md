# 🚀 快速发布命令

## 一键发布

```bash
# Patch版本 (1.0.0 -> 1.0.1) - Bug修复
npm run release:patch

# Minor版本 (1.0.0 -> 1.1.0) - 新功能
npm run release:minor

# Major版本 (1.0.0 -> 2.0.0) - 重大更新
npm run release:major
```

## 前置条件（仅首次）

```bash
# 1. 安装gh CLI
winget install GitHub.cli

# 2. 登录GitHub
gh auth login

# 3. 确认状态
gh auth status
```

## 发布步骤

脚本会自动执行：

1. ✅ 检查环境（gh CLI、登录状态、git状态）
2. ✅ 更新版本号（package.json + manifest.json）
3. ✅ 更新CHANGELOG.md（可选）
4. ✅ 验证扩展文件
5. ✅ 构建扩展包
6. ✅ 提交更改到git
7. ✅ 创建版本标签
8. ✅ 推送到GitHub

## GitHub Actions

推送tag后自动：

1. 🔨 构建扩展包
2. 📦 创建GitHub Release
3. ⬆️ 上传 m3u8-detector.zip

## 查看Release

```bash
# 列出所有releases
gh release list

# 查看最新release
gh release view

# 在浏览器中打开
gh release view --web
```

## 高级用法

```bash
# 指定版本号
node scripts/release.js --version 2.1.0

# 带更新日志
node scripts/release.js --type minor --changelog "
### 新功能
- 添加功能A
- 添加功能B

### 修复
- 修复问题X
"

# 查看帮助
node scripts/release.js --help
```

## 故障排除

```bash
# 检查gh CLI
gh --version

# 检查登录
gh auth status

# 检查git状态
git status

# 查看Actions日志
gh run list
gh run view [run-id]
```

## 回滚发布

```bash
# 删除本地tag
git tag -d v1.0.1

# 删除远程tag
git push --delete origin v1.0.1

# 删除GitHub Release
gh release delete v1.0.1
```

## 文档链接

- 📖 [完整发布指南](RELEASE.md)
- 📋 [更新日志](CHANGELOG.md)
- 🔧 [构建脚本说明](../scripts/README.md)

---

简洁版本 | 详见 [RELEASE.md](RELEASE.md)
