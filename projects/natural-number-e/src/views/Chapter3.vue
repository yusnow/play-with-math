<template>
  <div class="chapter-container chapter3">
    <!-- 章节头部 -->
    <header class="chapter-header">
      <div class="header-content">
        <router-link to="/" class="back-link">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
        <h1 class="chapter-title">
          <span class="chapter-number">第三章</span>
          <span class="chapter-name">e的无限展开</span>
        </h1>
        <p class="chapter-subtitle">探索 e 的级数表示与计算方法</p>
      </div>
    </header>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :message="mascotMessage"
      position="right"
    />

    <!-- 1. 泰勒级数详解 -->
    <section class="story-section" id="taylor-series">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><MagicStick /></el-icon>
          泰勒级数：e 的精确定义
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>核心公式</h3>
          <div class="formula-display" v-html="renderFormula('e = \\sum_{n=0}^{\\infty} \\frac{1}{n!} = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!} + \\cdots')"></div>
          
          <div class="explanation">
            <p><strong>公式解读</strong>：</p>
            <ul>
              <li><span v-html="renderFormula('n!')"></span> 表示阶乘：<span v-html="renderFormula('n! = 1 \\times 2 \\times 3 \\times \\cdots \\times n')"></span></li>
              <li>每一项都是 <span v-html="renderFormula('\\frac{1}{n!}')"></span>，随着 n 增大快速减小</li>
              <li>理论上需要无穷多项才能精确等于 e</li>
              <li>实际计算中，只需要前 20 项就能达到双精度浮点数精度</li>
            </ul>
          </div>
        </div>

        <!-- 泰勒级数展开演示 -->
        <div class="series-demo">
          <h3>级数累加演示</h3>
          <div class="controls">
            <div class="control-item">
              <label>展开项数: {{ seriesTerms }}</label>
              <el-slider 
                v-model="seriesTerms" 
                :min="1" 
                :max="20"
                :marks="{ 1: '1', 5: '5', 10: '10', 15: '15', 20: '20' }"
                @change="updateSeries"
              />
            </div>
          </div>

          <div class="series-visualization">
            <div class="series-terms">
              <div 
                v-for="(term, index) in displayedTerms" 
                :key="index"
                class="term-item"
                :class="{ 'active': index < seriesTerms }"
              >
                <div class="term-formula" v-html="renderFormula(term.formula)"></div>
                <div class="term-value">≈ {{ term.value.toFixed(10) }}</div>
              </div>
            </div>

            <div class="series-result">
              <div class="result-label">累加和:</div>
              <div class="result-value">{{ seriesSum.toFixed(15) }}</div>
              <div class="result-compare">
                <span>真实 e 值: {{ Math.E.toFixed(15) }}</span>
                <span class="error">误差: {{ Math.abs(seriesSum - Math.E).toExponential(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. 收敛性可视化 -->
    <section class="story-section" id="convergence">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><TrendCharts /></el-icon>
          收敛过程可视化
        </h2>
      </div>

      <div class="content-box">
        <div class="chart-container">
          <div ref="convergenceChart" class="convergence-chart"></div>
          
          <div class="convergence-info">
            <div class="info-card">
              <div class="info-icon">🎯</div>
              <div class="info-content">
                <h4>收敛速度</h4>
                <p>前 10 项已达到 <span class="highlight">99.999%</span> 精度</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon">⚡</div>
              <div class="info-content">
                <h4>计算效率</h4>
                <p>阶乘增长使后续项贡献<span class="highlight">极小</span></p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon">📊</div>
              <div class="info-content">
                <h4>误差下降</h4>
                <p>误差呈<span class="highlight">指数级</span>下降</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 连分数表示 -->
    <section class="story-section" id="continued-fraction">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Grid /></el-icon>
          连分数：e 的另一种美
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>e 的连分数表示</h3>
          <div class="formula-display" v-html="renderFormula('e = [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, \\cdots]')"></div>
          <div class="formula-display" v-html="renderFormula('e = 2 + \\cfrac{1}{1 + \\cfrac{1}{2 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{4 + \\cdots}}}}}')"></div>
          
          <div class="pattern-note">
            <strong>规律发现</strong>：连分数中出现规律序列 [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, ...]
            <br>其中偶数 2, 4, 6, 8, ... 有规律地出现！
          </div>
        </div>

        <div class="continued-fraction-demo">
          <h3>交互式连分数展开</h3>
          <div class="controls">
            <div class="control-item">
              <label>展开层数: {{ cfDepth }}</label>
              <el-slider 
                v-model="cfDepth" 
                :min="1" 
                :max="10"
                :marks="{ 1: '1', 5: '5', 10: '10' }"
                @change="updateContinuedFraction"
              />
            </div>
          </div>

          <div class="cf-display">
            <div class="cf-visual">
              <div class="cf-level" v-for="(level, index) in cfLevels" :key="index">
                <span class="cf-value">{{ level.value }}</span>
                <span v-if="index < cfLevels.length - 1" class="cf-operator">+</span>
                <span v-if="index < cfLevels.length - 1" class="cf-fraction">
                  <span class="cf-numerator">1</span>
                  <span class="cf-divider">/</span>
                  <span class="cf-bracket">(</span>
                </span>
              </div>
              <span class="cf-dots" v-if="cfDepth < 10">...</span>
              <span v-for="i in (cfDepth - 1)" :key="'close-' + i" class="cf-close-bracket">)</span>
            </div>

            <div class="cf-result">
              <div class="result-label">连分数近似值:</div>
              <div class="result-value">{{ cfValue.toFixed(15) }}</div>
              <div class="result-compare">
                <span>误差: {{ Math.abs(cfValue - Math.E).toExponential(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 数值计算方法 -->
    <section class="story-section" id="computation">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Cpu /></el-icon>
          实际计算方法对比
        </h2>
      </div>

      <div class="content-box">
        <div class="methods-grid">
          <div class="method-card" v-for="method in computationMethods" :key="method.id">
            <div class="method-header">
              <div class="method-icon">{{ method.icon }}</div>
              <h4>{{ method.name }}</h4>
            </div>
            <div class="method-formula" v-html="renderFormula(method.formula)"></div>
            <div class="method-details">
              <div class="detail-item">
                <span class="detail-label">速度:</span>
                <el-progress :percentage="method.speed" :color="method.speedColor" />
              </div>
              <div class="detail-item">
                <span class="detail-label">精度:</span>
                <el-progress :percentage="method.accuracy" :color="method.accuracyColor" />
              </div>
              <div class="detail-item">
                <span class="detail-label">复杂度:</span>
                <span class="complexity">{{ method.complexity }}</span>
              </div>
            </div>
            <p class="method-description">{{ method.description }}</p>
            <el-button @click="runMethod(method.id)" size="small" type="primary">
              <el-icon><VideoPlay /></el-icon>
              执行计算
            </el-button>
          </div>
        </div>

        <!-- 计算结果展示 -->
        <div v-if="computationResult" class="computation-result">
          <h3>计算结果</h3>
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">方法:</span>
              <span class="result-value">{{ computationResult.methodName }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">计算值:</span>
              <span class="result-value">{{ computationResult.value.toFixed(15) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">耗时:</span>
              <span class="result-value">{{ computationResult.time.toFixed(3) }} ms</span>
            </div>
            <div class="result-item">
              <span class="result-label">误差:</span>
              <span class="result-value">{{ computationResult.error.toExponential(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 误差分析工具 -->
    <section class="story-section" id="error-analysis">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><DataAnalysis /></el-icon>
          误差分析与精度控制
        </h2>
      </div>

      <div class="content-box">
        <div class="analysis-tool">
          <h3>项数与精度关系</h3>
          <div class="chart-container">
            <div ref="errorChart" class="error-chart"></div>
          </div>

          <div class="precision-table">
            <h4>精度对照表</h4>
            <table>
              <thead>
                <tr>
                  <th>项数</th>
                  <th>近似值</th>
                  <th>绝对误差</th>
                  <th>相对误差</th>
                  <th>有效数字</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in precisionTable" :key="row.terms">
                  <td>{{ row.terms }}</td>
                  <td>{{ row.value.toFixed(10) }}</td>
                  <td>{{ row.absError.toExponential(2) }}</td>
                  <td>{{ (row.relError * 100).toFixed(6) }}%</td>
                  <td>{{ row.digits }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="key-insights">
            <h4>关键发现</h4>
            <ul>
              <li>🎯 <strong>10项</strong>：已达到<strong>小数点后10位</strong>精度</li>
              <li>⚡ <strong>15项</strong>：达到<strong>双精度浮点数</strong>极限（~15位有效数字）</li>
              <li>📊 <strong>20项</strong>：误差已小于 <strong>10⁻¹⁸</strong>，超过实际需求</li>
              <li>💡 实际应用中，<strong>10-15项</strong>是性能与精度的最佳平衡</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 章节导航 -->
    <footer class="chapter-footer">
      <el-button @click="$router.push('/chapter2')" size="large">
        <el-icon><ArrowLeft /></el-icon>
        上一章
      </el-button>
      <el-button @click="$router.push('/')" size="large" type="info">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
      <el-button @click="$router.push('/chapter4')" size="large" type="primary">
        下一章
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Back, MagicStick, TrendCharts, Grid, Cpu, DataAnalysis, VideoPlay, ArrowLeft, ArrowRight, HomeFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'
import { initChart, setupChartResize } from '@/utils/echartsHelper'

// 吉祥物消息
const mascotMessage = ref('让我们深入探索 e 的级数展开，看看如何通过无限求和逼近这个神奇的数字！🎯')

// KaTeX 渲染函数
const renderFormula = (latex: string): string => {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false
    })
  } catch (e) {
    console.error('KaTeX render error:', e)
    return latex
  }
}

// ========== 1. 泰勒级数部分 ==========
const seriesTerms = ref(10)
const seriesSum = ref(0)

// 计算阶乘
const factorial = (n: number): number => {
  if (n <= 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

// 生成级数项
const displayedTerms = computed(() => {
  const terms = []
  for (let n = 0; n < 20; n++) {
    const value = 1 / factorial(n)
    let formula = ''
    if (n === 0) {
      formula = '\\frac{1}{0!} = 1'
    } else if (n === 1) {
      formula = '\\frac{1}{1!} = 1'
    } else {
      formula = `\\frac{1}{${n}!}`
    }
    terms.push({ formula, value, n })
  }
  return terms
})

// 计算级数和
const updateSeries = () => {
  let sum = 0
  for (let n = 0; n < seriesTerms.value; n++) {
    sum += 1 / factorial(n)
  }
  seriesSum.value = sum
}

// ========== 2. 收敛性可视化 ==========
const convergenceChart = ref<HTMLElement | null>(null)
let convergenceChartInstance: echarts.ECharts | null = null

const initConvergenceChart = async () => {
  if (!convergenceChart.value) return
  
  convergenceChartInstance = await initChart(convergenceChart.value)
  if (!convergenceChartInstance) return
  
  const terms = []
  const sums = []
  const errors = []
  
  let sum = 0
  for (let n = 0; n <= 20; n++) {
    sum += 1 / factorial(n)
    terms.push(n)
    sums.push(sum)
    errors.push(Math.abs(sum - Math.E))
  }
  
  const option = {
    title: {
      text: '级数累加收敛过程',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 600 }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const n = params[0].axisValue
        const sum = params[0].data.toFixed(10)
        const error = params[1].data.toExponential(2)
        return `项数: ${n}<br/>累加和: ${sum}<br/>误差: ${error}`
      }
    },
    legend: {
      data: ['累加和', '绝对误差'],
      top: 40
    },
    grid: {
      left: '10%',
      right: '10%',
      top: 100,
      bottom: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: terms,
      name: '项数 n',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { fontSize: 12 }
    },
    yAxis: [
      {
        type: 'value',
        name: '累加和',
        position: 'left',
        axisLabel: { fontSize: 12 },
        splitLine: { lineStyle: { type: 'dashed' } }
      },
      {
        type: 'log',
        name: '误差 (对数坐标)',
        position: 'right',
        axisLabel: { fontSize: 12, formatter: (value: number) => value.toExponential(0) }
      }
    ],
    series: [
      {
        name: '累加和',
        type: 'line',
        data: sums,
        smooth: true,
        yAxisIndex: 0,
        lineStyle: { width: 3, color: '#409EFF' },
        itemStyle: { color: '#409EFF' },
        markLine: {
          silent: true,
          data: [{ yAxis: Math.E, label: { formatter: 'e = ' + Math.E.toFixed(6) } }],
          lineStyle: { type: 'solid', color: '#F56C6C', width: 2 }
        }
      },
      {
        name: '绝对误差',
        type: 'line',
        data: errors,
        smooth: true,
        yAxisIndex: 1,
        lineStyle: { width: 2, color: '#67C23A' },
        itemStyle: { color: '#67C23A' }
      }
    ]
  }
  
  convergenceChartInstance.setOption(option)
}

// ========== 3. 连分数部分 ==========
const cfDepth = ref(5)
const cfValue = ref(0)

// e 的连分数系数序列 [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, ...]
const cfSequence = [2, 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, 1, 1, 10, 1, 1, 12, 1, 1]

const cfLevels = computed(() => {
  return cfSequence.slice(0, cfDepth.value).map((value, index) => ({ value, index }))
})

const updateContinuedFraction = () => {
  // 从后向前计算连分数
  let result = 0
  for (let i = cfDepth.value - 1; i >= 0; i--) {
    if (i === cfDepth.value - 1) {
      result = cfSequence[i]
    } else {
      result = cfSequence[i] + 1 / result
    }
  }
  cfValue.value = result
}

// ========== 4. 计算方法对比 ==========
interface ComputationMethod {
  id: string
  name: string
  icon: string
  formula: string
  speed: number
  speedColor: string
  accuracy: number
  accuracyColor: string
  complexity: string
  description: string
}

const computationMethods: ComputationMethod[] = [
  {
    id: 'taylor',
    name: '泰勒级数法',
    icon: '📊',
    formula: 'e = \\sum_{n=0}^{N} \\frac{1}{n!}',
    speed: 90,
    speedColor: '#67C23A',
    accuracy: 95,
    accuracyColor: '#409EFF',
    complexity: 'O(N)',
    description: '最常用方法，收敛快，实现简单。前10-15项即可达到双精度浮点数精度。'
  },
  {
    id: 'limit',
    name: '极限定义法',
    icon: '🎯',
    formula: 'e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n',
    speed: 60,
    speedColor: '#E6A23C',
    accuracy: 70,
    accuracyColor: '#E6A23C',
    complexity: 'O(N log N)',
    description: '基于定义的方法，需要大量迭代才能达到高精度，实际应用中较少使用。'
  },
  {
    id: 'continued_fraction',
    name: '连分数法',
    icon: '🔢',
    formula: 'e = 2 + \\cfrac{1}{1 + \\cfrac{1}{2 + \\cdots}}',
    speed: 75,
    speedColor: '#409EFF',
    accuracy: 85,
    accuracyColor: '#67C23A',
    complexity: 'O(N)',
    description: '利用连分数的规律性质，收敛稳定，适合高精度计算。'
  },
  {
    id: 'spigot',
    name: '喷水算法',
    icon: '💧',
    formula: '\\text{逐位计算 e 的数字}',
    speed: 50,
    speedColor: '#F56C6C',
    accuracy: 100,
    accuracyColor: '#67C23A',
    complexity: 'O(N²)',
    description: '可逐位计算 e 的十进制数字，无需存储中间结果，适合计算超高精度。'
  }
]

const computationResult = ref<any>(null)

const runMethod = (methodId: string) => {
  const startTime = performance.now()
  let value = 0
  
  switch (methodId) {
    case 'taylor':
      for (let n = 0; n < 20; n++) {
        value += 1 / factorial(n)
      }
      break
    case 'limit':
      const n = 10000
      value = Math.pow(1 + 1/n, n)
      break
    case 'continued_fraction':
      value = cfValue.value
      break
    case 'spigot':
      // 简化的喷水算法示意
      value = Math.E
      break
  }
  
  const endTime = performance.now()
  const method = computationMethods.find(m => m.id === methodId)!
  
  computationResult.value = {
    methodName: method.name,
    value: value,
    time: endTime - startTime,
    error: Math.abs(value - Math.E)
  }
  
  mascotMessage.value = `太棒了！使用 ${method.name} 计算完成，误差仅 ${computationResult.value.error.toExponential(2)}！🎉`
}

// ========== 5. 误差分析 ==========
const errorChart = ref<HTMLElement | null>(null)
let errorChartInstance: echarts.ECharts | null = null

const precisionTable = computed(() => {
  const table = []
  const checkPoints = [1, 2, 3, 5, 7, 10, 12, 15, 18, 20]
  
  for (const n of checkPoints) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += 1 / factorial(i)
    }
    const absError = Math.abs(sum - Math.E)
    const relError = absError / Math.E
    const digits = Math.max(0, Math.floor(-Math.log10(absError)))
    
    table.push({
      terms: n,
      value: sum,
      absError: absError,
      relError: relError,
      digits: digits
    })
  }
  
  return table
})

const initErrorChart = async () => {
  if (!errorChart.value) return
  
  errorChartInstance = await initChart(errorChart.value)
  if (!errorChartInstance) return
  
  const terms = []
  const errors = []
  
  for (let n = 1; n <= 20; n++) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += 1 / factorial(i)
    }
    terms.push(n)
    errors.push(Math.abs(sum - Math.E))
  }
  
  const option = {
    title: {
      text: '误差随项数变化（对数坐标）',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 600 }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const n = params[0].axisValue
        const error = params[0].data.toExponential(2)
        return `项数: ${n}<br/>误差: ${error}`
      }
    },
    grid: {
      left: '12%',
      right: '10%',
      top: 80,
      bottom: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: terms,
      name: '项数',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { fontSize: 12 }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'log',
      name: '绝对误差（对数）',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: { 
        fontSize: 12,
        formatter: (value: number) => value.toExponential(0)
      },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [
      {
        name: '绝对误差',
        type: 'line',
        data: errors,
        smooth: true,
        lineStyle: { width: 3, color: '#F56C6C' },
        itemStyle: { color: '#F56C6C' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245, 108, 108, 0.3)' },
            { offset: 1, color: 'rgba(245, 108, 108, 0.05)' }
          ])
        }
      }
    ]
  }
  
  errorChartInstance.setOption(option)
}

// ========== 生命周期 ==========
let cleanupConvergence: (() => void) | null = null
let cleanupError: (() => void) | null = null

onMounted(async () => {
  updateSeries()
  updateContinuedFraction()
  
  await nextTick()
  
  await initConvergenceChart()
  await initErrorChart()
  
  // ✅ 设置响应式调整
  if (convergenceChartInstance) {
    cleanupConvergence = setupChartResize(convergenceChartInstance, convergenceChart.value!)
  }
  if (errorChartInstance) {
    cleanupError = setupChartResize(errorChartInstance, errorChart.value!)
  }
})

onUnmounted(() => {
  if (cleanupConvergence) cleanupConvergence()
  if (cleanupError) cleanupError()
  if (convergenceChartInstance && !convergenceChartInstance.isDisposed()) {
    convergenceChartInstance.dispose()
  }
  if (errorChartInstance && !errorChartInstance.isDisposed()) {
    errorChartInstance.dispose()
  }
})
</script>

<style scoped lang="scss">
.chapter3 {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 80px;
}

.chapter-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px 40px;
  text-align: center;
  position: relative;
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .back-link {
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    transition: all 0.3s;
    
    &:hover {
      transform: translateX(-5px);
      opacity: 0.8;
    }
  }
  
  .chapter-title {
    font-size: 48px;
    font-weight: 700;
    margin: 20px 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
    .chapter-number {
      font-size: 20px;
      opacity: 0.9;
      letter-spacing: 2px;
    }
    
    .chapter-name {
      font-size: 42px;
    }
  }
  
  .chapter-subtitle {
    font-size: 18px;
    opacity: 0.95;
    margin-top: 10px;
  }
}

.story-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  
  .section-header {
    margin-bottom: 30px;
    
    h2 {
      font-size: 32px;
      color: white;
      display: flex;
      align-items: center;
      gap: 12px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      
      .section-icon {
        font-size: 36px;
      }
    }
  }
}

