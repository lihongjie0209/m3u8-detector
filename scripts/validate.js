#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 验证扩展文件
 */
function validate() {
  console.log('🔍 开始验证扩展文件...\n');
  
  const rootDir = path.join(__dirname, '..');
  let hasErrors = false;
  
  // 必需的文件列表
  const requiredFiles = [
    { path: 'manifest.json', desc: '扩展配置文件' },
    { path: 'background.js', desc: '后台服务脚本' },
    { path: 'content.js', desc: '内容脚本' },
    { path: 'popup.html', desc: '弹出窗口' },
    { path: 'popup.js', desc: '弹出窗口脚本' },
    { path: 'popup.css', desc: '弹出窗口样式' },
    { path: 'options.html', desc: '设置页面' },
    { path: 'options.js', desc: '设置页面脚本' },
    { path: 'icons/icon16.png', desc: '16x16图标' },
    { path: 'icons/icon48.png', desc: '48x48图标' },
    { path: 'icons/icon128.png', desc: '128x128图标' }
  ];
  
  console.log('📄 检查必需文件:');
  requiredFiles.forEach(({ path: filePath, desc }) => {
    const fullPath = path.join(rootDir, filePath);
    if (fs.existsSync(fullPath)) {
      console.log(`  ✓ ${filePath.padEnd(25)} - ${desc}`);
    } else {
      console.log(`  ✗ ${filePath.padEnd(25)} - ${desc} [缺失]`);
      hasErrors = true;
    }
  });
  
  console.log('\n📋 验证manifest.json:');
  const manifestPath = path.join(rootDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      // 检查必需字段
      const requiredFields = [
        'manifest_version',
        'name',
        'version',
        'description'
      ];
      
      requiredFields.forEach(field => {
        if (manifest[field]) {
          console.log(`  ✓ ${field}: ${manifest[field]}`);
        } else {
          console.log(`  ✗ ${field}: [缺失]`);
          hasErrors = true;
        }
      });
      
      // 检查权限
      if (manifest.permissions && manifest.permissions.length > 0) {
        console.log(`  ✓ 权限: ${manifest.permissions.join(', ')}`);
      }
      
      // 检查Manifest版本
      if (manifest.manifest_version !== 3) {
        console.log(`  ⚠ Manifest版本不是V3 (当前: ${manifest.manifest_version})`);
      }
      
    } catch (err) {
      console.log(`  ✗ JSON格式错误: ${err.message}`);
      hasErrors = true;
    }
  }
  
  console.log('\n🖼️  检查图标文件:');
  const iconSizes = [16, 48, 128];
  iconSizes.forEach(size => {
    const iconPath = path.join(rootDir, 'icons', `icon${size}.png`);
    if (fs.existsSync(iconPath)) {
      const stats = fs.statSync(iconPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  ✓ icon${size}.png (${sizeKB} KB)`);
    } else {
      console.log(`  ✗ icon${size}.png [缺失]`);
      hasErrors = true;
    }
  });
  
  console.log('\n📊 统计信息:');
  const stats = {
    jsFiles: 0,
    htmlFiles: 0,
    cssFiles: 0,
    totalSize: 0
  };
  
  function countFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', 'dist', '.git', 'docs'].includes(file)) {
          countFiles(filePath);
        }
      } else {
        stats.totalSize += stat.size;
        if (file.endsWith('.js') && !filePath.includes('node_modules') && !filePath.includes('scripts')) {
          stats.jsFiles++;
        } else if (file.endsWith('.html')) {
          stats.htmlFiles++;
        } else if (file.endsWith('.css')) {
          stats.cssFiles++;
        }
      }
    });
  }
  
  countFiles(rootDir);
  
  console.log(`  • JavaScript文件: ${stats.jsFiles}`);
  console.log(`  • HTML文件: ${stats.htmlFiles}`);
  console.log(`  • CSS文件: ${stats.cssFiles}`);
  console.log(`  • 总大小: ${(stats.totalSize / 1024).toFixed(2)} KB`);
  
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.log('❌ 验证失败: 发现错误或缺失文件');
    process.exit(1);
  } else {
    console.log('✅ 验证通过: 所有必需文件都存在！');
  }
}

if (require.main === module) {
  validate();
}

module.exports = { validate };
