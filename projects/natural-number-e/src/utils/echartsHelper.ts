/**
 * ECharts 辅助工具 - 解决 DOM 尺寸为 0 的问题
 * 提供统一的图表初始化和配置方法
 */

import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

/**
 * 安全初始化 ECharts 实例
 * @param container DOM 容器或 ref
 * @param retries 重试次数（默认 3 次）
 * @param retryDelay 重试延迟（默认 100ms）
 */
export async function initChart(
  container: HTMLElement | null,
  retries = 3,
  retryDelay = 100
): Promise<ECharts | null> {
  if (!container) {
    console.warn('[ECharts Helper] 容器不存在')
    return null
  }

  // 检查容器尺寸
  const checkSize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    return width > 0 && height > 0
  }

  // 如果尺寸为 0,等待并重试
  for (let i = 0; i < retries; i++) {
    if (checkSize()) {
      try {
        const instance = echarts.init(container)
        console.log('[ECharts Helper] 图表初始化成功', {
          width: container.clientWidth,
          height: container.clientHeight
        })
        return instance
      } catch (error) {
        console.error('[ECharts Helper] 初始化失败', error)
        return null
      }
    }

    // 等待 DOM 渲染
    console.warn(`[ECharts Helper] 容器尺寸为 0, 重试 ${i + 1}/${retries}`)
    await new Promise(resolve => setTimeout(resolve, retryDelay))
  }

  console.error('[ECharts Helper] 无法初始化图表: 容器尺寸始终为 0')
  return null
}

/**
 * 获取标准图表配置（包含 Y 轴显示）
 */
export function getStandardChartOption(customOptions: EChartsOption = {}): EChartsOption {
  const defaultOption: EChartsOption = {
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'x',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 0, 10]
      },
      axisLine: {
        show: true,
        lineStyle: { color: '#666' }
      },
      axisTick: { show: true },
      axisLabel: { fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: 'y',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 10, 0]
      },
      // 强制显示 Y 轴 ✅
      axisLine: {
        show: true,
        lineStyle: { color: '#666' }
      },
      axisTick: { show: true },
      axisLabel: { fontSize: 12 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      feature: {
        dataZoom: { show: true },
        restore: { show: true },
        saveAsImage: { show: true }
      },
      right: '5%',
      top: '5%'
    }
  }

  // 深度合并自定义配置
  return mergeOptions(defaultOption, customOptions)
}

/**
 * 深度合并 ECharts 配置
 */
function mergeOptions(target: any, source: any): any {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeOptions(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  
  return result
}

/**
 * 响应式调整图表大小
 */
export function setupChartResize(chartInstance: ECharts | null, container?: HTMLElement) {
  if (!chartInstance) return () => {}

  const resizeObserver = container
    ? new ResizeObserver(() => {
        chartInstance.resize()
      })
    : null

  if (resizeObserver && container) {
    resizeObserver.observe(container)
  }

  // 窗口大小变化监听
  const handleResize = () => {
    chartInstance.resize()
  }
  window.addEventListener('resize', handleResize)

  // 返回清理函数
  return () => {
    if (resizeObserver && container) {
      resizeObserver.unobserve(container)
      resizeObserver.disconnect()
    }
    window.removeEventListener('resize', handleResize)
  }
}

/**
 * 使用 nextTick 确保 DOM 已渲染后初始化
 */
export async function initChartWithNextTick(
  container: HTMLElement | null,
  options: EChartsOption,
  nextTickFn?: () => Promise<void>
): Promise<ECharts | null> {
  // 等待 Vue 的 nextTick
  if (nextTickFn) {
    await nextTickFn()
  }

  // 额外等待一帧确保渲染完成
  await new Promise(resolve => requestAnimationFrame(resolve))

  const instance = await initChart(container)
  if (instance && options) {
    instance.setOption(options)
  }

  return instance
}

/**
 * 批量清理图表实例
 */
export function disposeCharts(...charts: (ECharts | null)[]) {
  charts.forEach(chart => {
    if (chart && !chart.isDisposed()) {
      chart.dispose()
    }
  })
}

/**
 * 检查容器是否可见
 */
export function isContainerVisible(container: HTMLElement | null): boolean {
  if (!container) return false
  
  const rect = container.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

/**
 * 等待容器可见
 */
export async function waitForContainer(
  container: HTMLElement | null,
  timeout = 3000
): Promise<boolean> {
  if (!container) return false

  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    if (isContainerVisible(container)) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  return false
}

export default {
  initChart,
  getStandardChartOption,
  setupChartResize,
  initChartWithNextTick,
  disposeCharts,
  isContainerVisible,
  waitForContainer
}