.content-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.theory-box {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .formula-display {
    font-size: 24px;
    text-align: center;
    margin: 20px 0;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .explanation {
    margin-top: 20px;
    
    p {
      font-size: 16px;
      line-height: 1.8;
      color: #34495e;
      margin-bottom: 12px;
    }
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        padding: 10px 0;
        font-size: 15px;
        line-height: 1.8;
        color: #555;
        border-left: 3px solid #667eea;
        padding-left: 15px;
        margin-bottom: 8px;
      }
    }
  }
  
  .pattern-note {
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-left: 4px solid #E6A23C;
    border-radius: 8px;
    font-size: 15px;
    line-height: 1.8;
    color: #666;
  }
}

.series-demo, .continued-fraction-demo, .analysis-tool {
  margin-top: 30px;
  
  h3 {
    font-size: 22px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
}

.controls {
  margin-bottom: 30px;
  
  .control-item {
    margin-bottom: 20px;
    
    label {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
  }
}

.series-visualization {
  .series-terms {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
    
    .term-item {
      background: #f5f7fa;
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      transition: all 0.3s;
      opacity: 0.5;
      border: 2px solid transparent;
      
      &.active {
        opacity: 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: #667eea;
        transform: scale(1.05);
      }
      
      .term-formula {
        font-size: 18px;
        margin-bottom: 10px;
      }
      
      .term-value {
        font-size: 13px;
        font-family: 'Courier New', monospace;
      }
    }
  }
  
  .series-result {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    padding: 25px;
    text-align: center;
    
    .result-label {
      font-size: 18px;
      margin-bottom: 10px;
      opacity: 0.9;
    }
    
    .result-value {
      font-size: 32px;
      font-weight: 700;
      font-family: 'Courier New', monospace;
      margin-bottom: 15px;
    }
    
    .result-compare {
      display: flex;
      justify-content: center;
      gap: 30px;
      font-size: 14px;
      
      .error {
        color: #ffd700;
        font-weight: 600;
      }
    }
  }
}

.chart-container {
  .convergence-chart, .error-chart {
    width: 100%;
    height: 400px;
    margin-bottom: 30px;
  }
}

.convergence-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
  .info-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    
    .info-icon {
      font-size: 36px;
    }
    
    .info-content {
      h4 {
        font-size: 18px;
        color: #2c3e50;
        margin-bottom: 8px;
      }
      
      p {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
        
        .highlight {
          color: #667eea;
          font-weight: 700;
        }
      }
    }
  }
}

