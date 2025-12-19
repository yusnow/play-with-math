<template>
  <div class="chapter-container chapter1">
    <!-- 页面头部 -->
    <div class="chapter-header">
      <h1 class="chapter-title handwritten">第一章：e的发现之旅</h1>
      <p class="chapter-subtitle">从银行利息到数学常数</p>
    </div>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :emotion="mascotEmotion"
      :message="mascotMessage"
      class="chapter-mascot"
    />

    <!-- Section 1: 复利计算的诞生 -->
    <section class="story-section" id="compound-interest">
      <h2 class="section-title">💰 从一个理财问题开始</h2>
      
      <div class="story-card">
        <p class="story-text">
          <strong>1683年,瑞士数学家雅各布·伯努利</strong>遇到了一个有趣的问题:
        </p>
        <div class="quote-box">
          <p>"如果我把1元钱存入银行,年利率100%,一年后能拿到2元。但如果每半年计算一次利息呢?每季度?每个月?..."</p>
        </div>
      </div>

      <!-- 交互式复利计算器 -->
      <div class="interactive-box">
        <h3 class="interactive-title">🎮 试试看:复利魔法</h3>
        
        <div class="controls-grid">
          <div class="control-item">
            <label>本金 P (元)</label>
            <el-slider 
              v-model="principal" 
              :min="1" 
              :max="100" 
              :step="1"
              show-input
            />
          </div>
          
          <div class="control-item">
            <label>年利率 r (%)</label>
            <el-slider 
              v-model="rate" 
              :min="1" 
              :max="200" 
              :step="1"
              show-input
            />
          </div>
          
          <div class="control-item">
            <label>计息次数 n (每年)</label>
            <el-slider 
              v-model="frequency" 
              :min="1" 
              :max="10000" 
              :step="1"
              :marks="frequencyMarks"
              :format-tooltip="formatFrequency"
            />
            <div class="frequency-presets">
              <el-button size="small" @click="frequency = 1">年(1)</el-button>
              <el-button size="small" @click="frequency = 2">半年(2)</el-button>
              <el-button size="small" @click="frequency = 4">季度(4)</el-button>
              <el-button size="small" @click="frequency = 12">月(12)</el-button>
              <el-button size="small" @click="frequency = 365">日(365)</el-button>
              <el-button size="small" @click="frequency = 8760">时(8760)</el-button>
              <el-button size="small" @click="frequency = 10000">极限</el-button>
            </div>
          </div>
        </div>

        <!-- 可视化图表 -->
        <div class="visualization">
          <div ref="chartContainer" class="chart-container"></div>
          
          <div class="result-display">
            <div class="formula-box">
              <p class="formula">
                A = P × (1 + r/n)<sup>n</sup>
              </p>
              <p class="formula-values">
                = {{ principal }} × (1 + {{ (rate/100).toFixed(2) }}/{{ frequency }})<sup>{{ frequency }}</sup>
              </p>
            </div>
            
            <div class="result-card" :class="{ 'highlight': isNearE }">
              <div class="result-label">一年后的金额</div>
              <div class="result-value">{{ finalAmount.toFixed(6) }} 元</div>
              <div class="result-ratio">
                增长倍数: {{ growthRatio.toFixed(6) }}
              </div>
              
              <div v-if="isNearE" class="discovery-note">
                <el-icon><StarFilled /></el-icon>
                <span>当 n → ∞ 时,这个值接近一个神奇的数: <strong>e ≈ 2.718281828...</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 历史时间线 -->
    <section class="story-section" id="history-timeline">
      <h2 class="section-title">📜 e的历史时间线</h2>
      
      <div class="timeline-container">
        <div 
          v-for="(event, index) in historyEvents" 
          :key="index"
          class="timeline-item"
          :class="{ 'active': activeEvent === index }"
          @click="activeEvent = index"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-year">{{ event.year }}</div>
            <div class="timeline-person">{{ event.person }}</div>
            <div class="timeline-description">{{ event.description }}</div>
            
            <div v-if="event.formula" class="timeline-formula" v-html="renderFormula(event.formula)"></div>
            
            <div v-if="activeEvent === index" class="timeline-details">
              <p>{{ event.details }}</p>
              <a v-if="event.link" :href="event.link" target="_blank" class="learn-more">
                了解更多 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: e符号的命名之谜 -->
    <section class="story-section" id="naming-mystery">
      <h2 class="section-title">🤔 为什么叫"e"?</h2>
      
      <div class="mystery-grid">
        <div 
          v-for="(theory, index) in namingTheories" 
          :key="index"
          class="theory-card"
          @click="selectedTheory = index"
          :class="{ 'selected': selectedTheory === index }"
        >
          <div class="theory-icon">{{ theory.icon }}</div>
          <h3 class="theory-title">{{ theory.title }}</h3>
          <p class="theory-description">{{ theory.description }}</p>
          
          <div v-if="selectedTheory === index" class="theory-details">
            <p>{{ theory.details }}</p>
            <div class="theory-probability">
              可信度: 
              <el-rate 
                v-model="theory.probability" 
                disabled 
                show-score 
                text-color="#ff9900"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 章节导航 -->
    <div class="chapter-navigation">
      <el-button @click="$router.push('/home')" icon="ArrowLeft">返回首页</el-button>
      <el-button type="primary" @click="$router.push('/chapter2')" icon="ArrowRight">
        下一章: e的数学地位
      </el-button>
    </div>

    <!-- 相关概念卡片 -->
    <div class="related-concepts">
      <h3>🔗 相关概念</h3>
      <div class="concept-tags">
        <el-tag @click="showConceptDetail('calculus')">微积分</el-tag>
        <el-tag @click="showConceptDetail('limit')">极限</el-tag>
        <el-tag @click="showConceptDetail('exponential')">指数函数</el-tag>
        <el-tag @click="showConceptDetail('logarithm')">对数</el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'
