#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 执行命令并返回输出
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    }).trim();
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return '';
  }
}

/**
 * 检查gh CLI是否安装
 */
function checkGhCli() {
  try {
    exec('gh --version', { silent: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * 检查是否已登录GitHub
 */
function checkGhAuth() {
  try {
    const status = exec('gh auth status', { silent: true, ignoreError: true });
    return status.includes('Logged in');
  } catch {
    return false;
  }
}

/**
 * 检查git状态
 */
function checkGitStatus() {
  const status = exec('git status --porcelain', { silent: true });
  return status.length === 0;
}

/**
 * 获取当前版本
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.version;
}

/**
 * 更新版本号
 */
function updateVersion(newVersion) {
  // 更新package.json
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  
  // 更新manifest.json
  const manifestPath = path.join(__dirname, '..', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.version = newVersion;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  
  console.log(`✅ 版本号已更新: ${newVersion}`);
}

/**
 * 增加版本号
 */
function bumpVersion(type = 'patch') {
  const current = getCurrentVersion();
  const [major, minor, patch] = current.split('.').map(Number);
  
  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }
  
  return newVersion;
}

/**
 * 创建CHANGELOG条目
 */
function updateChangelog(version, changes) {
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
  const date = new Date().toISOString().split('T')[0];
  
  let changelog = '';
  if (fs.existsSync(changelogPath)) {
    changelog = fs.readFileSync(changelogPath, 'utf8');
  } else {
    changelog = '# 更新日志\n\n所有重要的项目变更都会记录在此文件中。\n\n';
  }
  
  const newEntry = `## [${version}] - ${date}\n\n${changes}\n\n`;
  
  // 在第一个## 之前插入新条目
  const lines = changelog.split('\n');
  const firstHeaderIndex = lines.findIndex(line => line.startsWith('## ['));
  
  if (firstHeaderIndex === -1) {
    changelog += newEntry;
  } else {
    lines.splice(firstHeaderIndex, 0, newEntry);
    changelog = lines.join('\n');
  }
  
  fs.writeFileSync(changelogPath, changelog);
  console.log(`✅ CHANGELOG.md已更新`);
}

/**
 * 发布新版本
 */
async function release(options = {}) {
  console.log('🚀 开始发布流程...\n');
  
  // 1. 检查环境
  console.log('📋 检查环境...');
  
  if (!checkGhCli()) {
    console.error('❌ 未找到gh命令行工具');
    console.error('请安装: https://cli.github.com/');
    process.exit(1);
  }
  
  if (!checkGhAuth()) {
    console.error('❌ 未登录GitHub');
    console.error('请运行: gh auth login');
    process.exit(1);
  }
  
  if (!checkGitStatus()) {
    console.error('❌ 工作目录不干净，请先提交或暂存更改');
    console.error('运行 git status 查看详情');
    process.exit(1);
  }
  
  console.log('✅ 环境检查通过\n');
  
  // 2. 确定版本号
  const currentVersion = getCurrentVersion();
  console.log(`📌 当前版本: ${currentVersion}`);
  
  let newVersion;
  if (options.version) {
    newVersion = options.version;
  } else {
    newVersion = bumpVersion(options.type || 'patch');
  }
  
  console.log(`📌 新版本: ${newVersion}\n`);
  
  // 3. 更新版本号
  console.log('📝 更新版本号...');
  updateVersion(newVersion);
  
  // 4. 更新CHANGELOG
  console.log('📝 更新CHANGELOG...');
  const changelogContent = options.changelog || '### 更新\n- 版本更新';
  updateChangelog(newVersion, changelogContent);
  
  // 5. 验证和构建
  console.log('\n🔍 验证扩展...');
  exec('npm run validate');
  
  console.log('\n🔨 构建扩展...');
  exec('npm run build');
  
  // 6. 提交更改
  console.log('\n📦 提交更改...');
  exec('git add package.json manifest.json CHANGELOG.md');
  exec(`git commit -m "chore: release v${newVersion}"`);
  
  // 7. 创建tag
  console.log(`\n🏷️  创建标签 v${newVersion}...`);
  const tagMessage = options.changelog || `Release v${newVersion}`;
  exec(`git tag -a v${newVersion} -m "${tagMessage}"`);
  
  // 8. 推送到GitHub
  console.log('\n⬆️  推送到GitHub...');
  exec('git push origin main');
  exec(`git push origin v${newVersion}`);
  
  console.log('\n✅ 发布完成！');
  console.log(`\n📦 版本 v${newVersion} 已推送到GitHub`);
  console.log('🔄 GitHub Actions将自动构建并创建Release');
  console.log(`\n🔗 查看Release: https://github.com/${exec('gh repo view --json nameWithOwner -q .nameWithOwner', { silent: true })}/releases/tag/v${newVersion}`);
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📦 M3U8 资源探测器 - 发布工具

用法:
  node scripts/release.js [选项]

选项:
  --type <type>       版本类型: major, minor, patch (默认: patch)
  --version <ver>     指定版本号 (如: 1.2.3)
  --changelog <text>  更新日志内容
  --help, -h          显示帮助信息

示例:
  # 发布patch版本 (1.0.0 -> 1.0.1)
  node scripts/release.js

  # 发布minor版本 (1.0.0 -> 1.1.0)
  node scripts/release.js --type minor

  # 发布major版本 (1.0.0 -> 2.0.0)
  node scripts/release.js --type major

  # 指定版本号
  node scripts/release.js --version 2.0.0

  # 带更新日志
  node scripts/release.js --changelog "### 新功能\\n- 添加xxx功能\\n- 修复xxx问题"

前置条件:
  1. 安装gh CLI: https://cli.github.com/
  2. 登录GitHub: gh auth login
  3. 工作目录干净: git status
`);
    process.exit(0);
  }
  
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--type') {
      options.type = args[++i];
    } else if (arg === '--version') {
      options.version = args[++i];
    } else if (arg === '--changelog') {
      options.changelog = args[++i];
    }
  }
  
  release(options).catch(err => {
    console.error('\n❌ 发布失败:', err.message);
    process.exit(1);
  });
}

module.exports = { release };
