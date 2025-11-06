#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

/**
 * 生成渐变背景
 */
function drawGradientBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgb(102, 126, 234)');
  gradient.addColorStop(1, 'rgb(118, 75, 162)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * 绘制圆角矩形
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * 生成图标
 */
async function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // 启用抗锯齿
  ctx.antialias = 'subpixel';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 绘制渐变背景
  drawGradientBackground(ctx, size, size);
  
  // 计算缩放比例
  const scale = size / 128;
  
  // 绘制白色视频框
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  roundRect(ctx, 24 * scale, 24 * scale, 80 * scale, 56 * scale, 4 * scale);
  ctx.fill();
  
  // 绘制播放按钮
  ctx.fillStyle = 'rgb(102, 126, 234)';
  ctx.beginPath();
  ctx.moveTo(54 * scale, 44 * scale);
  ctx.lineTo(54 * scale, 68 * scale);
  ctx.lineTo(78 * scale, 56 * scale);
  ctx.closePath();
  ctx.fill();
  
  // 绘制流式传输线条
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  roundRect(ctx, 24 * scale, 88 * scale, 24 * scale, 4 * scale, 2 * scale);
  ctx.fill();
  roundRect(ctx, 52 * scale, 88 * scale, 24 * scale, 4 * scale, 2 * scale);
  ctx.fill();
  roundRect(ctx, 80 * scale, 88 * scale, 24 * scale, 4 * scale, 2 * scale);
  ctx.fill();
  
  return canvas;
}

/**
 * 生成所有尺寸的图标
 */
async function generateIcons() {
  console.log('🎨 开始生成图标...');
  
  const iconsDir = path.join(__dirname, '..', 'icons');
  
  // 确保icons目录存在
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  const sizes = [16, 48, 128];
  
  for (const size of sizes) {
    try {
      const canvas = await generateIcon(size);
      const buffer = canvas.toBuffer('image/png');
      const filename = `icon${size}.png`;
      const filepath = path.join(iconsDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      console.log(`  ✓ 已生成: ${filename} (${size}x${size})`);
    } catch (err) {
      console.error(`  ✗ 生成 icon${size}.png 失败:`, err.message);
    }
  }
  
  console.log('✅ 图标生成完成！');
}

if (require.main === module) {
  generateIcons().catch(err => {
    console.error('❌ 图标生成失败:', err);
    process.exit(1);
  });
}

module.exports = { generateIcons };
