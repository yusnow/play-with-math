/**
 * 性能优化工具集
 * - 图表懒加载
 * - WebWorker 计算
 * - 虚拟滚动
 * - 节流/防抖
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

/**
 * 图表懒加载 Hook
 * 只在图表进入可视区域时初始化
 */
export function useLazyChart(
  chartRef: Ref<HTMLElement | undefined>,
  initCallback: () => void,
  threshold = 0.1
) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!chartRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
            initCallback()
            // 初始化后停止观察
            observer?.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(chartRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isVisible }
}

/**
 * 节流函数
 * 限制函数执行频率
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 防抖函数
 * 延迟执行，多次触发只执行最后一次
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }

    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(this, args)
  }
}

/**
 * WebWorker 计算封装
 * 将耗时计算移到后台线程
 */
export class WorkerPool {
  private workers: Worker[] = []
  private taskQueue: Array<{
    data: any
    resolve: (value: any) => void
    reject: (error: any) => void
  }> = []
  private activeWorkers = 0

  constructor(
    private workerScript: string,
    private poolSize: number = navigator.hardwareConcurrency || 4
  ) {
    this.initWorkers()
  }

  private initWorkers() {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(this.workerScript)
      this.workers.push(worker)
    }
  }

  async execute(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.activeWorkers < this.poolSize) {
        this.runTask({ data, resolve, reject })
      } else {
        this.taskQueue.push({ data, resolve, reject })
      }
    })
  }

  private runTask(task: {
    data: any
    resolve: (value: any) => void
    reject: (error: any) => void
  }) {
    const worker = this.workers[this.activeWorkers % this.poolSize]
    this.activeWorkers++

    const onMessage = (e: MessageEvent) => {
      task.resolve(e.data)
      cleanup()
      this.processNextTask()
    }

    const onError = (error: ErrorEvent) => {
      task.reject(error)
      cleanup()
      this.processNextTask()
    }

    const cleanup = () => {
      worker.removeEventListener('message', onMessage)
      worker.removeEventListener('error', onError)
    }

    worker.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
    worker.postMessage(task.data)
  }

  private processNextTask() {
    this.activeWorkers--
    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift()!
      this.runTask(nextTask)
    }
  }

  terminate() {
    this.workers.forEach((worker) => worker.terminate())
    this.workers = []
  }
}

/**
 * 创建计算 Worker
 * 用于耗时的数学计算
 */
export function createComputeWorker(): string {
  const workerCode = `
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      switch(type) {
        case 'taylor_series':
          self.postMessage(calculateTaylorSeries(data.n));
          break;
        case 'monte_carlo':
          self.postMessage(monteCarloE(data.trials));
          break;
        case 'newton_method':
          self.postMessage(newtonMethod(data.x0, data.maxIter));
          break;
        default:
          self.postMessage({ error: 'Unknown task type' });
      }
    };
    
    function calculateTaylorSeries(n) {
      let sum = 0;
      let factorial = 1;
      const history = [];
      
      for (let i = 0; i <= n; i++) {
        if (i > 0) factorial *= i;
        sum += 1 / factorial;
        history.push({ n: i, sum, error: Math.abs(sum - Math.E) });
      }
      
      return { result: sum, history };
    }
    
    function monteCarloE(trials) {
      let total = 0;
      const history = [];
      
      for (let t = 1; t <= trials; t++) {
        let n = 0;
        let s = 0;
        while (s < 1) {
          s += Math.random();
          n++;
        }
        total += n;
        
        if (t % 100 === 0) {
          history.push({ trial: t, estimate: total / t });
        }
      }
      
      return { result: total / trials, history };
    }
    
    function newtonMethod(x0, maxIter) {
      let x = x0;
      const history = [];
      
      for (let n = 0; n < maxIter; n++) {
        const fx = Math.log(x) - 1;
        const fpx = 1 / x;
        const error = Math.abs(x - Math.E);
        
        history.push({ n, x, fx, error });
        
        if (Math.abs(fx) < 1e-10) break;
        
        x = x - fx / fpx;
      }
      
      return { result: x, iterations: history.length, history };
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' })
  return URL.createObjectURL(blob)
}

/**
 * 虚拟滚动 Hook
 * 用于大数据量列表渲染
 */
export function useVirtualScroll<T>(
  items: Ref<T[]>,
  itemHeight: number,
  containerHeight: number
) {
  const scrollTop = ref(0)

  const visibleStart = computed(() => {
    return Math.floor(scrollTop.value / itemHeight)
  })

  const visibleEnd = computed(() => {
    return Math.ceil((scrollTop.value + containerHeight) / itemHeight)
  })

  const visibleItems = computed(() => {
    return items.value.slice(visibleStart.value, visibleEnd.value)
  })

  const totalHeight = computed(() => {
    return items.value.length * itemHeight
  })

  const offsetY = computed(() => {
    return visibleStart.value * itemHeight
  })

  const onScroll = (event: Event) => {
    scrollTop.value = (event.target as HTMLElement).scrollTop
  }

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll
  }
}

/**
 * 请求动画帧节流
 * 确保函数每帧最多执行一次
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      func.apply(this, args)
      rafId = null
    })
  }
}

/**
 * 内存管理 - 清理未使用的大对象
 */
export class MemoryManager {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private maxAge: number
  private maxSize: number

  constructor(maxAge = 5 * 60 * 1000, maxSize = 50) {
    this.maxAge = maxAge
    this.maxSize = maxSize
    this.startCleanupTimer()
  }

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
    if (this.cache.size > this.maxSize) {
      this.cleanup()
    }
  }

  get(key: string): any | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return undefined
    }

    return item.data
  }

  private cleanup() {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())

    // 删除过期项
    entries.forEach(([key, value]) => {
      if (now - value.timestamp > this.maxAge) {
        this.cache.delete(key)
      }
    })

    // 如果还是太大，删除最旧的项
    if (this.cache.size > this.maxSize) {
      const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
      const toDelete = sortedEntries.slice(0, this.cache.size - this.maxSize)
      toDelete.forEach(([key]) => this.cache.delete(key))
    }
  }

  private startCleanupTimer() {
    setInterval(() => this.cleanup(), 60 * 1000) // 每分钟清理一次
  }

  clear() {
    this.cache.clear()
  }
}

/**
 * 图片懒加载
 */
export function useLazyImage(imageRef: Ref<HTMLImageElement | undefined>) {
  const isLoaded = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!imageRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.onload = () => {
                isLoaded.value = true
              }
            }
            observer?.disconnect()
          }
        })
      },
      { threshold: 0.01 }
    )

    observer.observe(imageRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isLoaded }
}

/**
 * 性能监控
 */
export class PerformanceMonitor {
  private marks = new Map<string, number>()

  start(label: string) {
    this.marks.set(label, performance.now())
  }

  end(label: string): number {
    const start = this.marks.get(label)
    if (!start) {
      console.warn(`No start mark found for: ${label}`)
      return 0
    }

    const duration = performance.now() - start
    this.marks.delete(label)

    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
    return duration
  }

  measure(label: string, callback: () => void) {
    this.start(label)
    callback()
    return this.end(label)
  }

  async measureAsync(label: string, callback: () => Promise<void>) {
    this.start(label)
    await callback()
    return this.end(label)
  }
}

import { computed } from 'vue'

export default {
  useLazyChart,
  throttle,
  debounce,
  WorkerPool,
  createComputeWorker,
  useVirtualScroll,
  rafThrottle,
  MemoryManager,
  useLazyImage,
  PerformanceMonitor
}
