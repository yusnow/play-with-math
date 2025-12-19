<template>
  <div class="chapter-container chapter6">
    <!-- 章节头部 -->
    <header class="chapter-header">
      <div class="header-content">
        <router-link to="/" class="back-link">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
        <h1 class="chapter-title">
          <span class="chapter-number">第六章</span>
          <span class="chapter-name">探索实验室</span>
        </h1>
        <p class="chapter-subtitle">动手实验，深度探索 e 的奥秘</p>
      </div>
    </header>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :message="mascotMessage"
      position="right"
    />

    <!-- 1. 函数探索器 -->
    <section class="story-section" id="function-explorer">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><TrendCharts /></el-icon>
          函数探索器
        </h2>
      </div>

      <div class="content-box">
        <div class="explorer-intro">
          <h3>探索含有 e 的函数</h3>
          <p>选择预设函数或自定义表达式，实时观察函数图像的变化。</p>
        </div>

        <div class="function-selector">
          <el-radio-group v-model="selectedFunction" @change="updateFunctionPlot">
            <el-radio-button label="exp">e^x</el-radio-button>
            <el-radio-button label="ln">ln(x)</el-radio-button>
            <el-radio-button label="exp_decay">e^(-x)</el-radio-button>
            <el-radio-button label="gaussian">e^(-x²)</el-radio-button>
            <el-radio-button label="complex">e^x · sin(x)</el-radio-button>
            <el-radio-button label="custom">自定义</el-radio-button>
          </el-radio-group>
        </div>

        <div v-if="selectedFunction === 'custom'" class="custom-input">
          <el-input 
            v-model="customExpression" 
            placeholder="输入表达式，例如: e^x * cos(x)"
            @blur="updateFunctionPlot"
          >
            <template #prepend>f(x) =</template>
          </el-input>
          <p class="input-hint">提示: 使用 e, x, sin(), cos(), ln() 等函数</p>
        </div>

        <div class="controls-grid">
          <div class="control-item">
            <label>x 范围: [{{ xRange[0] }}, {{ xRange[1] }}]</label>
            <el-slider 
              v-model="xRange" 
              range
              :min="-10" 
              :max="10"
              @change="updateFunctionPlot"
            />
          </div>
        </div>

        <div class="chart-container">
          <div ref="functionChart" class="function-chart"></div>
        </div>

        <div class="function-properties">
          <h4>函数性质分析</h4>
          <div class="properties-grid">
            <div class="property-card">
              <h5>定义域</h5>
              <p>{{ functionProperties.domain }}</p>
            </div>
            <div class="property-card">
              <h5>值域</h5>
              <p>{{ functionProperties.range }}</p>
            </div>
            <div class="property-card">
              <h5>单调性</h5>
              <p>{{ functionProperties.monotonicity }}</p>
            </div>
            <div class="property-card">
              <h5>凹凸性</h5>
              <p>{{ functionProperties.concavity }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. e的艺术 -->
    <section class="story-section" id="e-art">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Picture /></el-icon>
          e的艺术：参数方程
        </h2>
      </div>

      <div class="content-box">
        <div class="art-intro">
          <h3>用 e 创造美丽的曲线</h3>
          <p>通过参数方程 x(t) 和 y(t) 创造包含 e 的艺术图案</p>
        </div>

        <div class="art-presets">
          <el-button 
            v-for="preset in artPresets" 
            :key="preset.name"
            @click="selectArtPreset(preset)"
            :type="currentArt === preset.name ? 'primary' : ''"
          >
            {{ preset.name }}
          </el-button>
        </div>

        <div class="parametric-controls">
          <div class="param-input">
            <label>x(t) =</label>
            <el-input v-model="parametric.x" @blur="updateParametricPlot" />
          </div>
          <div class="param-input">
            <label>y(t) =</label>
            <el-input v-model="parametric.y" @blur="updateParametricPlot" />
          </div>
          <div class="param-range">
            <label>t ∈ [{{ tRange[0] }}, {{ tRange[1] }}]</label>
            <el-slider 
              v-model="tRange" 
              range
              :min="0" 
              :max="20"
              :step="0.5"
              @change="updateParametricPlot"
            />
          </div>
        </div>

        <div class="art-canvas-container">
          <canvas ref="artCanvas" width="600" height="600" class="art-canvas"></canvas>
          <div class="canvas-controls">
            <el-button @click="animateParametric" type="primary">
              <el-icon><VideoPlay /></el-icon>
              动画演示
            </el-button>
            <el-button @click="updateParametricPlot">
              <el-icon><Refresh /></el-icon>
              重新绘制
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 数值实验台 -->
    <section class="story-section" id="numerical-lab">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Operation /></el-icon>
          数值计算实验
        </h2>
      </div>

      <div class="content-box">
        <el-tabs v-model="numericalTab">
          <el-tab-pane label="级数求和" name="series">
            <div class="experiment-content">
              <h4>计算 e 的泰勒级数</h4>
              <div class="formula-display" v-html="renderFormula('e = \\sum_{n=0}^{N} \\frac{1}{n!}')"></div>
              
              <div class="experiment-controls">
                <label>计算项数 N: {{ seriesN }}</label>
                <el-slider v-model="seriesN" :min="1" :max="50" @change="calculateSeries" />
              </div>

              <div class="result-display">
                <h5>计算结果</h5>
                <div class="result-value">{{ seriesResult.toFixed(15) }}</div>
                <div class="result-comparison">
                  <p>真实值: {{ Math.E.toFixed(15) }}</p>
                  <p>误差: {{ seriesError.toExponential(4) }}</p>
                  <p>相对误差: {{ (seriesError / Math.E * 100).toFixed(8) }}%</p>
                </div>
              </div>

              <div class="convergence-table">
                <h5>收敛过程</h5>
                <table>
                  <thead>
                    <tr>
                      <th>项数 n</th>
                      <th>累加和 S_n</th>
                      <th>误差</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in convergenceData.slice(-10)" :key="row.n">
                      <td>{{ row.n }}</td>
                      <td>{{ row.sum.toFixed(10) }}</td>
                      <td>{{ row.error.toExponential(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="极限计算" name="limit">
            <div class="experiment-content">
              <h4>验证 e 的极限定义</h4>
              <div class="formula-display" v-html="renderFormula('\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e')"></div>
              
              <div class="experiment-controls">
                <label>n 值: {{ limitN }}</label>
                <el-slider v-model="limitN" :min="10" :max="10000" :step="10" @change="calculateLimit" />
              </div>

              <div class="result-display">
                <h5>计算结果</h5>
                <div class="result-value">{{ limitResult.toFixed(15) }}</div>
                <div class="result-comparison">
                  <p>真实值: {{ Math.E.toFixed(15) }}</p>
                  <p>误差: {{ limitError.toExponential(4) }}</p>
                  <p>相对误差: {{ (limitError / Math.E * 100).toFixed(8) }}%</p>
                </div>
              </div>

              <div class="limit-chart-container">
                <div ref="limitChart" class="limit-chart"></div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="数值积分" name="integral">
            <div class="experiment-content">
              <h4>计算定积分</h4>
              <div class="formula-display" v-html="renderFormula('\\int_{0}^{1} e^x \\, dx = e - 1')"></div>
              
              <div class="experiment-controls">
                <label>分割数: {{ integralN }}</label>
                <el-slider v-model="integralN" :min="10" :max="1000" :step="10" @change="calculateIntegral" />
              </div>

              <div class="result-display">
                <h5>梯形法计算结果</h5>
                <div class="result-value">{{ integralResult.toFixed(15) }}</div>
                <div class="result-comparison">
                  <p>精确值: {{ (Math.E - 1).toFixed(15) }}</p>
                  <p>误差: {{ integralError.toExponential(4) }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- 4. 数学游戏 -->
    <section class="story-section" id="math-games">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Trophy /></el-icon>
          数学游戏挑战
        </h2>
      </div>

      <div class="content-box">
        <div class="games-grid">
          <!-- 游戏1: e的小数位记忆 -->
          <div class="game-card">
            <div class="game-header">
              <h3>🎯 e 的小数位记忆</h3>
              <el-tag>记忆力</el-tag>
            </div>
            <p class="game-desc">记住 e 的前 20 位小数</p>
            <div class="game-content">
              <div class="e-digits-display">
                <span class="digit-label">e = 2.</span>
                <span v-for="(digit, index) in eDigitsArray.slice(0, 20)" :key="index" class="e-digit">
                  {{ showDigits || index < revealedDigits ? digit : '?' }}
                </span>
              </div>
              <div class="game-controls">
                <el-button @click="revealMoreDigits" size="small">显示更多</el-button>
                <el-button @click="showDigits = !showDigits" size="small" type="primary">
                  {{ showDigits ? '隐藏' : '显示答案' }}
                </el-button>
              </div>
            </div>
          </div>

          <!-- 游戏2: 公式配对 -->
          <div class="game-card">
            <div class="game-header">
              <h3>🔗 公式配对</h3>
              <el-tag type="success">逻辑</el-tag>
            </div>
            <p class="game-desc">将公式与其结果正确配对</p>
            <div class="game-content">
              <div class="matching-game">
                <div class="formula-items">
                  <div 
                    v-for="(item, index) in matchingItems" 
                    :key="index"
                    class="match-item"
                    :class="{ 
                      selected: selectedMatch === index,
                      correct: item.matched && item.correct,
                      wrong: item.matched && !item.correct
                    }"
                    @click="selectMatch(index)"
                  >
                    <div v-html="renderFormula(item.formula)"></div>
                  </div>
                </div>
              </div>
              <div class="game-score">
                <p>得分: {{ matchScore }} / {{ matchingItems.length / 2 }}</p>
                <el-button @click="resetMatching" size="small">重新开始</el-button>
              </div>
            </div>
          </div>

          <!-- 游戏3: 快速问答 -->
          <div class="game-card">
            <div class="game-header">
              <h3>⚡ 快速问答</h3>
              <el-tag type="warning">速度</el-tag>
            </div>
            <p class="game-desc">测试你对 e 的理解</p>
            <div class="game-content">
              <div v-if="!quizStarted" class="quiz-start">
                <el-button @click="startQuiz" type="primary" size="large">
                  开始挑战
                </el-button>
              </div>
              <div v-else class="quiz-content">
                <div class="quiz-progress">
                  <p>题目 {{ currentQuizIndex + 1 }} / {{ quizQuestions.length }}</p>
                  <p>得分: {{ quizScore }}</p>
                </div>
                <div v-if="currentQuizIndex < quizQuestions.length" class="quiz-question">
                  <h4>{{ quizQuestions[currentQuizIndex].question }}</h4>
                  <div class="quiz-options">
                    <el-button 
                      v-for="(option, index) in quizQuestions[currentQuizIndex].options" 
                      :key="index"
                      @click="answerQuiz(index)"
                      :type="quizAnswered && index === quizQuestions[currentQuizIndex].correct ? 'success' : ''"
                      :disabled="quizAnswered"
                      class="quiz-option-btn"
                    >
                      {{ option }}
                    </el-button>
                  </div>
                  <div v-if="quizAnswered" class="quiz-feedback">
                    <p :class="quizCorrect ? 'correct-answer' : 'wrong-answer'">
                      {{ quizCorrect ? '✓ 回答正确！' : '✗ 回答错误' }}
                    </p>
                    <p class="answer-explanation">{{ quizQuestions[currentQuizIndex].explanation }}</p>
                    <el-button @click="nextQuizQuestion" type="primary">下一题</el-button>
                  </div>
                </div>
                <div v-else class="quiz-result">
                  <h3>挑战完成！</h3>
                  <p class="final-score">你的得分: {{ quizScore }} / {{ quizQuestions.length }}</p>
                  <p class="score-rating">{{ getScoreRating() }}</p>
                  <el-button @click="resetQuiz" type="primary">重新挑战</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 知识检测 -->
    <section class="story-section" id="knowledge-test">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Medal /></el-icon>
          学习成果检测
        </h2>
      </div>

      <div class="content-box">
        <div class="test-intro">
          <h3>测试你对 e 的理解程度</h3>
          <p>完成以下测试，评估你的学习成果</p>
        </div>

        <div class="knowledge-categories">
          <div 
            v-for="category in knowledgeCategories" 
            :key="category.name"
            class="category-card"
          >
            <div class="category-header">
              <h4>{{ category.icon }} {{ category.name }}</h4>
              <el-progress 
                :percentage="category.mastery" 
                :color="category.mastery >= 80 ? '#67C23A' : category.mastery >= 60 ? '#E6A23C' : '#F56C6C'"
              />
            </div>
            <p class="category-desc">{{ category.description }}</p>
            <div class="category-topics">
              <el-tag 
                v-for="topic in category.topics" 
                :key="topic"
                size="small"
                class="topic-tag"
              >
                {{ topic }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="overall-progress">
          <h4>总体掌握度</h4>
          <el-progress 
            :percentage="overallMastery" 
            :stroke-width="20"
            :color="progressColor"
          >
            <span class="progress-text">{{ overallMastery }}%</span>
          </el-progress>
          <p class="mastery-level">{{ getMasteryLevel() }}</p>
        </div>

        <div class="achievement-showcase">
          <h4>🏆 成就徽章</h4>
          <div class="achievements-grid">
            <div 
              v-for="achievement in achievements" 
              :key="achievement.name"
              class="achievement-badge"
              :class="{ unlocked: achievement.unlocked }"
            >
              <div class="badge-icon">{{ achievement.icon }}</div>
              <div class="badge-name">{{ achievement.name }}</div>
              <div class="badge-desc">{{ achievement.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 章节导航 -->
    <footer class="chapter-footer">
      <el-button @click="$router.push('/chapter5')" size="large">
        <el-icon><ArrowLeft /></el-icon>
        上一章
      </el-button>
      <el-button @click="$router.push('/')" size="large" type="success">
        <el-icon><CircleCheck /></el-icon>
        完成学习
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { Back, TrendCharts, Picture, Operation, Trophy, Medal, VideoPlay, Refresh, ArrowLeft, CircleCheck } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'

// 吉祥物消息
const mascotMessage = ref('欢迎来到探索实验室！动手实践，深度理解 e 的每一个细节！🔬')

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

// ========== 1. 函数探索器 ==========
const selectedFunction = ref('exp')
const customExpression = ref('')
const xRange = ref([-5, 5])
const functionChart = ref<HTMLElement | null>(null)
let functionChartInstance: echarts.ECharts | null = null

const functionProperties = computed(() => {
  const props: Record<string, any> = {
    exp: {
      domain: '(-∞, +∞)',
      range: '(0, +∞)',
      monotonicity: '单调递增',
      concavity: '上凸'
    },
    ln: {
      domain: '(0, +∞)',
      range: '(-∞, +∞)',
      monotonicity: '单调递增',
      concavity: '下凹'
    },
    exp_decay: {
      domain: '(-∞, +∞)',
      range: '(0, +∞)',
      monotonicity: '单调递减',
      concavity: '上凸'
    },
    gaussian: {
      domain: '(-∞, +∞)',
      range: '(0, 1]',
      monotonicity: '(-∞,0)递增，(0,+∞)递减',
      concavity: '有拐点'
    },
    complex: {
      domain: '(-∞, +∞)',
      range: '(-∞, +∞)',
      monotonicity: '非单调',
      concavity: '有拐点'
    }
  }
  return props[selectedFunction.value] || { domain: 'R', range: 'R', monotonicity: '-', concavity: '-' }
})

const evaluateFunction = (x: number): number => {
  switch (selectedFunction.value) {
    case 'exp':
      return Math.exp(x)
    case 'ln':
      return x > 0 ? Math.log(x) : NaN
    case 'exp_decay':
      return Math.exp(-x)
    case 'gaussian':
      return Math.exp(-x * x)
    case 'complex':
      return Math.exp(x) * Math.sin(x)
    default:
      return Math.exp(x)
  }
}

const updateFunctionPlot = () => {
  if (!functionChartInstance) return
  
  const xData = []
  const yData = []
  const step = (xRange.value[1] - xRange.value[0]) / 200
  
  for (let x = xRange.value[0]; x <= xRange.value[1]; x += step) {
    xData.push(x.toFixed(2))
    yData.push(evaluateFunction(x))
  }
  
  const functionNames: Record<string, string> = {
    exp: 'f(x) = eˣ',
    ln: 'f(x) = ln(x)',
    exp_decay: 'f(x) = e⁻ˣ',
    gaussian: 'f(x) = e⁻ˣ²',
    complex: 'f(x) = eˣ·sin(x)'
  }
  
  const option = {
    title: {
      text: functionNames[selectedFunction.value] || '函数图像',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `x = ${params[0].axisValue}<br/>f(x) = ${params[0].data.toFixed(4)}`
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: 80,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: xData,
      name: 'x',
      axisLabel: { interval: Math.floor(xData.length / 10) }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: 'f(x)'
    },
    series: [{
      type: 'line',
      data: yData,
      smooth: true,
      lineStyle: { width: 3, color: '#667eea' },
      showSymbol: false
    }]
  }
  
  functionChartInstance.setOption(option)
}

const initFunctionChart = () => {
  if (!functionChart.value) return
  functionChartInstance = echarts.init(functionChart.value)
  updateFunctionPlot()
}

// ========== 2. e的艺术 ==========
const artCanvas = ref<HTMLCanvasElement | null>(null)
const parametric = ref({
  x: 't * cos(t) * exp(-t/10)',
  y: 't * sin(t) * exp(-t/10)'
})
const tRange = ref([0, 10])
const currentArt = ref('spiral')

const artPresets = [
  { name: '螺旋', x: 't * cos(t) * exp(-t/10)', y: 't * sin(t) * exp(-t/10)' },
  { name: '玫瑰', x: 'exp(t/5) * cos(3*t)', y: 'exp(t/5) * sin(3*t)' },
  { name: '心形', x: '16 * sin(t)^3', y: '13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t)' },
  { name: '蝴蝶', x: 'sin(t) * (exp(cos(t)) - 2*cos(4*t))', y: 'cos(t) * (exp(cos(t)) - 2*cos(4*t))' }
]

const selectArtPreset = (preset: any) => {
  parametric.value.x = preset.x
  parametric.value.y = preset.y
  currentArt.value = preset.name
  updateParametricPlot()
}

const evaluateParametric = (t: number): { x: number, y: number } => {
  try {
    const x = eval(parametric.value.x.replace(/t/g, `(${t})`).replace(/exp/g, 'Math.exp').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos'))
    const y = eval(parametric.value.y.replace(/t/g, `(${t})`).replace(/exp/g, 'Math.exp').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos'))
    return { x, y }
  } catch {
    return { x: 0, y: 0 }
  }
}

const updateParametricPlot = () => {
  const canvas = artCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, 600, 600)
  ctx.translate(300, 300)
  
  ctx.strokeStyle = '#667eea'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  const step = (tRange.value[1] - tRange.value[0]) / 500
  let first = true
  
  for (let t = tRange.value[0]; t <= tRange.value[1]; t += step) {
    const point = evaluateParametric(t)
    const x = point.x * 20
    const y = -point.y * 20
    
    if (first) {
      ctx.moveTo(x, y)
      first = false
    } else {
      ctx.lineTo(x, y)
    }
  }
  
  ctx.stroke()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

const animateParametric = () => {
  const canvas = artCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, 600, 600)
  ctx.translate(300, 300)
  
  let currentT = tRange.value[0]
  const step = (tRange.value[1] - tRange.value[0]) / 200
  
  const animate = () => {
    if (currentT >= tRange.value[1]) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      return
    }
    
    const point = evaluateParametric(currentT)
    const x = point.x * 20
    const y = -point.y * 20
    
    ctx.strokeStyle = `hsl(${(currentT / tRange.value[1]) * 360}, 70%, 60%)`
    ctx.lineWidth = 2
    ctx.lineTo(x, y)
    ctx.stroke()
    
    currentT += step
    requestAnimationFrame(animate)
  }
  
  const firstPoint = evaluateParametric(tRange.value[0])
  ctx.beginPath()
  ctx.moveTo(firstPoint.x * 20, -firstPoint.y * 20)
  animate()
}

// ========== 3. 数值实验台 ==========
const numericalTab = ref('series')

// 级数求和
const seriesN = ref(10)
const seriesResult = ref(0)
const seriesError = ref(0)
const convergenceData = ref<Array<{ n: number, sum: number, error: number }>>([])

const factorial = (n: number): number => {
  if (n <= 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

const calculateSeries = () => {
  let sum = 0
  convergenceData.value = []
  
  for (let n = 0; n <= seriesN.value; n++) {
    sum += 1 / factorial(n)
    convergenceData.value.push({
      n: n,
      sum: sum,
      error: Math.abs(sum - Math.E)
    })
  }
  
  seriesResult.value = sum
  seriesError.value = Math.abs(sum - Math.E)
}

// 极限计算
const limitN = ref(100)
const limitResult = ref(0)
const limitError = ref(0)
const limitChart = ref<HTMLElement | null>(null)
let limitChartInstance: echarts.ECharts | null = null

const calculateLimit = () => {
  limitResult.value = Math.pow(1 + 1 / limitN.value, limitN.value)
  limitError.value = Math.abs(limitResult.value - Math.E)
  updateLimitChart()
}

const updateLimitChart = () => {
  if (!limitChartInstance) return
  
  const nValues = []
  const results = []
  
  for (let n = 10; n <= limitN.value; n += Math.floor(limitN.value / 50) || 1) {
    nValues.push(n)
    results.push(Math.pow(1 + 1/n, n))
  }
  
  const option = {
    title: {
      text: '极限收敛过程',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '10%',
      right: '10%',
      top: 80,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: nValues,
      name: 'n'
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: '(1+1/n)ⁿ',
      min: 2.5,
      max: 3.0
    },
    series: [{
      type: 'line',
      data: results,
      smooth: true,
      lineStyle: { width: 3, color: '#E6A23C' },
      markLine: {
        silent: true,
        data: [{ yAxis: Math.E, label: { formatter: 'e' } }],
        lineStyle: { color: '#F56C6C', width: 2 }
      }
    }]
  }
  
  limitChartInstance.setOption(option)
}

const initLimitChart = () => {
  if (!limitChart.value) return
  limitChartInstance = echarts.init(limitChart.value)
  calculateLimit()
}

// 数值积分
const integralN = ref(100)
const integralResult = ref(0)
const integralError = ref(0)

const calculateIntegral = () => {
  const a = 0, b = 1
  const h = (b - a) / integralN.value
  let sum = (Math.exp(a) + Math.exp(b)) / 2
  
  for (let i = 1; i < integralN.value; i++) {
    sum += Math.exp(a + i * h)
  }
  
  integralResult.value = sum * h
  integralError.value = Math.abs(integralResult.value - (Math.E - 1))
}

// ========== 4. 数学游戏 ==========
// e的小数位
const eDigitsArray = '718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427'.split('')
const showDigits = ref(false)
const revealedDigits = ref(5)

const revealMoreDigits = () => {
  revealedDigits.value = Math.min(revealedDigits.value + 5, 20)
}

// 公式配对
interface MatchItem {
  formula: string
  value: string
  matched: boolean
  correct: boolean
}

const matchingItems = ref<MatchItem[]>([
  { formula: 'e^0', value: '1', matched: false, correct: false },
  { formula: '1', value: '1', matched: false, correct: false },
  { formula: 'e^1', value: 'e', matched: false, correct: false },
  { formula: 'e', value: 'e', matched: false, correct: false },
  { formula: '\\ln(e)', value: '1', matched: false, correct: false },
  { formula: '1', value: '1', matched: false, correct: false },
  { formula: 'e^{i\\pi}', value: '-1', matched: false, correct: false },
  { formula: '-1', value: '-1', matched: false, correct: false }
])

const selectedMatch = ref(-1)
const matchScore = ref(0)

const selectMatch = (index: number) => {
  if (matchingItems.value[index].matched) return
  
  if (selectedMatch.value === -1) {
    selectedMatch.value = index
  } else {
    const first = matchingItems.value[selectedMatch.value]
    const second = matchingItems.value[index]
    
    if (first.value === second.value) {
      first.matched = true
      first.correct = true
      second.matched = true
      second.correct = true
      matchScore.value++
    }
    
    selectedMatch.value = -1
  }
}

const resetMatching = () => {
  matchingItems.value.forEach(item => {
    item.matched = false
    item.correct = false
  })
  matchScore.value = 0
  selectedMatch.value = -1
}

// 快速问答
interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'e 的近似值是多少？',
    options: ['2.618', '2.718', '3.142', '1.618'],
    correct: 1,
    explanation: 'e ≈ 2.71828...'
  },
  {
    question: 'e 是什么类型的数？',
    options: ['有理数', '代数数', '超越数', '整数'],
    correct: 2,
    explanation: 'e 是超越数，不是任何整系数多项式的根'
  },
  {
    question: '哪个公式被称为最美的数学公式？',
    options: ['e = 2.718...', 'e^(iπ) + 1 = 0', 'e^x = Σ(xⁿ/n!)', 'ln(e) = 1'],
    correct: 1,
    explanation: '欧拉恒等式 e^(iπ) + 1 = 0 被誉为最美公式'
  },
  {
    question: 'e 的导数是多少？',
    options: ['e', 'eˣ', '1', 'x·eˣ'],
    correct: 1,
    explanation: 'd(eˣ)/dx = eˣ，这是 e 的独特性质'
  },
  {
    question: '正态分布的概率密度函数中包含哪两个常数？',
    options: ['e 和 φ', 'e 和 π', 'π 和 φ', 'e 和 i'],
    correct: 1,
    explanation: '正态分布 PDF 中同时包含 e 和 π'
  }
]

const quizStarted = ref(false)
const currentQuizIndex = ref(0)
const quizScore = ref(0)
const quizAnswered = ref(false)
const quizCorrect = ref(false)

const startQuiz = () => {
  quizStarted.value = true
  currentQuizIndex.value = 0
  quizScore.value = 0
  quizAnswered.value = false
}

const answerQuiz = (index: number) => {
  quizAnswered.value = true
  quizCorrect.value = index === quizQuestions[currentQuizIndex.value].correct
  if (quizCorrect.value) {
    quizScore.value++
  }
}

const nextQuizQuestion = () => {
  currentQuizIndex.value++
  quizAnswered.value = false
}

const resetQuiz = () => {
  quizStarted.value = false
  currentQuizIndex.value = 0
  quizScore.value = 0
  quizAnswered.value = false
}

const getScoreRating = () => {
  const percent = (quizScore.value / quizQuestions.length) * 100
  if (percent === 100) return '🏆 完美！你是 e 的专家！'
  if (percent >= 80) return '⭐ 优秀！你对 e 有深入理解！'
  if (percent >= 60) return '👍 良好！继续学习会更好！'
  return '💪 加油！建议重新复习章节内容'
}

// ========== 5. 知识检测 ==========
const knowledgeCategories = ref([
  {
    name: '基础概念',
    icon: '📚',
    description: 'e 的定义、性质和历史',
    mastery: 85,
    topics: ['极限定义', '级数展开', '历史背景']
  },
  {
    name: '数学性质',
    icon: '🔢',
    description: 'e 的数学特性和关系',
    mastery: 75,
    topics: ['导数性质', '超越数', '连分数']
  },
  {
    name: '实际应用',
    icon: '🌍',
    description: 'e 在各领域的应用',
    mastery: 70,
    topics: ['自然增长', '概率统计', '物理应用', '金融工程']
  },
  {
    name: '常数关系',
    icon: '🔗',
    description: 'e 与其他数学常数的联系',
    mastery: 80,
    topics: ['欧拉恒等式', 'e与π', 'e与φ']
  }
])

const overallMastery = computed(() => {
  const total = knowledgeCategories.value.reduce((sum, cat) => sum + cat.mastery, 0)
  return Math.round(total / knowledgeCategories.value.length)
})

const progressColor = computed(() => {
  if (overallMastery.value >= 80) return '#67C23A'
  if (overallMastery.value >= 60) return '#E6A23C'
  return '#F56C6C'
})

const getMasteryLevel = () => {
  const level = overallMastery.value
  if (level >= 90) return '🏆 大师级 - 你已完全掌握 e 的知识！'
  if (level >= 80) return '⭐ 优秀 - 你对 e 有深入理解！'
  if (level >= 70) return '👍 良好 - 继续保持，再接再厉！'
  if (level >= 60) return '📖 及格 - 建议复习部分章节'
  return '💪 努力 - 需要系统学习各章节内容'
}

const achievements = ref([
  { icon: '🎓', name: '初学者', description: '完成第一章', unlocked: true },
  { icon: '🔬', name: '探索者', description: '完成所有实验', unlocked: true },
  { icon: '🧮', name: '计算大师', description: '完成数值计算挑战', unlocked: true },
  { icon: '🎯', name: '记忆达人', description: '记住 e 的前 20 位小数', unlocked: false },
  { icon: '🏆', name: '全能冠军', description: '全部测验满分', unlocked: false },
  { icon: '💎', name: 'e 的专家', description: '掌握度达到 90%', unlocked: false }
])

// ========== 生命周期 ==========
onMounted(() => {
  nextTick(() => {
    initFunctionChart()
    initLimitChart()
    updateParametricPlot()
    calculateSeries()
    calculateIntegral()
    
    // 响应式处理
    window.addEventListener('resize', () => {
      functionChartInstance?.resize()
      limitChartInstance?.resize()
    })
  })
})
</script>

<style scoped lang="scss">
.chapter6 {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding-bottom: 80px;
}

.chapter-header {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #2c3e50;
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
    color: #2c3e50;
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
      opacity: 0.8;
      letter-spacing: 2px;
    }
    
    .chapter-name {
      font-size: 42px;
    }
  }
  
  .chapter-subtitle {
    font-size: 18px;
    opacity: 0.9;
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
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 12px;
      text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
      
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
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.explorer-intro,
.art-intro,
.test-intro {
  margin-bottom: 30px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.8;
  }
}

.function-selector {
  margin: 25px 0;
  text-align: center;
}

.custom-input {
  margin: 20px 0;
  
  .input-hint {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }
}

.controls-grid {
  margin: 30px 0;
  
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

.chart-container {
  margin: 30px 0;
  
  .function-chart,
  .limit-chart {
    width: 100%;
    height: 400px;
  }
}

.function-properties {
  margin-top: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    
    .property-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      
      h5 {
        font-size: 16px;
        color: #666;
        margin-bottom: 10px;
      }
      
      p {
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
    }
  }
}

.art-presets {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.parametric-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
  
  .param-input {
    display: flex;
    align-items: center;
    gap: 10px;
    
    label {
      min-width: 50px;
      font-weight: 600;
      color: #333;
    }
  }
  
  .param-range {
    grid-column: 1 / -1;
    
    label {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
  }
}

.art-canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  .art-canvas {
    border: 2px solid #ddd;
    border-radius: 12px;
    background: white;
    max-width: 100%;
    height: auto;
  }
  
  .canvas-controls {
    display: flex;
    gap: 12px;
  }
}

.experiment-content {
  padding: 20px 0;
  
  h4 {
    font-size: 22px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .formula-display {
    font-size: 24px;
    text-align: center;
    margin: 20px 0;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
  }
}

.experiment-controls {
  margin: 30px 0;
  
  label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
}

.result-display {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 25px;
  margin: 25px 0;
  text-align: center;
  
  h5 {
    font-size: 18px;
    margin-bottom: 15px;
    opacity: 0.9;
  }
  
  .result-value {
    font-size: 32px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    margin-bottom: 20px;
  }
  
  .result-comparison {
    p {
      margin: 8px 0;
      font-size: 14px;
    }
  }
}

.convergence-table {
  margin-top: 30px;
  
  h5 {
    font-size: 18px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    
    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      th {
        padding: 15px;
        text-align: center;
        font-weight: 600;
      }
    }
    
    tbody {
      tr {
        border-bottom: 1px solid #eee;
        
        &:hover {
          background: #f5f7fa;
        }
        
        td {
          padding: 12px;
          text-align: center;
          font-size: 14px;
          font-family: 'Courier New', monospace;
        }
      }
    }
  }
}

.limit-chart-container {
  margin-top: 30px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  
  .game-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 16px;
    padding: 30px;
    
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      h3 {
        font-size: 22px;
        color: #2c3e50;
      }
    }
    
    .game-desc {
      font-size: 15px;
      color: #666;
      margin-bottom: 20px;
    }
    
    .game-content {
      background: white;
      border-radius: 12px;
      padding: 25px;
      min-height: 200px;
    }
  }
}

.e-digits-display {
  font-size: 24px;
  font-family: 'Courier New', monospace;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.8;
  
  .digit-label {
    color: #333;
    font-weight: 700;
  }
  
  .e-digit {
    color: #667eea;
    margin: 0 2px;
  }
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.matching-game {
  .formula-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    
    .match-item {
      padding: 20px;
      background: #f5f7fa;
      border: 2px solid transparent;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: #667eea;
      }
      
      &.selected {
        border-color: #667eea;
        background: #e6e9ff;
      }
      
      &.correct {
        background: #d4edda;
        border-color: #67C23A;
      }
      
      &.wrong {
        background: #f8d7da;
        border-color: #F56C6C;
      }
    }
  }
}

.game-score {
  margin-top: 20px;
  text-align: center;
  
  p {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
}

.quiz-start {
  text-align: center;
  padding: 40px 0;
}

.quiz-content {
  .quiz-progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
  
  .quiz-question {
    h4 {
      font-size: 20px;
      color: #2c3e50;
      margin-bottom: 25px;
    }
    
    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      .quiz-option-btn {
        width: 100%;
        height: auto;
        padding: 15px;
        font-size: 16px;
        text-align: left;
      }
    }
    
    .quiz-feedback {
      margin-top: 25px;
      padding: 20px;
      background: #f5f7fa;
      border-radius: 10px;
      
      .correct-answer {
        color: #67C23A;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      
      .wrong-answer {
        color: #F56C6C;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      
      .answer-explanation {
        color: #666;
        line-height: 1.6;
        margin-bottom: 15px;
      }
    }
  }
  
  .quiz-result {
    text-align: center;
    padding: 40px 20px;
    
    h3 {
      font-size: 32px;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    .final-score {
      font-size: 48px;
      color: #667eea;
      font-weight: 700;
      margin-bottom: 15px;
    }
    
    .score-rating {
      font-size: 20px;
      color: #666;
      margin-bottom: 30px;
    }
  }
}

.knowledge-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 30px 0;
  
  .category-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 25px;
    
    .category-header {
      margin-bottom: 15px;
      
      h4 {
        font-size: 20px;
        color: #2c3e50;
        margin-bottom: 12px;
      }
    }
    
    .category-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .category-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .topic-tag {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.overall-progress {
  margin: 40px 0;
  text-align: center;
  
  h4 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 25px;
  }
  
  .progress-text {
    font-size: 24px;
    font-weight: 700;
  }
  
  .mastery-level {
    font-size: 20px;
    color: #666;
    margin-top: 20px;
  }
}

.achievement-showcase {
  margin-top: 40px;
  
  h4 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 25px;
  }
  
  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    
    .achievement-badge {
      background: #f5f7fa;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      opacity: 0.4;
      transition: all 0.3s;
      
      &.unlocked {
        opacity: 1;
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
      }
      
      .badge-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      
      .badge-name {
        font-size: 16px;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 8px;
      }
      
      .badge-desc {
        font-size: 13px;
        color: #666;
      }
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
  }
  
  .story-section {
    margin: 25px auto;
    padding: 0 15px;
    
    .section-header h2 {
      font-size: 24px;
    }
  }
  
  .content-box {
    padding: 25px 20px;
  }
  
  .chart-container {
    .function-chart,
    .limit-chart {
      height: 280px;
    }
  }
  
  .parametric-controls {
    grid-template-columns: 1fr;
  }
  
  .art-canvas {
    width: 100% !important;
    height: auto !important;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .knowledge-categories {
    grid-template-columns: 1fr;
  }
  
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chapter-footer {
    flex-direction: column;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>
