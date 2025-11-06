#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 递归删除目录
 */
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        removeDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

/**
 * 清理构建产物
 */
function clean() {
  console.log('🧹 开始清理...');
  
  const rootDir = path.join(__dirname, '..');
  
  // 清理dist目录
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    removeDir(distDir);
    console.log('  ✓ 已删除: dist/');
  }
  
  // 清理根目录的zip文件
  const zipFiles = fs.readdirSync(rootDir).filter(file => file.endsWith('.zip'));
  zipFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    fs.unlinkSync(filePath);
    console.log(`  ✓ 已删除: ${file}`);
  });
  
  // 清理临时文件
  const tempPatterns = ['.tmp', '.temp', '~'];
  fs.readdirSync(rootDir).forEach(file => {
    if (tempPatterns.some(pattern => file.endsWith(pattern))) {
      const filePath = path.join(rootDir, file);
      if (fs.existsSync(filePath)) {
        if (fs.statSync(filePath).isDirectory()) {
          removeDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
        console.log(`  ✓ 已删除: ${file}`);
      }
    }
  });
  
  console.log('✅ 清理完成！');
}

if (require.main === module) {
  clean();
}

module.exports = { clean };