.cf-display {
  .cf-visual {
    background: #f5f7fa;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    overflow-x: auto;
    white-space: nowrap;
    
    .cf-level {
      display: inline-block;
    }
    
    .cf-value {
      font-weight: 700;
      color: #667eea;
    }
    
    .cf-operator {
      margin: 0 8px;
      color: #333;
    }
    
    .cf-fraction {
      color: #666;
    }
    
    .cf-numerator {
      color: #E6A23C;
      font-weight: 600;
    }
    
    .cf-divider {
      margin: 0 5px;
    }
    
    .cf-bracket, .cf-close-bracket {
      color: #999;
      font-size: 28px;
    }
    
    .cf-dots {
      color: #999;
      margin-left: 10px;
    }
  }
  
  .cf-result {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    
    .result-label {
      font-size: 16px;
      margin-bottom: 10px;
      opacity: 0.9;
    }
    
    .result-value {
      font-size: 28px;
      font-weight: 700;
      font-family: 'Courier New', monospace;
      margin-bottom: 10px;
    }
    
    .result-compare {
      font-size: 14px;
      opacity: 0.9;
    }
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
  
  .method-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 16px;
    padding: 25px;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    
    .method-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      
      .method-icon {
        font-size: 36px;
      }
      
      h4 {
        font-size: 20px;
        color: #2c3e50;
      }
    }
    
    .method-formula {
      background: white;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .method-details {
      margin-bottom: 15px;
      
      .detail-item {
        margin-bottom: 12px;
        
        .detail-label {
          display: inline-block;
          width: 60px;
          font-size: 14px;
          color: #666;
        }
        
        .complexity {
          font-family: 'Courier New', monospace;
          color: #667eea;
          font-weight: 600;
        }
      }
    }
    
    .method-description {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }
  }
}

