# 🔧 ECharts DOM 尺寸问题修复指南

## 📋 问题描述

**错误信息:**
```
[ECharts] Can't get DOM width or height. 
Please check dom.clientWidth and dom.clientHeight. 
They should not be 0.
For example, you may need to call this in the callback of window.onload.
```

**原因分析:**
1. 图表容器在 `echarts.init()` 时尺寸为 0
2. Vue 组件生命周期中 DOM 可能尚未完全渲染
3. 容器元素的 CSS 样式未设置明确的高度/宽度
4. 使用 `v-if` 导致元素初始不可见

---

## ✅ 解决方案

### 方案 1: 使用新的 echartsHelper 工具（推荐）

#### 1.1 安装步骤

文件已创建在: `src/utils/echartsHelper.ts`

#### 1.2 使用示例

**修改前:**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)  // ❌ 可能失败
    chartInstance.setOption({...})
  }
})
</script>
```

**修改后:**
```vue
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { 
  initChart, 
  getStandardChartOption,
  setupChartResize 
} from '@/utils/echartsHelper'

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let cleanupResize: (() => void) | null = null

onMounted(async () => {
  await nextTick()  // 等待 DOM 渲染
  
  // ✅ 安全初始化（自动重试）
  chartInstance = await initChart(chartRef.value)
  
  if (chartInstance) {
    // ✅ 使用标准配置（包含 Y 轴显示）
    const option = getStandardChartOption({
      series: [{
        type: 'line',
        data: [[0, 0], [1, 2.718], [2, 7.389]]
      }]
    })
    
    chartInstance.setOption(option)
    
    // ✅ 设置响应式调整
    cleanupResize = setupChartResize(chartInstance, chartRef.value)
  }
})

onUnmounted(() => {
  if (cleanupResize) cleanupResize()
  if (chartInstance) chartInstance.dispose()
})
</script>

<template>
  <!-- ✅ 确保容器有明确的高度 -->
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>
```

---

### 方案 2: CSS 修复

确保图表容器有明确的尺寸:

```vue
<style scoped>
.chart-container {
  width: 100%;
  min-height: 400px;  /* ✅ 关键: 设置最小高度 */
  height: 400px;
}

/* 或使用百分比（父元素需要有高度） */
.chart-wrapper {
  height: 100vh;  /* 父元素高度 */
}

.chart-container-percent {
  width: 100%;
  height: 80%;  /* 相对于父元素 */
}
</style>
```

---

### 方案 3: 延迟初始化

如果使用 `v-if`:

```vue
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const showChart = ref(false)
const chartRef = ref<HTMLElement | null>(null)

// 监听可见性变化
watch(showChart, async (visible) => {
  if (visible) {
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))  // 额外延迟
    initializeChart()
  }
})

function initializeChart() {
  if (chartRef.value) {
    const instance = echarts.init(chartRef.value)
    // ... 配置图表
  }
}
</script>

<template>
  <el-button @click="showChart = true">显示图表</el-button>
  <div v-if="showChart" ref="chartRef" style="height: 400px;"></div>
</template>
```

---

## 🎯 全局配置（Y 轴强制显示）

`getStandardChartOption()` 已包含以下配置:

```typescript
yAxis: {
  type: 'value',
  name: 'y',
  axisLine: {
    show: true,  // ✅ 强制显示
    lineStyle: { color: '#666' }
  },
  axisTick: { show: true },
  axisLabel: { fontSize: 12 }
}
```

---

## 📝 批量修复清单

需要修复的文件:
- [x] `src/utils/echartsHelper.ts` (已创建)
- [ ] `src/views/Chapter1.vue`
- [ ] `src/views/Chapter2.vue`
- [ ] `src/views/Chapter3.vue`
- [ ] `src/views/Chapter4.vue`
- [ ] `src/views/Chapter5.vue`
- [ ] `src/views/Chapter6.vue`
- [ ] `src/views/Chapter6Enhanced.vue`
- [ ] `src/views/Chapter6Lab.vue`

---

## 🚀 快速修复命令

```bash
cd /Users/yugh/Dev/play-with-math/projects/natural-number-e

# 1. 拉取最新代码
git pull origin main

# 2. 清除缓存并重新构建
rm -rf node_modules/.vite
npm run dev

# 3. 硬刷新浏览器
# Chrome/Edge: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
# Firefox: Ctrl+F5 (Windows) 或 Cmd+Shift+R (Mac)
```

---

## 🔍 问题排查

### 1. 检查容器尺寸
```javascript
console.log('容器尺寸:', {
  width: chartRef.value?.clientWidth,
  height: chartRef.value?.clientHeight
})
```

### 2. 检查 DOM 渲染状态
```javascript
await nextTick()
console.log('DOM 已渲染')
```

### 3. 使用浏览器开发工具
- F12 打开开发者工具
- Elements 面板 → 检查图表容器的 computed 样式
- 查看 `width` 和 `height` 是否为 0

---

## ⚡ 性能优化建议

1. **延迟加载**: 对于不可见的图表,使用 Intersection Observer
2. **销毁实例**: 组件卸载时调用 `chart.dispose()`
3. **防抖动**: 窗口 resize 事件使用防抖
4. **复用实例**: 避免重复创建/销毁

---

## 📞 需要帮助?

如果问题仍未解决,请提供:
1. 具体的章节/组件名称
2. 浏览器控制台完整错误信息
3. 图表容器的 HTML 结构和 CSS 样式

---

**更新时间:** 2025-12-19  
**版本:** v1.0.0