import { initChart, getStandardChartOption, setupChartResize } from '@/utils/echartsHelper'

// 交互式参数
const principal = ref(1)
const rate = ref(100)
const frequency = ref(1)

// 预设刻度
const frequencyMarks = {
  1: '年',
  12: '月',
  365: '日',
  10000: '极限'
}

// 格式化滑块提示
const formatFrequency = (val: number) => {
  if (val === 1) return '1次/年'
  if (val < 100) return `${val}次/年`
  if (val < 1000) return `${val}次/年`
  return `${(val/1000).toFixed(1)}k次/年`
}

// 计算最终金额
const finalAmount = computed(() => {
  const P = principal.value
  const r = rate.value / 100
  const n = frequency.value
  return P * Math.pow(1 + r / n, n)
})

// 增长倍数
const growthRatio = computed(() => {
  return finalAmount.value / principal.value
})

// 判断是否接近e
const isNearE = computed(() => {
  // 当本金=1,利率=100%时,且频率较大
  return principal.value === 1 && 
         rate.value === 100 && 
         frequency.value >= 365 &&
         Math.abs(growthRatio.value - Math.E) < 0.01
})

// 吉祥物状态
const mascotEmotion = computed(() => {
  if (isNearE.value) return 'excited'
  if (frequency.value > 1000) return 'thinking'
  return 'happy'
})

const mascotMessage = computed(() => {
  if (isNearE.value) {
    return '太棒了!你发现了e的秘密!当计息次数趋向无穷大时,增长倍数会趋向一个固定值——这就是自然常数e!'
  }
  if (frequency.value > 1000) {
    return '继续增加计息次数,你会发现一个有趣的现象...'
  }
  if (frequency.value >= 365) {
    return '每天计息一次,已经很频繁了!试试更大的数字?'
  }
  return '试着调整计息次数,看看金额如何变化~'
})

