#!/bin/bash

# 快速修复所有章节的图表纵坐标轴
# 使用 sed 在所有 yAxis: { type: 'value' 后添加 axisLine 配置

PROJECT_DIR=$(pwd)

echo "🔧 开始修复所有章节的图表纵坐标轴..."
echo "📁 工作目录: $PROJECT_DIR"
echo ""

# 修复函数
fix_chapter() {
  local file="$1"
  local chapter_name=$(basename "$file")
  
  if [ ! -f "$file" ]; then
    echo "⚠️  文件不存在: $chapter_name"
    return
  fi
  
  echo "📝 处理: $chapter_name"
  
  # 备份
  cp "$file" "${file}.backup"
  
  # 查找并修复 yAxis 配置
  # 策略：在每个 yAxis: { 后面的 type: 'value' 后添加 axisLine 配置
  
  sed -i.tmp "s/yAxis: {/yAxis: {\n      axisLine: { show: true, lineStyle: { color: '#333' } },/g" "$file"
  
  rm -f "${file}.tmp"
  
  echo "✅ $chapter_name 处理完成"
}

# 处理所有章节
chapters=(
  "src/views/Chapter1.vue"
  "src/views/Chapter2.vue"
  "src/views/Chapter3.vue"
  "src/views/Chapter4.vue"
  "src/views/Chapter5.vue"
  "src/views/Chapter6.vue"
)

for chapter in "${chapters[@]}"; do
  if [ -f "$chapter" ]; then
    fix_chapter "$chapter"
  fi
  echo ""
done

echo "🎉 所有章节处理完成！"
echo ""
echo "📋 后续步骤："
echo "1. git diff 查看更改"
echo "2. npm run dev 本地测试"
echo "3. git commit -am '🎨 修复所有图表纵坐标轴显示'"
echo "4. git push origin main"
