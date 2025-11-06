#!/usr/bin/env node

const { program } = require('commander');
const { build } = require('./scripts/build');
const { clean } = require('./scripts/clean');
const { generateIcons } = require('./scripts/generate-icons');
const { dev } = require('./scripts/dev');
const { validate } = require('./scripts/validate');
const packageJson = require('./package.json');

program
  .name('m3u8-detector')
  .description('M3U8资源探测器 Chrome扩展构建工具')
  .version(packageJson.version);

program
  .command('build')
  .description('构建扩展包')
  .action(async () => {
    await build();
  });

program
  .command('clean')
  .description('清理构建产物')
  .action(() => {
    clean();
  });

program
  .command('icons')
  .description('生成图标文件')
  .action(async () => {
    await generateIcons();
  });

program
  .command('dev')
  .description('启动开发模式')
  .action(() => {
    dev();
  });

program
  .command('validate')
  .description('验证扩展文件')
  .action(() => {
    validate();
  });

program.parse();
