# 📋 项目待办事项清单

**最后更新时间:** 2025-12-19  
**项目:** Play with Math - 自然常数 e 的探索之旅

---

## 🔴 高优先级 (影响功能和用户体验)

### 1. ECharts DOM 尺寸警告修复 ⚠️
**状态:** 部分完成 (1/8)  
**优先级:** 🔴 高

- [x] ✅ Chapter1.vue - 已修复
- [ ] ❌ Chapter2.vue - 2 处 `echarts.init`
- [ ] ❌ Chapter3.vue - 2 处 `echarts.init`
- [ ] ❌ Chapter4.vue - 5 处 `echarts.init` (最多)
- [ ] ❌ Chapter5.vue - 3 处 `echarts.init`
- [ ] ❌ Chapter6.vue - 2 处 `echarts.init`
- [ ] ❌ Chapter6Enhanced.vue - 需要检查
- [ ] ❌ Chapter6Lab.vue - 需要检查

**修复方案:**
```typescript
// 每个章节需要:
// 1. 导入 echartsHelper
import { initChart, getStandardChartOption, setupChartResize } from '@/utils/echartsHelper'

// 2. 使用 nextTick + initChart
onMounted(async () => {
  await nextTick()
  chartInstance = await initChart(chartRef.value)
  // ...
})

// 3. 添加清理函数
onUnmounted(() => {
  if (cleanupResize) cleanupResize()
  if (chartInstance) chartInstance.dispose()
})
```

**预计工作量:** 1-2 小时

---

### 2. Y 轴全局显示修复 ⚠️
**状态:** 未开始 (0/6)  
**优先级:** 🔴 高

您要求"请将本项目中所有的函数图像均画出纵坐标轴"，但目前:
- [ ] ❌ Chapter1.vue - Y 轴配置存在但有重复定义
- [ ] ❌ Chapter2.vue - 未配置
- [ ] ❌ Chapter3.vue - 未配置
- [ ] ❌ Chapter4.vue - 未配置
- [ ] ❌ Chapter5.vue - 未配置
- [ ] ❌ Chapter6.vue - 未配置

**修复方案:**
在所有图表配置中添加:
```javascript
yAxis: {
  type: 'value',
  name: 'y',
  axisLine: {
    show: true,  // ✅ 强制显示
    lineStyle: { color: '#666' }
  },
  axisTick: { show: true }
}
```

**预计工作量:** 1 小时

---

### 3. Chapter6 实验室集成问题 ⚠️
**状态:** 混乱 😵  
**优先级:** 🔴 高

**现状:**
- ✅ `Chapter6.vue` - 基础版本 (45KB)
- ✅ `Chapter6Enhanced.vue` - 增强版 (74KB, 包含完整功能)
- ✅ `Chapter6Lab.vue` - 实验室组件 (30KB)
- ✅ `Lab.vue` - 空白页面 ("即将推出...")

**问题:**
1. ❌ `Chapter6Enhanced.vue` 和 `Chapter6Lab.vue` 未被使用
2. ❌ 路由中没有这两个组件的入口
3. ❌ `Chapter6.vue` 未导入这两个增强组件
4. ❌ 用户报告找不到功能 (函数探索器 Pro、数值实验台、可视化编程)

**解决方案 (二选一):**

#### 方案 A: 整合到 Chapter6.vue 中
```vue
<!-- Chapter6.vue -->
<script setup>
import Chapter6Lab from './Chapter6Lab.vue'
</script>

<template>
  <!-- 原有内容 -->
  
  <!-- 新增实验室部分 -->
  <section class="lab-section">
    <h2>🔬 探索实验室</h2>
    <Chapter6Lab />
  </section>
</template>
```

#### 方案 B: 创建独立路由
```typescript
// router/index.ts
{
  path: '/chapter6/enhanced',
  name: 'Chapter6Enhanced',
  component: () => import('@/views/Chapter6Enhanced.vue')
},
{
  path: '/chapter6/lab',
  name: 'Chapter6Lab',
  component: () => import('@/views/Chapter6Lab.vue')
}
```

