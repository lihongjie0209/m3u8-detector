#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * 构建Chrome扩展
 */
async function build() {
  console.log('🔨 开始构建...');
  
  const distDir = path.join(__dirname, '..', 'dist');
  
  // 创建dist目录
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  const output = fs.createWriteStream(path.join(distDir, 'm3u8-detector.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 } // 最高压缩级别
  });
  
  output.on('close', () => {
    const size = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`✅ 构建完成！`);
    console.log(`📦 文件大小: ${size} MB`);
    console.log(`📁 输出路径: ${path.join(distDir, 'm3u8-detector.zip')}`);
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  archive.pipe(output);
  
  // 添加文件到压缩包
  const filesToInclude = [
    'manifest.json',
    'background.js',
    'content.js',
    'popup.html',
    'popup.js',
    'popup.css',
    'options.html',
    'options.js',
    'LICENSE',
    'README.md'
  ];
  
  filesToInclude.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: file });
      console.log(`  ✓ 添加: ${file}`);
    }
  });
  
  // 添加icons目录
  const iconsDir = path.join(__dirname, '..', 'icons');
  if (fs.existsSync(iconsDir)) {
    archive.directory(iconsDir, 'icons', (entry) => {
      // 排除不需要的文件
      if (entry.name.endsWith('.ps1') || entry.name === 'README.md') {
        return false;
      }
      console.log(`  ✓ 添加: icons/${entry.name}`);
      return entry;
    });
  }
  
  await archive.finalize();
}

if (require.main === module) {
  build().catch(err => {
    console.error('❌ 构建失败:', err);
    process.exit(1);
  });
}

module.exports = { build };
