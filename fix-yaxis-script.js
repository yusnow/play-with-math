#!/usr/bin/env node

/**
 * 自动修复 Vue 文件中所有 ECharts 配置的 yAxis 显示问题
 * 确保所有图表都显示纵坐标轴
 */

const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ 请提供文件路径');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`❌ 文件不存在: ${filePath}`);
  process.exit(1);
}

console.log(`🔍 分析文件: ${path.basename(filePath)}`);

let content = fs.readFileSync(filePath, 'utf-8');
let modified = false;

// 匹配模式：寻找 yAxis: { ... } 配置
// 策略：
// 1. 找到所有 yAxis: { 的位置
// 2. 检查其内部是否有 axisLine 配置
// 3. 如果没有或 show: false，则添加/修改为 show: true

// 正则表达式匹配 yAxis 配置块
const yAxisPattern = /yAxis:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;

let matches = [];
let match;

while ((match = yAxisPattern.exec(content)) !== null) {
  matches.push({
    fullMatch: match[0],
    innerContent: match[1],
    startIndex: match.index,
    endIndex: match.index + match[0].length
  });
}

console.log(`📊 找到 ${matches.length} 个 yAxis 配置`);

if (matches.length === 0) {
  console.log('✅ 没有需要修改的 yAxis 配置');
  process.exit(0);
}

// 从后向前替换，避免索引错乱
matches.reverse().forEach((m, index) => {
  const { fullMatch, innerContent, startIndex, endIndex } = m;
  
  // 检查是否已经有 axisLine 配置
  const hasAxisLine = /axisLine:\s*\{/.test(innerContent);
  
  if (hasAxisLine) {
    // 检查 show 属性
    const showFalse = /axisLine:\s*\{[^}]*show:\s*false/.test(innerContent);
    
    if (showFalse) {
      // 修改 show: false 为 show: true
      const newYAxis = fullMatch.replace(
        /(axisLine:\s*\{[^}]*show:\s*)false/,
        '$1true'
      );
      content = content.substring(0, startIndex) + newYAxis + content.substring(endIndex);
      modified = true;
      console.log(`  ✏️  修改 #${matches.length - index}: 将 axisLine.show 从 false 改为 true`);
    } else {
      console.log(`  ✓ #${matches.length - index}: 已正确配置 axisLine`);
    }
  } else {
    // 没有 axisLine 配置，添加一个
    // 在 yAxis: { 后面添加
    const insertion = `\n      type: 'value',\n      axisLine: { \n        show: true,\n        lineStyle: { color: '#333' } \n      },`;
    
    // 找到 yAxis: { 的位置
    const yAxisStart = fullMatch.indexOf('{') + startIndex;
    
    // 插入配置（需要考虑现有配置）
    // 更安全的方式：在 } 前添加
    const insertPos = endIndex - 1;
    
    // 检查是否已经有 type: 'value'
    const hasType = /type:\s*['"]value['"]/.test(innerContent);
    
    let insertText = '';
    if (!hasType) {
      insertText += `\n      axisLine: { show: true, lineStyle: { color: '#333' } },`;
    } else {
      insertText += `,\n      axisLine: { show: true, lineStyle: { color: '#333' } }`;
    }
    
    // 插入前检查是否有逗号
    const beforeInsert = content.substring(insertPos - 10, insertPos).trim();
    if (!beforeInsert.endsWith(',')) {
      insertText = ',' + insertText;
    }
    
    content = content.substring(0, insertPos) + insertText + content.substring(insertPos);
    modified = true;
    console.log(`  ➕ 添加 #${matches.length - index}: 新增 axisLine 配置`);
  }
});

if (modified) {
  // 写回文件
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 文件已更新: ${path.basename(filePath)}`);
} else {
  console.log(`✅ 无需修改: ${path.basename(filePath)}`);
}
