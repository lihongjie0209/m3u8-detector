#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

/**
 * 开发模式 - 监听文件变化
 */
function dev() {
  console.log('👀 开发模式已启动...');
  console.log('📝 正在监听文件变化...\n');
  
  const rootDir = path.join(__dirname, '..');
  
  // 监听的文件和目录
  const watchPaths = [
    path.join(rootDir, '*.js'),
    path.join(rootDir, '*.html'),
    path.join(rootDir, '*.css'),
    path.join(rootDir, '*.json'),
    path.join(rootDir, 'icons', '*.png'),
    path.join(rootDir, 'icons', '*.svg')
  ];
  
  // 忽略的文件
  const ignored = [
    '**/node_modules/**',
    '**/dist/**',
    '**/.git/**',
    '**/scripts/**'
  ];
  
  const watcher = chokidar.watch(watchPaths, {
    ignored: ignored,
    persistent: true,
    ignoreInitial: true
  });
  
  watcher
    .on('change', (filepath) => {
      const filename = path.basename(filepath);
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] 🔄 文件已更改: ${filename}`);
      console.log(`         → 请在 chrome://extensions/ 中刷新扩展\n`);
    })
    .on('add', (filepath) => {
      const filename = path.basename(filepath);
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] ➕ 文件已添加: ${filename}\n`);
    })
    .on('unlink', (filepath) => {
      const filename = path.basename(filepath);
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] ➖ 文件已删除: ${filename}\n`);
    })
    .on('error', (error) => {
      console.error('❌ 监听错误:', error);
    });
  
  console.log('✅ 文件监听已启动！');
  console.log('💡 提示:');
  console.log('   - 修改文件后会自动提示');
  console.log('   - 按 Ctrl+C 停止监听');
  console.log('   - 修改后需要在 chrome://extensions/ 中刷新扩展\n');
  
  // 优雅退出
  process.on('SIGINT', () => {
    console.log('\n\n👋 停止监听，再见！');
    watcher.close();
    process.exit(0);
  });
}

if (require.main === module) {
  dev();
}

module.exports = { dev };