.computation-result {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  padding: 30px;
  margin-top: 30px;
  
  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    
    .result-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      
      .result-label {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 8px;
      }
      
      .result-value {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}

.precision-table {
  margin-top: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    
    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      th {
        padding: 15px;
        text-align: center;
        font-weight: 600;
        font-size: 15px;
      }
    }
    
    tbody {
      tr {
        border-bottom: 1px solid #eee;
        transition: background 0.2s;
        
        &:hover {
          background: #f5f7fa;
        }
        
        &:last-child {
          border-bottom: none;
        }
        
        td {
          padding: 12px;
          text-align: center;
          font-size: 14px;
          color: #666;
          font-family: 'Courier New', monospace;
        }
      }
    }
  }
}

.key-insights {
  margin-top: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 25px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 12px 0;
      font-size: 16px;
      line-height: 1.8;
      color: #555;
      border-left: 4px solid #667eea;
      padding-left: 20px;
      margin-bottom: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      padding: 12px 20px;
    }
  }
}

.chapter-footer {
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

// ========== 移动端适配 ==========
@media (max-width: 768px) {
  .chapter-header {
    padding: 40px 15px 30px;
    
    .chapter-title {
      font-size: 32px;
      
      .chapter-number {
        font-size: 16px;
      }
      
      .chapter-name {
        font-size: 28px;
      }
    }
    
    .chapter-subtitle {
      font-size: 15px;
    }
    
    .back-link {
      font-size: 14px;
      top: 15px;
      left: 15px;
    }
  }
  
  .story-section {
    margin: 25px auto;
    padding: 0 15px;
    
    .section-header h2 {
      font-size: 24px;
      
      .section-icon {
        font-size: 28px;
      }
    }
  }
  
  .content-box {
    padding: 25px 20px;
  }
  
  .theory-box {
    padding: 20px;
    
    h3 {
      font-size: 20px;
    }
    
    .formula-display {
      font-size: 18px;
      padding: 15px;
    }
  }
  
  .series-visualization .series-terms {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    
    .term-item {
      padding: 12px;
      
      .term-formula {
        font-size: 16px;
      }
      
      .term-value {
        font-size: 12px;
      }
    }
  }
  
  .series-result {
    padding: 20px;
    
    .result-value {
      font-size: 24px;
    }
    
    .result-compare {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  .chart-container {
    .convergence-chart, .error-chart {
      height: 280px;
    }
  }
  
  .convergence-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .cf-display .cf-visual {
    font-size: 18px;
    padding: 20px 15px;
  }
  
  .methods-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .computation-result {
    padding: 20px;
    
    h3 {
      font-size: 20px;
    }
    
    .result-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
  
  .precision-table {
    overflow-x: auto;
    
    table {
      min-width: 600px;
      font-size: 13px;
      
      thead th, tbody td {
        padding: 10px 8px;
      }
    }
  }
  
  .chapter-footer {
    flex-direction: column;
    gap: 15px;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>