**推荐:** 方案 A (更符合用户期望)

**预计工作量:** 30 分钟

---

### 4. Lab.vue 空白页面 📄
**状态:** 未实现  
**优先级:** 🟡 中

**现状:**
- 路由存在: `/lab`
- 内容: 只有 "即将推出..." 占位符

**选项:**
- **选项 A:** 将 `Chapter6Lab.vue` 的内容移到 `Lab.vue`
- **选项 B:** 删除 `/lab` 路由,将其功能合并到 Chapter6
- **选项 C:** 开发独立的实验室功能

**预计工作量:** 取决于选择的方案

---

## 🟡 中优先级 (代码质量和维护性)

### 5. 文档文件管理 📚
**状态:** 混乱  
**优先级:** 🟡 中

**问题:**
多个文档在项目根目录外 (`../../`),未被 Git 跟踪:

```
/home/user/playwithmath/
├── CHAPTER6_LAB_INTEGRATION.md      11KB
├── DEPLOYMENT_SUMMARY.md             11KB
├── ECHARTS_FIX_GUIDE.md             5.3KB
├── FINAL_FIX_SUMMARY.md             7.6KB
├── OPTIMIZATION_GUIDE.md             15KB
├── QUICK_FIX.md                     4.2KB
├── README_OPTIMIZATION.md            12KB
├── UI_FIX_SUMMARY.md                 (新)
├── fix-yaxis-all-chapters.sh        1.4KB
└── fix-yaxis-script.js              3.6KB
```

**建议方案:**
```bash
# 方案 A: 移动到项目 docs 目录
mkdir -p docs/
mv ../../*.md docs/
mv ../../*.sh scripts/
mv ../../*.js scripts/

# 方案 B: 整合成单个文档
# 合并所有 *_FIX_*.md, *_GUIDE.md, *_SUMMARY.md
# 创建统一的 docs/DEVELOPMENT.md
```

**预计工作量:** 20 分钟

---

### 6. npm 安全漏洞 🔒
**状态:** 5 个中等严重度  
**优先级:** 🟡 中

**漏洞列表:**
1. **esbuild ≤0.24.2** - 开发服务器请求漏洞
   - 影响: vite 开发环境
   - 修复: `npm audit fix --force` (可能破坏性更新)

2. **vue-template-compiler ≥2.0.0** - XSS 漏洞
   - 影响: vue-tsc, @vue/language-core
   - 修复: 升级 vue-tsc 到 3.1.8+

**风险评估:**
- ⚠️ **开发环境漏洞** - 不影响生产环境
- ⚠️ **模板编译器漏洞** - 主要影响构建时

**建议:**
```bash
# 查看详细信息
npm audit

# 尝试自动修复 (无破坏性)
npm audit fix

# 手动升级 (测试后)
npm install vite@latest vue-tsc@latest
```

**预计工作量:** 30 分钟 + 测试

---

### 7. Chapter1.vue 重复配置 🔄
**状态:** 轻微问题  
**优先级:** 🟢 低

**问题:**
Y 轴配置出现两次:
```javascript
yAxis: {
  axisLine: { show: true, lineStyle: { color: '#333' } },  // 第一次
  type: 'value',
  name: '最终金额(元)',
  axisLine: {                                               // 第二次 (重复)
    show: true,
    lineStyle: { color: '#666' }
  },
  // ...
}
```

**修复:** 删除第一行重复配置

**预计工作量:** 2 分钟

---

## 🟢 低优先级 (优化和增强)

### 8. 性能优化文件未应用 📈
**状态:** 已创建但未使用  
**优先级:** 🟢 低

**已创建工具:**
- ✅ `src/utils/chartConfig.ts` - 统一图表配置
- ✅ `src/utils/performanceOptimizer.ts` - 性能优化工具

**问题:** 这些工具创建了但未在章节中使用

**建议:** 
- 如果 `echartsHelper.ts` 已满足需求,可以移除或整合这些文件
- 或者重构章节使用这些工具

