# ✅ Phase 1 验证检查表

## 🚀 快速开始

```bash
# 1. 进入项目
cd /Users/yugh/Dev/play-with-math/projects/natural-number-e

# 2. 更新代码
git pull origin main

# 3. 运行自动检查
bash /Users/yugh/Dev/play-with-math/quick-verify.sh

# 4. 清除缓存
rm -rf node_modules/.vite

# 5. 启动服务
npm run dev
```

---

## 📋 浏览器验证 (每个页面 2 分钟)

### 页面 1: 首页 `http://localhost:5173/`
```
[ ] 无控制台错误
[ ] e 数值显示正常 (不溢出)
[ ] 章节卡片可点击
[ ] 3D 场景正常
```

### 页面 2: Chapter 1 `/chapter1`
```
[ ] 控制台显示 "[ECharts Helper] 图表初始化成功"
[ ] 无 "Can't get DOM width or height" 警告
[ ] 图表显示正常
[ ] 图表可交互 (缩放/平移)
```

### 页面 3: Chapter 2 `/chapter2`
```
[ ] 2 个图表都显示
[ ] 无 Sass 警告
[ ] 无 DOM 尺寸警告
[ ] 图表交互正常
```

### 页面 4: Chapter 3 `/chapter3`
```
[ ] 2 个图表显示 (收敛 + 误差)
[ ] 无控制台错误
[ ] 图表响应式正常
```

### 页面 5: Chapter 4 `/chapter4`
```
[ ] 5 个图表全部显示
[ ] 5 条初始化成功消息
[ ] 无 DOM 尺寸警告
[ ] 所有图表交互正常
```

### 页面 6: Chapter 5 `/chapter5`
```
[ ] 3 个图表显示 (复平面 + 斐波那契 + 网络)
[ ] 无 onUnmounted 错误
[ ] 控制台无错误
```

### 页面 7: ⭐ Chapter 6 `/chapter6` (重点)
```
[ ] 无 "setupChartResize is not defined" 错误
[ ] 无 "onUnmounted is not defined" 错误
[ ] 无 "Cannot read properties of undefined" 错误
[ ] 函数探索器图表显示
[ ] e 的极限图表显示
[ ] Chapter6Lab 组件加载成功
[ ] 所有交互功能正常
```

---

## 🔍 响应式验证 (5 分钟)

### 窗口缩放测试
对每个章节页面:
```
[ ] 拖动窗口边缘 → 图表自动调整大小
[ ] 无错误或警告
[ ] 动画流畅
```

### 移动端模拟 (F12 → Toggle device toolbar)
```
[ ] iPhone SE (375px): 首页 e 数值正常
[ ] iPad (768px): 图表自适应
[ ] Galaxy S20 (360px): 布局正常
[ ] 无横向滚动条
```

---

## 🎯 核心修复确认

### 已修复的 7 个问题
```
[ ] ✅ ECharts DOM 尺寸警告 (14 个图表)
[ ] ✅ Sass lighten() 弃用警告 (5 处)
[ ] ✅ 首页 e 数值溢出
[ ] ✅ Chapter6: setupChartResize 未定义
[ ] ✅ Chapter6: onUnmounted 未定义
[ ] ✅ Chapter5: onUnmounted 未定义
[ ] ✅ Chapter6 Lab 集成
```

---

## 📊 最终结果

### 所有检查通过? ✅
```
[ ] 是 → 回复 "验证通过，开始 Phase 2"
[ ] 否 → 提供错误信息/截图
```

### 发现问题?
提供以下信息:
1. **页面**: `http://localhost:5173/______`
2. **错误信息**: (粘贴控制台输出)
3. **截图**: (如果有)

---

**预计时间: 15 分钟**  
**完整指南**: `VERIFICATION_GUIDE.md`  
**自动检查**: `bash quick-verify.sh`