// 历史事件
const historyEvents = [
  {
    year: '1618',
    person: '约翰·纳皮尔',
    description: '首次在对数表中涉及e',
    details: '苏格兰数学家纳皮尔在研究对数时,无意中触及了e的概念,尽管当时他并未意识到这一常数的重要性。',
    link: 'https://zh.wikipedia.org/wiki/约翰·纳皮尔',
    formula: null
  },
  {
    year: '1683',
    person: '雅各布·伯努利',
    description: '通过复利问题发现e的极限',
    details: '伯努利研究连续复利时发现:当计息次数n趋于无穷大时,(1+1/n)^n 趋于一个常数,约为2.71828...',
    link: 'https://zh.wikipedia.org/wiki/雅各布·伯努利',
    formula: `\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e`
  },
  {
    year: '1690-1691',
    person: '莱布尼茨',
    description: '在信件中使用字母"b"表示这个常数',
    details: '德国数学家莱布尼茨与雅各布·伯努利通信时,用字母"b"表示这个常数,但未正式命名。',
    link: null,
    formula: null
  },
  {
    year: '1727',
    person: '莱昂哈德·欧拉',
    description: '首次使用字母"e"并推广',
    details: '瑞士数学家欧拉在其著作中首次使用字母"e"来表示这个常数,并深入研究了e的性质,从此"e"成为数学界的标准符号。',
    link: 'https://zh.wikipedia.org/wiki/莱昂哈德·欧拉',
    formula: `e = \\sum_{n=0}^{\\infty} \\frac{1}{n!} = 1 + 1 + \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24} + ...`
  },
  {
    year: '1748',
    person: '欧拉',
    description: '证明e是无理数',
    details: '欧拉证明了e不能表示为两个整数的比,因此是无理数。这一发现奠定了e在数论中的重要地位。',
    link: null,
    formula: null
  },
  {
    year: '1873',
    person: '夏尔·埃尔米特',
    description: '证明e是超越数',
    details: '法国数学家埃尔米特证明了e不是任何整系数多项式的根,即e是超越数。这是数学史上的重大突破。',
    link: 'https://zh.wikipedia.org/wiki/夏尔·埃尔米特',
    formula: null
  }
]

const activeEvent = ref(3) // 默认展开欧拉的条目

// 渲染数学公式
function renderFormula(latex: string): string {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false
    })
  } catch (e) {
    console.error('KaTeX 渲染错误:', e)
    return latex
  }
}

// e命名的理论
const namingTheories = [
  {
    icon: '📊',
    title: '源于Exponential',
    description: 'e是指数(Exponential)的首字母',
    details: '这是最流行的说法。因为e是自然指数函数e^x的底数,欧拉很可能用Exponential的首字母来命名这个常数。',
    probability: 4
  },
  {
    icon: '✍️',
    title: '欧拉的名字',
    description: '纪念欧拉(Euler)本人',
    details: '虽然欧拉很谦虚,不太可能用自己名字的首字母,但后人常常这样认为,因为欧拉对e的研究贡献巨大。',
    probability: 2
  },
  {
    icon: '🔤',
    title: '字母表顺序',
    description: 'a,b,c,d已被使用,e是下一个',
    details: '欧拉在研究中习惯按字母表顺序使用符号。当时a,b,c,d可能已用于其他数学对象,e自然成为下一个选择。',
    probability: 3
  },
  {
    icon: '🎲',
    title: '偶然选择',
    description: '没有特殊含义,恰好选了e',
    details: '也有可能欧拉只是随机选择了一个未被占用的字母,并没有深层含义。数学史上这种情况并不罕见。',
    probability: 1
  }
]

const selectedTheory = ref(0)

// 图表容器
const chartContainer = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 初始化图表
let cleanupResize: (() => void) | null = null

onMounted(async () => {
  await nextTick()
  await initializeChart()
})

// 监听参数变化,更新图表
watch([principal, rate, frequency], () => {
  updateChart()
})

// ✅ 使用新的辅助函数安全初始化
async function initializeChart() {
  chartInstance = await initChart(chartContainer.value)
  if (chartInstance) {
    updateChart()
    cleanupResize = setupChartResize(chartInstance, chartContainer.value!)
  } else {
    console.error('[Chapter1] 图表初始化失败')
  }
}

// 组件卸载时清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (cleanupResize) cleanupResize()
  if (chartInstance && !chartInstance.isDisposed()) {
    chartInstance.dispose()
  }
})