**预计工作量:** 根据决策而定

---

### 9. TypeScript 类型检查 🔷
**状态:** 未知  
**优先级:** 🟢 低

**建议检查:**
```bash
npm run type-check  # 或 vue-tsc --noEmit
```

---

### 10. 未来功能 (可选) 🚀
**优先级:** 🟢 低

根据之前的讨论,这些功能已规划但未实现:

- [ ] AI 助手集成 (语音识别、智能问答)
- [ ] 社区功能 (分享、挑战、排行榜)
- [ ] VR/AR 沉浸式实验
- [ ] 深色模式
- [ ] 更多交互式动画
- [ ] 成就系统完善
- [ ] 学习进度追踪

---

## 📊 工作量估算

| 优先级 | 任务数 | 预计总时间 |
|--------|--------|-----------|
| 🔴 高   | 4 项   | 3-4 小时  |
| 🟡 中   | 3 项   | 1.5 小时  |
| 🟢 低   | 3 项   | 1 小时    |
| **总计** | **10 项** | **5.5-6.5 小时** |

---

## 🎯 建议的执行顺序

### Phase 1: 修复核心问题 (2-3 小时)
1. **Chapter6 实验室集成** (30 分钟)
   - 整合 Chapter6Lab 到 Chapter6.vue
   - 或添加独立路由

2. **批量修复 ECharts** (1.5 小时)
   - 一次性修复 Chapter2-6
   - 使用已有的 echartsHelper 工具

3. **Y 轴全局显示** (1 小时)
   - 批量添加 Y 轴配置
   - 修复 Chapter1 重复配置

### Phase 2: 代码清理 (1 小时)
4. **文档整理** (20 分钟)
   - 移动文档到 docs/ 目录
   - 更新 .gitignore

5. **npm 安全修复** (30 分钟)
   - 尝试 `npm audit fix`
   - 测试构建和开发环境

6. **清理未使用文件** (10 分钟)
   - 决定保留或移除 chartConfig.ts/performanceOptimizer.ts

### Phase 3: 可选优化 (1-2 小时)
7. Lab.vue 实现
8. TypeScript 检查
9. 其他优化

---

## 🤔 需要您决策的问题

### ❓ 问题 1: Chapter6 实验室方案
**选择:** 
- [ ] A. 整合到 Chapter6.vue 中 (推荐)
- [ ] B. 创建独立路由
- [ ] C. 其他方案: ___________

### ❓ 问题 2: 文档管理
**选择:**
- [ ] A. 移动到 docs/ 目录
- [ ] B. 整合成单个文档
- [ ] C. 保持现状
- [ ] D. 其他: ___________

### ❓ 问题 3: Lab.vue 页面
**选择:**
- [ ] A. 使用 Chapter6Lab 内容
- [ ] B. 删除 /lab 路由
- [ ] C. 开发独立功能
- [ ] D. 保持 "即将推出"

### ❓ 问题 4: npm 安全漏洞
**选择:**
- [ ] A. 立即修复 (可能破坏性)
- [ ] B. 延后到稳定版本
- [ ] C. 忽略 (仅开发环境)

### ❓ 问题 5: 未使用的工具文件
**选择:**
- [ ] A. 删除 chartConfig.ts 和 performanceOptimizer.ts
- [ ] B. 重构使用这些工具
- [ ] C. 保留备用

---

## ✅ 快速启动命令

### 立即开始 Phase 1:
```bash
cd /Users/yugh/Dev/play-with-math/projects/natural-number-e

# 1. 确保代码最新
git pull origin main

# 2. 清除缓存
rm -rf node_modules/.vite

# 3. 开发模式
npm run dev

# 在另一个终端开始修复...
```

---

**请告诉我:**
1. 您想从哪个任务开始? (建议从 Phase 1 开始)
2. 对于上述决策问题,您的选择是?
3. 是否有其他优先级调整?

我可以立即开始执行任何您确定的任务! 🚀
