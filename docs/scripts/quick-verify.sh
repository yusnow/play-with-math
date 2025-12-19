#!/bin/bash
# 🧪 快速验证脚本 - Phase 1 验证

echo "🎯 开始 Phase 1 快速验证..."
echo ""

# 自动检测项目目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PROJECT_DIR="$REPO_ROOT/projects/natural-number-e"

echo "📂 检测到的路径:"
echo "   仓库根目录: $REPO_ROOT"
echo "   项目目录: $PROJECT_DIR"
echo ""

# 检查项目目录
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ 错误: 项目目录不存在: $PROJECT_DIR"
    echo "   请确保在 play-with-math 仓库内运行此脚本"
    exit 1
fi

cd "$PROJECT_DIR"

echo "📋 检查 1: Git 状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
LATEST_COMMIT=$(git log --oneline -1)
echo "最新提交: $LATEST_COMMIT"

if [[ "$LATEST_COMMIT" == *"de85562"* ]] || [[ "$LATEST_COMMIT" == *"修复 Chapter6: 导入缺失的 echartsHelper 函数"* ]]; then
    echo "✅ Git 状态正常 (最新修复已应用)"
else
    echo "⚠️  警告: 本地代码可能不是最新版本"
    echo "   请运行: git pull origin main"
fi
echo ""

echo "📋 检查 2: 关键文件存在性"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

FILES=(
    "src/utils/echartsHelper.ts"
    "src/views/Chapter1.vue"
    "src/views/Chapter2.vue"
    "src/views/Chapter3.vue"
    "src/views/Chapter4.vue"
    "src/views/Chapter5.vue"
    "src/views/Chapter6.vue"
    "src/views/Chapter6Lab.vue"
    "src/views/Home.vue"
)

ALL_FILES_OK=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (缺失!)"
        ALL_FILES_OK=false
    fi
done
echo ""

echo "📋 检查 3: 导入检查"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 echartsHelper 导入
echo "检查 echartsHelper 导入..."
CHAPTERS_WITH_ECHARTS="Chapter2 Chapter3 Chapter4 Chapter5 Chapter6"
IMPORT_OK=true

for chapter in $CHAPTERS_WITH_ECHARTS; do
    if grep -q "import.*echartsHelper" "src/views/${chapter}.vue" 2>/dev/null; then
        echo "✅ ${chapter}.vue 导入了 echartsHelper"
    else
        echo "❌ ${chapter}.vue 未导入 echartsHelper"
        IMPORT_OK=false
    fi
done
echo ""

# 检查 onUnmounted 导入
echo "检查 onUnmounted 导入..."
for chapter in $CHAPTERS_WITH_ECHARTS; do
    if grep -q "import.*onUnmounted" "src/views/${chapter}.vue" 2>/dev/null; then
        echo "✅ ${chapter}.vue 导入了 onUnmounted"
    else
        echo "⚠️  ${chapter}.vue 未导入 onUnmounted"
    fi
done
echo ""

echo "📋 检查 4: echarts.init 直接调用检查"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
DIRECT_INIT_FOUND=false

for chapter in Chapter2 Chapter3 Chapter4 Chapter5 Chapter6; do
    if grep -q "echarts.init" "src/views/${chapter}.vue" 2>/dev/null; then
        COUNT=$(grep -c "echarts.init" "src/views/${chapter}.vue")
        echo "⚠️  ${chapter}.vue 仍有 ${COUNT} 处直接使用 echarts.init"
        DIRECT_INIT_FOUND=true
    else
        echo "✅ ${chapter}.vue 已使用 initChart()"
    fi
done

if [ "$DIRECT_INIT_FOUND" = true ]; then
    echo ""
    echo "⚠️  注意: 部分文件仍直接调用 echarts.init"
    echo "   建议检查是否需要重新拉取代码"
fi
echo ""

echo "📋 检查 5: Sass 弃用语法检查"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if grep -r "lighten(\$color" src/views/*.vue 2>/dev/null; then
    echo "⚠️  发现 lighten() 弃用语法"
else
    echo "✅ 未发现 lighten() 弃用语法"
fi

if grep -r "darken(\$color" src/views/*.vue 2>/dev/null; then
    echo "⚠️  发现 darken() 弃用语法"
else
    echo "✅ 未发现 darken() 弃用语法"
fi
echo ""

echo "📋 检查 6: node_modules/.vite 缓存"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "node_modules/.vite" ]; then
    echo "⚠️  Vite 缓存存在"
    echo "   建议清除: rm -rf node_modules/.vite"
else
    echo "✅ Vite 缓存已清除"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 验证总结"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$ALL_FILES_OK" = true ] && [ "$IMPORT_OK" = true ] && [ "$DIRECT_INIT_FOUND" = false ]; then
    echo "✅ 所有自动检查通过!"
    echo ""
    echo "下一步:"
    echo "1. 清除缓存: rm -rf node_modules/.vite"
    echo "2. 启动服务: npm run dev"
    echo "3. 打开浏览器验证功能"
    echo ""
    echo "详细验证步骤请查看: VERIFICATION_GUIDE.md"
else
    echo "⚠️  部分检查未通过，请查看上述输出"
    echo ""
    echo "建议操作:"
    echo "1. git pull origin main"
    echo "2. rm -rf node_modules/.vite"
    echo "3. 重新运行此脚本"
fi

echo ""
echo "🎯 快速验证完成!"
