# 🚀 发布指南

本文档说明如何使用GitHub Actions自动发布M3U8资源探测器的新版本。

## 📋 前置条件

### 1. 安装GitHub CLI

**Windows:**
```bash
winget install --id GitHub.cli
# 或使用 scoop
scoop install gh
```

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Arch Linux
sudo pacman -S github-cli
```

### 2. 登录GitHub

```bash
gh auth login
```

按照提示选择：
1. GitHub.com
2. HTTPS
3. 使用浏览器登录

### 3. 确认工作目录干净

```bash
git status
```

确保没有未提交的更改。

## 🎯 发布流程

### 方式一：使用npm脚本（推荐）

#### 发布Patch版本（bug修复）
```bash
npm run release:patch
# 1.0.0 -> 1.0.1
```

#### 发布Minor版本（新功能）
```bash
npm run release:minor
# 1.0.0 -> 1.1.0
```

#### 发布Major版本（重大更新）
```bash
npm run release:major
# 1.0.0 -> 2.0.0
```

#### 指定版本号
```bash
node scripts/release.js --version 2.1.0
```

#### 带更新日志
```bash
node scripts/release.js --type minor --changelog "### 新功能
- 添加视频预览功能
- 支持批量下载

### 修复
- 修复某些网站检测失败的问题"
```

### 方式二：手动发布

#### 1. 更新版本号

编辑 `package.json` 和 `manifest.json`：
```json
{
  "version": "1.0.1"
}
```

#### 2. 更新CHANGELOG.md

```markdown
## [1.0.1] - 2024-11-07

### 修复
- 修复某些网站检测失败的问题
- 优化性能
```

#### 3. 提交更改

```bash
git add package.json manifest.json CHANGELOG.md
git commit -m "chore: release v1.0.1"
```

#### 4. 创建标签

```bash
git tag -a v1.0.1 -m "Release v1.0.1"
```

#### 5. 推送到GitHub

```bash
git push origin main
git push origin v1.0.1
```

## 🔄 自动化流程

推送tag后，GitHub Actions会自动：

1. ✅ **安装依赖** - 安装Node.js和npm包
2. ✅ **验证文件** - 运行 `npm run validate`
3. ✅ **构建扩展** - 运行 `npm run build`
4. ✅ **创建Release** - 创建GitHub Release
5. ✅ **上传附件** - 上传 `m3u8-detector.zip`
6. ✅ **保存产物** - 上传到GitHub Artifacts

## 📦 查看Release

### 在GitHub网站
访问: `https://github.com/yourusername/m3u8-detector/releases`

### 使用gh CLI
```bash
# 查看所有releases
gh release list

# 查看特定release
gh release view v1.0.0

# 下载release资源
gh release download v1.0.0
```

## 🎨 GitHub Actions工作流

### release.yml - 发布工作流

触发条件：推送版本标签（如 `v1.0.0`）

主要步骤：
- Checkout代码
- 设置Node.js环境
- 安装依赖（跳过可选依赖）
- 验证扩展文件
- 构建扩展包
- 创建GitHub Release
- 上传扩展包

### ci.yml - CI工作流

触发条件：Push到main/develop或PR

主要步骤：
- 在多个Node.js版本上测试（16, 18, 20）
- 验证和构建
- 上传构建产物

## 📝 版本号规范

遵循[语义化版本](https://semver.org/lang/zh-CN/)规范：

```
主版本号.次版本号.修订号

例如: 1.2.3
```

### 版本递增规则

1. **主版本号（Major）**: 重大更新，不兼容的API更改
   - `1.0.0` -> `2.0.0`
   - 示例：完全重写、架构变更

2. **次版本号（Minor）**: 新功能，向下兼容
   - `1.0.0` -> `1.1.0`
   - 示例：添加新功能、改进UI

3. **修订号（Patch）**: Bug修复，向下兼容
   - `1.0.0` -> `1.0.1`
   - 示例：修复bug、性能优化

## 📋 发布检查清单

发布前确认：

- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] CHANGELOG.md已更新
- [ ] 版本号已更新（package.json + manifest.json）
- [ ] 本地构建成功（`npm run build`）
- [ ] 本地验证通过（`npm run validate`）
- [ ] 工作目录干净（`git status`）
- [ ] 已推送到main分支

## 🔍 故障排除

### 问题1: gh命令找不到

```bash
# 检查安装
gh --version

# 如果未安装，参考"前置条件"章节
```

### 问题2: 未登录GitHub

```bash
# 检查登录状态
gh auth status

# 如果未登录
gh auth login
```

### 问题3: 工作目录不干净

```bash
# 查看状态
git status

# 提交更改
git add .
git commit -m "描述"

# 或暂存更改
git stash
```

### 问题4: GitHub Actions失败

1. 访问Actions页面查看日志
2. 常见原因：
   - 依赖安装失败（canvas编译）
   - 文件验证失败
   - 权限问题

**解决方案**：
- 检查 `.github/workflows/release.yml`
- 确保使用 `npm ci --ignore-scripts`
- 确保图标文件已提交

### 问题5: Release创建失败

检查GitHub Token权限：
- 在工作流中使用 `${{ secrets.GITHUB_TOKEN }}`
- 确保workflow有 `contents: write` 权限

## 📊 发布历史

查看所有发布记录：

```bash
# 使用gh CLI
gh release list

# 使用git
git tag -l -n1
```

## 🔗 相关链接

- [GitHub Actions文档](https://docs.github.com/cn/actions)
- [GitHub CLI文档](https://cli.github.com/manual/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

## 💡 最佳实践

1. **频繁发布小更新** - 比一次大更新更好
2. **详细的CHANGELOG** - 让用户了解每次更新的内容
3. **语义化版本** - 让用户知道更新的重要性
4. **测试后发布** - 确保质量
5. **备份重要分支** - 防止意外

## 📞 获取帮助

遇到问题？

1. 查看[GitHub Discussions](https://github.com/yourusername/m3u8-detector/discussions)
2. 提交[Issue](https://github.com/yourusername/m3u8-detector/issues)
3. 查看[Actions运行日志](https://github.com/yourusername/m3u8-detector/actions)

---

最后更新: 2024-11-06