function updateChart() {
  if (!chartInstance) return
  
  const P = principal.value
  const r = rate.value / 100
  
  // 生成不同计息次数的数据
  const frequencies = []
  const amounts = []
  
  // 对数刻度: 1, 2, 4, 10, 50, 100, 500, 1000, 5000, 10000
  const nValues = [1, 2, 4, 10, 50, 100, 500, 1000, 5000, 10000]
  
  nValues.forEach(n => {
    frequencies.push(n)
    const amount = P * Math.pow(1 + r / n, n)
    amounts.push(amount.toFixed(6))
  })
  
  // 当前选择的点
  const currentIndex = nValues.findIndex(n => n >= frequency.value)
  
  const option = {
    title: {
      text: '计息次数 vs 最终金额',
      left: 'center',
      textStyle: {
        fontFamily: 'Comic Sans MS, cursive, "Ma Shan Zheng"',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const n = params[0].name
        const amount = params[0].value
        return `计息${n}次/年<br/>最终金额: ${amount}元`
      }
    },
    xAxis: {
      type: 'category',
      name: '计息次数(次/年)',
      data: frequencies,
      axisLabel: {
        rotate: 45,
        formatter: (value: number) => {
          if (value >= 1000) return `${(value/1000).toFixed(0)}k`
          return value
        }
      }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: '最终金额(元)',
      // ✅ 强制显示 Y 轴
      axisLine: {
        show: true,
        lineStyle: { color: '#666' }
      },
      axisTick: { show: true },
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '金额',
        type: 'line',
        data: amounts,
        smooth: true,
        lineStyle: {
          color: '#5470c6',
          width: 3
        },
        itemStyle: {
          color: '#5470c6'
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: '最大值',
              label: {
                formatter: 'e ≈ {c}'
              }
            },
            currentIndex >= 0 ? {
              coord: [currentIndex, amounts[currentIndex]],
              name: '当前',
              itemStyle: {
                color: '#ee6666'
              }
            } : null
          ].filter(Boolean)
        },
        markLine: {
          silent: true,
          lineStyle: {
            color: '#91cc75',
            type: 'dashed'
          },
          data: [
            {
              yAxis: (P * Math.E).toFixed(6),
              name: 'e的极限',
              label: {
                formatter: 'e ≈ 2.71828'
              }
            }
          ]
        }
      }
    ],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    }
  }
  
  chartInstance.setOption(option)
}

// 显示概念详情(未来与概念链接系统集成)
function showConceptDetail(concept: string) {
  console.log('Show concept:', concept)
  // TODO: 集成概念链接系统
  alert(`概念"${concept}"的详细内容正在开发中...`)
}
</script>

<style scoped lang="scss">
.chapter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  // 手绘风格变量
  --color-primary: #5470c6;
  --color-secondary: #91cc75;
  --color-accent: #fac858;
  --color-danger: #ee6666;
  --color-bg: #fffbf5;
  --shadow-hand: 2px 3px 8px rgba(0,0,0,0.15);
  
  background: var(--color-bg);
  font-family: 'Comic Sans MS', cursive, 'Ma Shan Zheng', sans-serif;
}

.chapter-header {
  text-align: center;
  margin-bottom: 3rem;
  
  .chapter-title {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--color-accent);
      transform: skew(-2deg);
    }
  }
  
  .chapter-subtitle {
    font-size: 1.2rem;
    color: #666;
    font-style: italic;
  }
}

.handwritten {
  font-family: 'Ma Shan Zheng', cursive;
}

.story-section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-hand);
  border: 3px solid var(--color-primary);
  transform: rotate(-0.5deg);
  
  &:nth-child(even) {
    transform: rotate(0.5deg);
  }
  
  .section-title {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    border-bottom: 3px dashed var(--color-secondary);
    padding-bottom: 0.5rem;
  }
}

