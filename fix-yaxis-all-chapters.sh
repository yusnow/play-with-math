#!/bin/bash

# 全局优化所有章节的图表纵坐标轴显示
# 作者: AI Assistant
# 日期: 2024-12-18

PROJECT_DIR="/home/user/playwithmath/projects/natural-number-e"

echo "🔧 开始优化所有章节的图表纵坐标轴..."

# 定义需要修改的章节
chapters=("Chapter1" "Chapter2" "Chapter3" "Chapter4" "Chapter5" "Chapter6")

for chapter in "${chapters[@]}"; do
  file="${PROJECT_DIR}/src/views/${chapter}.vue"
  
  if [ -f "$file" ]; then
    echo "📝 处理 ${chapter}.vue..."
    
    # 备份原文件
    cp "$file" "${file}.backup"
    
    # 使用 sed 修复 yAxis 配置
    # 1. 确保 yAxis 有 axisLine.show = true
    # 2. 确保 yAxis 有 axisLine.lineStyle
    
    # 方法：在 yAxis: { 后添加 axisLine 配置（如果不存在）
    # 这个脚本会查找所有 yAxis 配置并添加显示设置
    
    # 由于 sed 操作复杂，我们改用 Node.js 脚本处理
    node "${PROJECT_DIR}/../../fix-yaxis-script.js" "$file"
    
    echo "✅ ${chapter}.vue 处理完成"
  else
    echo "⚠️  ${chapter}.vue 不存在"
  fi
done

echo ""
echo "🎉 所有章节的图表纵坐标轴优化完成！"
echo "📁 备份文件已保存为 *.backup"
echo ""
echo "下一步："
echo "1. 查看修改内容: git diff"
echo "2. 测试所有章节的图表显示"
echo "3. 提交更改: git commit -am '🎨 优化所有图表纵坐标轴显示'"