.story-card {
  background: linear-gradient(135deg, #fff9e6 0%, #ffe6f0 100%);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 2px solid var(--color-accent);
  
  .story-text {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  .quote-box {
    background: white;
    padding: 1rem;
    border-left: 4px solid var(--color-primary);
    font-style: italic;
    color: #555;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.05);
  }
}

.interactive-box {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
  padding: 2rem;
  border-radius: 20px;
  border: 3px dashed var(--color-primary);
  
  .interactive-title {
    font-size: 1.5rem;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .controls-grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
    
    .control-item {
      label {
        display: block;
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #333;
      }
      
      .frequency-presets {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
  }
  
  .visualization {
    .chart-container {
      height: 400px;
      margin-bottom: 2rem;
      background: white;
      border-radius: 10px;
      padding: 1rem;
    }
    
    .result-display {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
      
      .formula-box {
        background: white;
        padding: 1.5rem;
        border-radius: 15px;
        border: 2px solid var(--color-secondary);
        text-align: center;
        
        .formula {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          font-family: 'Courier New', monospace;
        }
        
        .formula-values {
          font-size: 1.1rem;
          color: #666;
        }
      }
      
      .result-card {
        background: white;
        padding: 1.5rem;
        border-radius: 15px;
        border: 3px solid var(--color-accent);
        text-align: center;
        transition: all 0.3s ease;
        
        &.highlight {
          background: linear-gradient(135deg, #fff9e6 0%, #ffe6f0 100%);
          border-color: var(--color-danger);
          box-shadow: 0 0 20px rgba(238, 102, 102, 0.3);
          animation: pulse 1.5s infinite;
        }
        
        .result-label {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .result-value {
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        
        .result-ratio {
          font-size: 1.2rem;
          color: #999;
        }
        
        .discovery-note {
          margin-top: 1rem;
          padding: 1rem;
          background: #fff;
          border-radius: 10px;
          border: 2px dashed var(--color-danger);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          .el-icon {
            color: var(--color-accent);
            font-size: 1.5rem;
          }
          
          span {
            text-align: left;
            font-size: 0.95rem;
            line-height: 1.6;
            
            strong {
              color: var(--color-danger);
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.timeline-container {
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(10px);
    }
    
    .timeline-dot {
      position: absolute;
      left: -25px;
      top: 10px;
      width: 20px;
      height: 20px;
      background: white;
      border: 4px solid var(--color-primary);
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    &.active .timeline-dot {
      background: var(--color-accent);
      transform: scale(1.3);
    }
    
    .timeline-content {
      background: white;
      padding: 1.5rem;
      border-radius: 15px;
      border: 2px solid #e0e0e0;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
      
      .timeline-year {
        font-size: 1.3rem;
        font-weight: bold;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
      }
      
      .timeline-person {
        font-size: 1.1rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.5rem;
      }
      
      .timeline-description {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.5rem;
      }
      
      .timeline-formula {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        font-family: 'Courier New', monospace;
        text-align: center;
      }
      
      .timeline-details {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px dashed #e0e0e0;
        color: #555;
        line-height: 1.8;
        
        .learn-more {
          display: inline-block;
          margin-top: 0.5rem;
          color: var(--color-primary);
          text-decoration: none;
          font-weight: bold;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

.mystery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  
  .theory-card {
    background: white;
    padding: 1.5rem;
    border-radius: 15px;
    border: 3px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    &.selected {
      border-color: var(--color-primary);
      background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
    }
    
    .theory-icon {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    .theory-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    
    .theory-description {
      font-size: 0.95rem;
      color: #666;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    .theory-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px dashed #e0e0e0;
      font-size: 0.9rem;
      color: #555;
      line-height: 1.6;
      
      .theory-probability {
        margin-top: 1rem;
        text-align: center;
      }
    }
  }
}

.chapter-navigation {
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: var(--shadow-hand);
}

.related-concepts {
  background: linear-gradient(135deg, #fff9e6 0%, #ffe6f0 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px dashed var(--color-accent);
  
  h3 {
    font-size: 1.3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .concept-tags {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    .el-tag {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.chapter-mascot {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
}

// ============================================
// 移动端适配
// ============================================

@media (max-width: 768px) {
  .chapter1 {
    padding: 0;
  }
  
  // 页面头部
  .chapter-header {
    padding: 2rem 1rem 1.5rem;
    
    .chapter-title {
      font-size: 2rem;
    }
    
    .chapter-subtitle {
      font-size: 0.95rem;
    }
  }
  
  // 吉祥物位置调整
  .chapter-mascot {
    right: 1rem;
    bottom: 5rem; // 避免遮挡内容
    transform: scale(0.85);
  }
  
  // 故事区域
  .story-section {
    padding: 2rem 1rem;
    
    .section-title {
      font-size: 1.5rem;
    }
    
    .story-card {
      padding: 1.25rem;
      
      .story-text {
        font-size: 0.95rem;
      }
      
      .quote-box {
        padding: 1rem;
        font-size: 0.9rem;
      }
    }
  }
  
  // 交互式区域
  .interactive-box {
    padding: 1.5rem 1rem;
    
    .interactive-title {
      font-size: 1.2rem;
    }
    
    .controls-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      
      .control-item {
        label {
          font-size: 0.95rem;
        }
        
        // 滑块触摸优化
        :deep(.el-slider) {
          margin: 1rem 0;
          
          .el-slider__runway {
            height: 8px;
          }
          
          .el-slider__button {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    
    // 公式区域
    .formula-display {
      grid-template-columns: 1fr;
      gap: 1rem;
      
      .formula-box {
        padding: 1rem;
        
        .formula {
          font-size: 1.2rem;
        }
        
        .formula-values {
          font-size: 1rem;
        }
      }
      
      .result-card {
        padding: 1rem;
        
        .result-label {
          font-size: 0.9rem;
        }
        
        .result-value {
          font-size: 1.8rem;
        }
      }
    }
    
    // 图表容器
    .chart-wrapper {
      margin-top: 1.5rem;
      
      .chart-container {
        height: 280px;
      }
    }
  }
  
  // 时间线区域
  .timeline-section {
    padding: 2rem 1rem;
    
    .timeline {
      padding-left: 1.5rem;
      
      .timeline-item {
        padding-left: 2rem;
        padding-bottom: 2rem;
        
        &::before {
          left: -1.5rem;
        }
        
        .timeline-dot {
          left: -2rem;
          width: 16px;
          height: 16px;
        }
        
        .timeline-card {
          padding: 1rem;
          
          .timeline-year {
            font-size: 1.1rem;
          }
          
          .timeline-person {
            font-size: 1rem;
          }
          
          .timeline-description {
            font-size: 0.9rem;
          }
          
          // 数学公式移动端优化
          .timeline-formula {
            overflow-x: auto;
            padding: 0.75rem;
            
            :deep(.katex) {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
  
  // 命名理论区域
  .naming-section {
    padding: 2rem 1rem;
    
    .theories-container {
      .theory-selector {
        flex-direction: column;
        gap: 0.75rem;
        
        .theory-btn {
          width: 100%;
          padding: 1rem;
          
          .theory-icon {
            font-size: 1.5rem;
          }
          
          .theory-title {
            font-size: 0.95rem;
          }
        }
      }
      
      .theory-details {
        padding: 1.25rem;
        margin-top: 1rem;
        
        .theory-description {
          font-size: 1rem;
        }
        
        .theory-content {
          font-size: 0.9rem;
        }
        
        .probability-bar {
          margin-top: 1rem;
        }
      }
    }
  }
  
  // 相关概念区域
  .concepts-section {
    padding: 2rem 1rem;
    
    .concepts-title {
      font-size: 1.2rem;
    }
    
    .concept-tags {
      gap: 0.5rem;
      
      :deep(.el-tag) {
        font-size: 0.9rem;
        padding: 0.4rem 0.8rem;
        // 增大触摸目标
        min-height: 36px;
      }
    }
  }
}

// 超小屏幕适配
@media (max-width: 375px) {
  .chapter-header .chapter-title {
    font-size: 1.75rem;
  }
  
  .interactive-box {
    padding: 1rem 0.75rem;
    
    .chart-wrapper .chart-container {
      height: 240px;
    }
  }
  
  .timeline-section .timeline {
    padding-left: 1rem;
    
    .timeline-item {
      padding-left: 1.5rem;
      
      .timeline-card {
        padding: 0.75rem;
      }
    }
  }
}
</style>
