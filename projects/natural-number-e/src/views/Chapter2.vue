<template>
  <div class="chapter-container chapter2">
    <!-- 页面头部 -->
    <div class="chapter-header">
      <h1 class="chapter-title handwritten">第二章：e的数学地位</h1>
      <p class="chapter-subtitle">超越数、无理数与微积分之美</p>
    </div>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :emotion="mascotEmotion"
      :message="mascotMessage"
      class="chapter-mascot"
    />

    <!-- Section 1: e是什么数？ -->
    <section class="story-section" id="number-types">
      <h2 class="section-title">🔢 e是什么样的数？</h2>
      
      <div class="story-card">
        <p class="story-text">
          在数学的世界里，数字有不同的"身份"。e 拥有非常特殊的身份——它是一个<strong>超越数</strong>！
        </p>
      </div>

      <!-- 数字分类可视化 -->
      <div class="number-classification">
        <h3 class="interactive-title">📊 数字的家族树</h3>
        
        <div class="tree-container">
          <!-- SVG 连线 -->
          <svg class="tree-lines" xmlns="http://www.w3.org/2000/svg">
            <!-- 第一层到第二层 -->
            <line class="line-to-rational" stroke="#5470c6" stroke-width="3" stroke-dasharray="5,5" />
            <line class="line-to-irrational" stroke="#5470c6" stroke-width="3" stroke-dasharray="5,5" />
            
            <!-- 第二层到第三层（无理数分支） -->
            <line class="line-to-algebraic" stroke="#91cc75" stroke-width="3" stroke-dasharray="5,5" />
            <line class="line-to-transcendental" stroke="#fac858" stroke-width="4" />
          </svg>
          <div class="tree-level level-1">
            <div class="tree-node all-numbers">
              <div class="node-icon">🌳</div>
              <div class="node-title">所有数</div>
              <div class="node-description">包括能想象到的所有数字</div>
            </div>
          </div>

          <div class="tree-level level-2">
            <div class="tree-node rational" @click="selectType('rational')">
              <div class="node-icon">✅</div>
              <div class="node-title">有理数</div>
              <div class="node-description">可以写成分数</div>
              <div class="node-examples">如: 1/2, 3, 0.25</div>
            </div>
            
            <div class="tree-node irrational active" @click="selectType('irrational')">
              <div class="node-icon">🌟</div>
              <div class="node-title">无理数</div>
              <div class="node-description">不能写成分数</div>
              <div class="node-examples">如: √2, π, e</div>
            </div>
          </div>

          <div class="tree-level level-3">
            <div class="tree-node algebraic" @click="selectType('algebraic')">
              <div class="node-icon">🧮</div>
              <div class="node-title">代数数</div>
              <div class="node-description">多项式方程的解</div>
              <div class="node-examples">如: √2 (x²-2=0的解)</div>
            </div>
            
            <div class="tree-node transcendental highlight" @click="selectType('transcendental')">
              <div class="node-icon">⭐</div>
              <div class="node-title">超越数</div>
              <div class="node-description">不是任何整系数多项式的根</div>
              <div class="node-examples">如: π, e</div>
              <div class="e-badge">← e 在这里！</div>
            </div>
          </div>
        </div>

        <!-- 说明卡片 -->
        <div v-if="selectedType" class="type-explanation">
          <h4>{{ typeInfo[selectedType].title }}</h4>
          <p>{{ typeInfo[selectedType].description }}</p>
          <div class="proof-box">
            <div class="proof-title">📜 历史证明</div>
            <div class="proof-content">{{ typeInfo[selectedType].proof }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: e的值 -->
    <section class="story-section" id="e-value">
      <h2 class="section-title">🎯 e的精确值</h2>
      
      <div class="e-value-display">
        <div class="value-main">
          <span class="value-integer">2</span>
          <span class="value-dot">.</span>
          <span class="value-decimals">7182818284</span>
          <span class="value-more">5904523536...</span>
        </div>
        
        <div class="value-controls">
          <el-button @click="showMoreDigits">显示更多位数</el-button>
          <el-button @click="playDigits" :icon="VideoPlay">朗读数字</el-button>
        </div>
        
        <div class="digits-display">
          <p class="digits-count">已显示：{{ displayedDigits }} 位小数</p>
          <div class="all-digits">
            <span>2.</span>
            <span v-for="(digit, index) in eDigits.slice(0, displayedDigits)" :key="index" 
                  class="digit" 
                  :class="{ 'new-digit': index >= displayedDigits - 10 }">
              {{ digit }}
            </span>
          </div>
        </div>
      </div>

      <!-- e的无限性 -->
      <div class="infinity-card">
        <h3>♾️ e是无限不循环小数</h3>
        <p>e的小数部分永远不会重复，也永远不会终止。这意味着：</p>
        <ul>
          <li>✨ 你永远无法精确写出e的全部数值</li>
          <li>🔍 计算机可以计算出数万亿位，但仍然只是近似值</li>
          <li>🎲 小数部分看起来是"随机"的，但实际上是确定的</li>
        </ul>
      </div>
    </section>

    <!-- Section 3: e与微积分 -->
    <section class="story-section" id="calculus">
      <h2 class="section-title">📐 e在微积分中的特殊性</h2>
      
      <div class="story-card">
        <p class="story-text">
          e最神奇的性质是：<strong>e<sup>x</sup>的导数还是它自己！</strong>
        </p>
        <div class="formula-display">
          <div class="formula-latex" v-html="renderFormula('\\frac{d}{dx}e^x = e^x')"></div>
        </div>
        <p class="story-text">
          这意味着，无论你对 e<sup>x</sup> 求多少次导数，结果都不变！
        </p>
      </div>

      <!-- 交互式导数演示 -->
      <div class="interactive-box">
        <h3 class="interactive-title">🎮 导数魔法演示</h3>
        
        <div class="derivative-demo">
          <div class="function-selector">
            <el-radio-group v-model="selectedFunction">
              <el-radio-button label="ex">e<sup>x</sup></el-radio-button>
              <el-radio-button label="x2">x²</el-radio-button>
              <el-radio-button label="sin">sin(x)</el-radio-button>
              <el-radio-button label="2x">2<sup>x</sup></el-radio-button>
            </el-radio-group>
          </div>

          <div class="derivative-steps">
            <div class="step-card" v-for="(step, index) in derivativeSteps" :key="index">
              <div class="step-label">第{{ index + 1 }}次求导</div>
              <div class="step-formula" v-html="renderFormula(step.formula)"></div>
              <div class="step-note">{{ step.note }}</div>
            </div>
          </div>

          <div class="chart-wrapper">
            <div ref="derivativeChart" class="chart-container"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: 泰勒级数 -->
    <section class="story-section" id="taylor-series">
      <h2 class="section-title">🎪 泰勒级数：e的另一个定义</h2>
      
      <div class="story-card">
        <p class="story-text">
          除了极限定义，e还可以用泰勒级数表示：
        </p>
        <div class="formula-display">
          <div class="formula-latex" v-html="renderFormula('e = \\sum_{n=0}^{\\infty} \\frac{1}{n!} = 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\cdots')"></div>
        </div>
      </div>

      <!-- 交互式泰勒级数计算 -->
      <div class="interactive-box">
        <h3 class="interactive-title">🧮 逼近e的值</h3>
        
        <div class="taylor-calculator">
          <div class="control-item">
            <label>计算到第 {{ taylorTerms }} 项</label>
            <el-slider 
              v-model="taylorTerms" 
              :min="1" 
              :max="20" 
              :step="1"
              show-stops
              @change="calculateTaylor"
            />
          </div>

          <div class="taylor-result">
            <div class="result-value">
              <span class="label">近似值:</span>
              <span class="value">{{ taylorSum.toFixed(15) }}</span>
            </div>
            <div class="result-error">
              <span class="label">与e的误差:</span>
              <span class="value">{{ taylorError.toExponential(4) }}</span>
            </div>
          </div>

          <div class="taylor-terms">
            <div class="term-card" v-for="(term, index) in taylorTermsList" :key="index">
              <div class="term-index">n={{ index }}</div>
              <div class="term-formula">1/{{ index }}! = {{ term.toFixed(10) }}</div>
            </div>
          </div>

          <div class="chart-wrapper">
            <div ref="taylorChart" class="chart-container"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: e与其他常数的关系 -->
    <section class="story-section" id="relations">
      <h2 class="section-title">🔗 e与数学世界的联系</h2>
      
      <div class="relations-grid">
        <div class="relation-card">
          <div class="relation-icon">🥧</div>
          <h4>e与π的关系</h4>
          <div class="relation-formula" v-html="renderFormula('e^{i\\pi} + 1 = 0')"></div>
          <p>欧拉恒等式：被称为"数学中最美丽的公式"</p>
        </div>

        <div class="relation-card">
          <div class="relation-icon">🌊</div>
          <h4>e与自然对数</h4>
          <div class="relation-formula" v-html="renderFormula('\\ln(e) = 1, \\quad e^{\\ln(x)} = x')"></div>
          <p>e是自然对数的底数</p>
        </div>

        <div class="relation-card">
          <div class="relation-icon">📈</div>
          <h4>e与增长</h4>
          <div class="relation-formula" v-html="renderFormula('\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e')"></div>
          <p>连续复利增长的极限</p>
        </div>

        <div class="relation-card">
          <div class="relation-icon">∞</div>
          <h4>e与无穷级数</h4>
          <div class="relation-formula" v-html="renderFormula('e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n')"></div>
          <p>多种级数表示</p>
        </div>
      </div>
    </section>

    <!-- 相关概念 -->
    <section class="concepts-section">
      <h3 class="concepts-title">💡 相关概念</h3>
      <div class="concept-tags">
        <el-tag type="primary">超越数</el-tag>
        <el-tag type="success">无理数</el-tag>
        <el-tag type="warning">导数</el-tag>
        <el-tag type="danger">泰勒级数</el-tag>
        <el-tag type="info">欧拉恒等式</el-tag>
        <el-tag>自然对数</el-tag>
        <el-tag>微积分</el-tag>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { VideoPlay } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'

// 吉祥物状态
const mascotEmotion = ref<'happy' | 'thinking' | 'excited' | 'surprised'>('thinking')
const mascotMessage = ref('让我们探索e在数学中的特殊地位！🔬')

// e的小数位（使用模板字符串避免换行问题）
const eDigits = '718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264800168477411853742345442437107539077744992069551702761838606261331384583000752044933826560297606737113200709328709127443747047230696977209310141692836819025515108657463772111252389784425056953696770785449969967946864454905987931636889230098793127736178215424999229576351482208269895193668033182528869398496465105820939239829488793320362509443117301238197068416140397019837679320683282376464804295311802328782509819455815301756717361332069811250996181881593041690351598888519345807273866738589422879228499892086805825749279610484198444363463244968487560233624827041978623209002160990235304369941849146314093431738140546253152096183690888707016768396424378140592714563549061307108510383750510114471365487076039672492757832356438661'
const displayedDigits = ref(10)

// 显示更多位数
function showMoreDigits() {
  displayedDigits.value = Math.min(displayedDigits.value + 50, eDigits.length)
}

// 朗读数字（模拟）
function playDigits() {
  alert('数字朗读功能：2.718281828...')
}

// 数字分类
const selectedType = ref('transcendental')

// 关系详情对话框
const showRelationDialog = ref(false)
const currentRelation = ref({
  title: '',
  formula: '',
  explanation: '',
  applications: [] as string[],
  funFact: ''
})

const relationDetails = {
  euler: {
    title: '欧拉恒等式：e与π的关系',
    formula: 'e^{i\\pi} + 1 = 0',
    explanation: '欧拉恒等式被誉为“数学中最美丽的公式”，它将数学中五个最重要的常数联系在一起：<br><strong>e</strong>（自然常数）、<strong>π</strong>（圆周率）、<strong>i</strong>（虚数单位）、<strong>1</strong>（乘法单位）、<strong>0</strong>（加法单位）。<br><br>这个等式通过复数指数函数建立，表明了指数函数、三角函数和复数之间的深刻联系。',
    applications: [
      '信号处理：用于傅里叶变换，分解信号为不同频率的正弦波',
      '量子力学：描述波函数的相位关系',
      '电子工程：交流电路分析中的复数表示',
      '图像处理：二维傅里叶变换用于图像压缩和特征提取'
    ],
    funFact: '当将 e^ⁱᵖ 在复平面上表示时，它刚好是一个在单位圆上的点，角度为 π 弧度（180°），所以等于 -1，因此 e^ⁱᵖ + 1 = 0。'
  },
  logarithm: {
    title: 'e与自然对数',
    formula: '\\ln(e) = 1, \\quad e^{\\ln(x)} = x, \\quad \\ln(ab) = \\ln(a) + \\ln(b)',
    explanation: '<strong>自然对数</strong>（Natural Logarithm）以 e 为底，记作 ln(x)。它是数学中最重要的对数函数，因为它具有最简单的导数：<br><br><strong>d(ln x)/dx = 1/x</strong><br><br>这使得自然对数在微积分中极为方便。所有其他底数的对数都可以通过自然对数转换：logₐ(x) = ln(x) / ln(a)。',
    applications: [
      '复利计算：计算投资翻倍所需时间',
      '信息理论：衡量信息量和熵（通常使用 ln 或 log₂）',
      '统计学：将指数分布转换为线性关系',
      '物理学：描述放射性衰变、声音强度（分贝）等'
    ],
    funFact: 'ln 这个符号来自拉丁文 "logarithmus naturalis"，意为“自然对数”。在计算器发明之前，数学家使用对数表来简化复杂的乘法计算！'
  },
  growth: {
    title: 'e与连续复利增长',
    formula: 'A = P \\cdot e^{rt}, \\quad \\lim_{n \\to \\infty} \\left(1 + \\frac{r}{n}\\right)^{nt} = e^{rt}',
    explanation: '当计息频率趋于无穷大时，复利公式的极限就是 <strong>连续复利公式</strong>：<br><br><strong>A = P · eᵣᵗ</strong><br><br>其中：<br>P = 本金<br>r = 年利率<br>t = 时间（年）<br>A = 最终金额<br><br>这个公式不仅用于金融，还描述了所有<strong>指数增长</strong>过程：人口增长、细菌繁殖、放射性衰变等。',
    applications: [
      '银行存款：计算连续复利的投资回报',
      '人口统计：预测人口指数增长趋势',
      '生物学：模拟细菌繁殖、疫情传播',
      '物理化学：放射性衰变、化学反应速率',
      '经济学：GDP增长、通货膨胀率计算'
    ],
    funFact: '如果你在公元元1年存入1元，年利率100%连续复利，到今天你将拥有 e²⁰²⁴ 元（大约 10⁸⁷⁸ 元）——超过了全球GDP总和！'
  },
  series: {
    title: 'e的级数表示',
    formula: 'e = \\sum_{n=0}^{\\infty} \\frac{1}{n!} = 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\cdots',
    explanation: 'e 可以用<strong>泰勒级数</strong>表示，这是一个美丽的无穷级数：<br><br><strong>e = ∑ (1/n!)</strong><br><br>这个级数收敛非常快，只需要前10项就可以得到 e 的前7位小数。<br><br>除此之外，e 还有其他级数表示，如：<br>e = lim(1 + 1/n)ⁿ<br>e = 2 + 1/(1 + 1/(2 + 2/(3 + 3/4...)))（连分数）',
    applications: [
      '数值计算：快速计算 e 的近似值',
      '概率论：注松分布的推导',
      '组合数学：错排问题的渐近解',
      '复分析：整函数的级数展开',
      '物理学：量子力学中的撑乱理论'
    ],
    funFact: 'e 的级数收敛速度之快，仅用前20项就能精确到小数点15位！相比之下，π 的级数收敛得慢得多。'
  }
}

function showRelationDetail(type: keyof typeof relationDetails) {
  currentRelation.value = relationDetails[type]
  showRelationDialog.value = true
  mascotEmotion.value = 'excited'
  mascotMessage.value = '这个关系很重要哦！仔细看看！'
}

const typeInfo = {
  rational: {
    title: '有理数',
    description: '有理数是可以表示为两个整数之比的数，如 1/2, 3/4, 5等。它们的小数要么是有限的，要么是循环的。',
    proof: '有理数的定义很简单，只要能写成 p/q 的形式（p、q是整数，q≠0），就是有理数。'
  },
  irrational: {
    title: '无理数',
    description: '无理数不能表示为两个整数的比值，其小数部分无限不循环。e、π、√2 都是无理数。',
    proof: '欧拉在1748年证明了e是无理数。证明方法使用了反证法和e的级数表示。'
  },
  algebraic: {
    title: '代数数',
    description: '代数数是某个整系数多项式方程的根。例如√2是方程x²-2=0的根，所以√2是代数数。',
    proof: '所有有理数都是代数数（一次方程的根），但有些无理数也是代数数，如√2。'
  },
  transcendental: {
    title: '超越数',
    description: 'e是超越数，意味着它不是任何整系数多项式方程的根。这使得e比代数数更"特殊"。',
    proof: '法国数学家夏尔·埃尔米特在1873年首次证明了e是超越数。这是数学史上的重大突破！'
  }
}

function selectType(type: string) {
  selectedType.value = type
  mascotEmotion.value = 'excited'
  mascotMessage.value = `${typeInfo[type].title}很有趣对不对？继续探索！`
}

// 导数演示
const selectedFunction = ref('ex')
const derivativeChart = ref<HTMLElement | null>(null)
let derivativeChartInstance: echarts.ECharts | null = null

const derivativeSteps = computed(() => {
  const steps = {
    'ex': [
      { formula: 'f(x) = e^x', note: '原函数' },
      { formula: 'f\'(x) = e^x', note: '一次导数，还是自己！' },
      { formula: 'f\'\'(x) = e^x', note: '二次导数，依然是自己！' },
      { formula: 'f\'\'\'(x) = e^x', note: '三次导数，永远不变！' }
    ],
    'x2': [
      { formula: 'f(x) = x^2', note: '原函数' },
      { formula: 'f\'(x) = 2x', note: '一次导数' },
      { formula: 'f\'\'(x) = 2', note: '二次导数，变成常数' },
      { formula: 'f\'\'\'(x) = 0', note: '三次导数，变成0' }
    ],
    'sin': [
      { formula: 'f(x) = \\sin(x)', note: '原函数' },
      { formula: 'f\'(x) = \\cos(x)', note: '一次导数，变成余弦' },
      { formula: 'f\'\'(x) = -\\sin(x)', note: '二次导数，变负' },
      { formula: 'f\'\'\'(x) = -\\cos(x)', note: '三次导数，循环' }
    ],
    '2x': [
      { formula: 'f(x) = 2^x', note: '原函数' },
      { formula: 'f\'(x) = 2^x \\ln(2)', note: '一次导数，多了ln(2)' },
      { formula: 'f\'\'(x) = 2^x (\\ln(2))^2', note: '二次导数' },
      { formula: 'f\'\'\'(x) = 2^x (\\ln(2))^3', note: '三次导数' }
    ]
  }
  return steps[selectedFunction.value] || steps['ex']
})

// 泰勒级数
const taylorTerms = ref(10)
const taylorSum = ref(0)
const taylorError = ref(0)
const taylorTermsList = ref<number[]>([])
const taylorChart = ref<HTMLElement | null>(null)
let taylorChartInstance: echarts.ECharts | null = null

const E_VALUE = 2.718281828459045

function calculateTaylor() {
  let sum = 0
  const terms: number[] = []
  
  for (let n = 0; n < taylorTerms.value; n++) {
    const factorial = (n === 0) ? 1 : Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a * b, 1)
    const term = 1 / factorial
    terms.push(term)
    sum += term
  }
  
  taylorSum.value = sum
  taylorError.value = Math.abs(sum - E_VALUE)
  taylorTermsList.value = terms
  
  updateTaylorChart()
}

function updateTaylorChart() {
  if (!taylorChartInstance || !taylorChart.value) return
  
  const data = []
  let sum = 0
  for (let n = 0; n < taylorTerms.value; n++) {
    const factorial = (n === 0) ? 1 : Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a * b, 1)
    sum += 1 / factorial
    data.push(sum)
  }
  
  const option = {
    title: {
      text: 'e的泰勒级数逼近过程',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: Array.from({length: taylorTerms.value}, (_, i) => `n=${i}`)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '累加和',
        type: 'line',
        data: data,
        smooth: true,
        markLine: {
          data: [
            { yAxis: E_VALUE, label: { formatter: 'e = 2.71828...' } }
          ]
        }
      }
    ]
  }
  
  taylorChartInstance.setOption(option)
}

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

// 初始化
onMounted(() => {
  calculateTaylor()
  
  if (taylorChart.value) {
    taylorChartInstance = echarts.init(taylorChart.value)
    updateTaylorChart()
  }
  
  if (derivativeChart.value) {
    derivativeChartInstance = echarts.init(derivativeChart.value)
    updateDerivativeChart()
  }
})

function updateDerivativeChart() {
  if (!derivativeChartInstance) return
  
  const xData = []
  const series = []
  
  // 生成 x 轴数据
  for (let x = -2; x <= 2; x += 0.1) {
    xData.push(x.toFixed(1))
  }
  
  // 计算原函数和各阶导数
  const derivatives = calculateDerivatives()
  
  // 生成系列数据
  derivatives.forEach((deriv, index) => {
    series.push({
      name: deriv.name,
      type: 'line',
      data: deriv.data,
      smooth: true,
      lineStyle: {
        width: index === 0 ? 3 : 2,
        type: index === 0 ? 'solid' : 'dashed'
      }
    })
  })
  
  // 获取函数标题
  let titleText = ''
  switch (selectedFunction.value) {
    case 'ex':
      titleText = '函数曲线: e\u1d6a'
      break
    case 'x2':
      titleText = '函数曲线: x\u00b2'
      break
    case 'sin':
      titleText = '函数曲线: sin(x)'
      break
    case '2x':
      titleText = '函数曲线: 2\u1d6a'
      break
  }
  
  const option = {
    title: {
      text: titleText,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: derivatives.map(d => d.name),
      top: 30
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  
  derivativeChartInstance.setOption(option)
}

// 计算各阶导数
function calculateDerivatives() {
  const result = []
  const xValues = []
  
  for (let x = -2; x <= 2; x += 0.1) {
    xValues.push(x)
  }
  
  switch (selectedFunction.value) {
    case 'ex':
      result.push({
        name: '原函数 f(x)=e\u1d6a',
        data: xValues.map(x => Math.exp(x))
      })
      result.push({
        name: "f'(x)=e\u1d6a",
        data: xValues.map(x => Math.exp(x))
      })
      result.push({
        name: "f''(x)=e\u1d6a",
        data: xValues.map(x => Math.exp(x))
      })
      result.push({
        name: "f'''(x)=e\u1d6a",
        data: xValues.map(x => Math.exp(x))
      })
      break
    case 'x2':
      result.push({
        name: '原函数 f(x)=x\u00b2',
        data: xValues.map(x => x * x)
      })
      result.push({
        name: "f'(x)=2x",
        data: xValues.map(x => 2 * x)
      })
      result.push({
        name: "f''(x)=2",
        data: xValues.map(x => 2)
      })
      result.push({
        name: "f'''(x)=0",
        data: xValues.map(x => 0)
      })
      break
    case 'sin':
      result.push({
        name: '原函数 f(x)=sin(x)',
        data: xValues.map(x => Math.sin(x))
      })
      result.push({
        name: "f'(x)=cos(x)",
        data: xValues.map(x => Math.cos(x))
      })
      result.push({
        name: "f''(x)=-sin(x)",
        data: xValues.map(x => -Math.sin(x))
      })
      result.push({
        name: "f'''(x)=-cos(x)",
        data: xValues.map(x => -Math.cos(x))
      })
      break
    case '2x':
      const ln2 = Math.log(2)
      result.push({
        name: '原函数 f(x)=2\u1d6a',
        data: xValues.map(x => Math.pow(2, x))
      })
      result.push({
        name: "f'(x)=2\u1d6a·ln(2)",
        data: xValues.map(x => Math.pow(2, x) * ln2)
      })
      result.push({
        name: "f''(x)=2\u1d6a·(ln2)\u00b2",
        data: xValues.map(x => Math.pow(2, x) * ln2 * ln2)
      })
      result.push({
        name: "f'''(x)=2\u1d6a·(ln2)\u00b3",
        data: xValues.map(x => Math.pow(2, x) * ln2 * ln2 * ln2)
      })
      break
  }
  
  return result
}

watch(selectedFunction, () => {
  updateDerivativeChart()
  mascotEmotion.value = 'thinking'
  mascotMessage.value = `看看${selectedFunction.value}的导数规律！`
})

watch(taylorTerms, () => {
  calculateTaylor()
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.chapter2 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

// 继承 Chapter1 的基础样式
.chapter-header,
.section-title,
.story-section,
.story-card,
.interactive-box {
  // 使用与 Chapter1 相同的样式
}

// 数字分类树
.number-classification {
  margin: 2rem 0;
  
  .tree-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 20px;
    
    // SVG 连线
    .tree-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      
      line {
        &.line-to-rational {
          x1: 50%;
          y1: 15%;
          x2: 30%;
          y2: 35%;
        }
        
        &.line-to-irrational {
          x1: 50%;
          y1: 15%;
          x2: 70%;
          y2: 35%;
        }
        
        &.line-to-algebraic {
          x1: 70%;
          y1: 45%;
          x2: 55%;
          y2: 75%;
        }
        
        &.line-to-transcendental {
          x1: 70%;
          y1: 45%;
          x2: 85%;
          y2: 75%;
        }
      }
    }
    
    .tree-level {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      
      .tree-node {
        background: white;
        padding: 1.5rem;
        border-radius: 15px;
        border: 3px solid #e0e0e0;
        min-width: 220px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        &.active {
          border-color: $color-secondary;
          background: lighten($color-secondary, 45%);
        }
        
        &.highlight {
          border-color: $color-accent;
          box-shadow: 0 0 20px rgba($color-accent, 0.5);
          
          .e-badge {
            position: absolute;
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
            background: $color-accent;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
            white-space: nowrap;
          }
        }
        
        .node-icon {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        
        .node-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: $color-primary;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        
        .node-description {
          font-size: 0.95rem;
          color: $text-secondary;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        
        .node-examples {
          font-size: 0.85rem;
          color: $text-tertiary;
          text-align: center;
          font-style: italic;
        }
      }
    }
  }
  
  .type-explanation {
    margin-top: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 15px;
    border: 3px solid $color-primary;
    
    h4 {
      font-size: 1.5rem;
      color: $color-primary;
      margin-bottom: 1rem;
    }
    
    .proof-box {
      margin-top: 1.5rem;
      padding: 1rem;
      background: lighten($color-accent, 40%);
      border-left: 4px solid $color-accent;
      border-radius: 8px;
      
      .proof-title {
        font-weight: bold;
        color: $color-accent;
        margin-bottom: 0.5rem;
      }
      
      .proof-content {
        color: $text-secondary;
        line-height: 1.6;
      }
    }
  }
}

// e的值显示
.e-value-display {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  
  .value-main {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 2rem;
    font-family: 'Courier New', monospace;
    
    .value-integer {
      color: $color-accent;
    }
    
    .value-decimals {
      color: white;
    }
    
    .value-more {
      opacity: 0.7;
    }
  }
  
  .value-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .digits-display {
    background: rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 12px;
    
    .digits-count {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .all-digits {
      font-family: 'Courier New', monospace;
      font-size: 1.2rem;
      word-break: break-all;
      line-height: 2;
      
      .digit {
        display: inline-block;
        padding: 0.2rem;
        transition: all 0.3s ease;
        
        &.new-digit {
          background: $color-accent;
          color: white;
          border-radius: 4px;
          animation: highlight 0.6s ease;
        }
      }
    }
  }
}

@keyframes highlight {
  0% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.infinity-card {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  border: 3px solid $color-info;
  
  h3 {
    color: $color-info;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      font-size: 1.05rem;
      line-height: 1.6;
    }
  }
}

// 导数演示
.derivative-demo {
  .function-selector {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .derivative-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    
    .step-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      border: 2px solid $color-primary;
      text-align: center;
      
      .step-label {
        font-weight: bold;
        color: $color-primary;
        margin-bottom: 0.5rem;
      }
      
      .step-formula {
        margin: 1rem 0;
        font-size: 1.1rem;
      }
      
      .step-note {
        font-size: 0.9rem;
        color: $text-secondary;
        font-style: italic;
      }
    }
  }
}

// 泰勒级数计算器
.taylor-calculator {
  .taylor-result {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
    
    > div {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      border: 2px solid $color-secondary;
      
      .label {
        display: block;
        font-size: 0.9rem;
        color: $text-secondary;
        margin-bottom: 0.5rem;
      }
      
      .value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: $color-primary;
        font-family: 'Courier New', monospace;
      }
    }
  }
  
  .taylor-terms {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
    max-height: 300px;
    overflow-y: auto;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 12px;
    
    .term-card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      
      .term-index {
        font-size: 0.9rem;
        color: $text-tertiary;
        margin-bottom: 0.3rem;
      }
      
      .term-formula {
        font-family: 'Courier New', monospace;
        font-size: 0.95rem;
        color: $color-primary;
      }
    }
  }
}

// 关系卡片
.relations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  .relation-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    border: 3px solid $color-primary;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px rgba($color-primary, 0.3);
      border-color: $color-accent;
      
      .click-hint {
        opacity: 1;
      }
    }
    
    .click-hint {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 0.85rem;
      color: $color-accent;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-weight: bold;
    }
    
    .relation-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    h4 {
      font-size: 1.2rem;
      color: $color-primary;
      margin-bottom: 1rem;
    }
    
    .relation-formula {
      margin: 1.5rem 0;
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.95rem;
      color: $text-secondary;
      line-height: 1.6;
    }
  }
}

// 图表容器
.chart-wrapper {
  margin-top: 2rem;
  
  .chart-container {
    height: 400px;
    background: white;
    border-radius: 12px;
    padding: 1rem;
  }
}

// 公式显示
.formula-display {
  text-align: center;
  padding: 2rem;
  background: lighten($color-primary, 45%);
  border-radius: 15px;
  margin: 1.5rem 0;
  
  .formula-latex {
    font-size: 1.5rem;
  }
}

// 吉祥物
.chapter-mascot {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
}

// 概念标签
.concepts-section {
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  
  .concepts-title {
    font-size: 1.3rem;
    color: $color-primary;
    margin-bottom: 1rem;
  }
  
  .concept-tags {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    :deep(.el-tag) {
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

// 关系详情对话框
.relation-detail {
  .detail-formula {
    text-align: center;
    padding: 2rem;
    background: lighten($color-primary, 45%);
    border-radius: 12px;
    margin-bottom: 2rem;
    font-size: 1.3rem;
  }
  
  .detail-content {
    h4 {
      font-size: 1.2rem;
      color: $color-primary;
      margin: 1.5rem 0 1rem;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      line-height: 1.8;
      color: $text-primary;
      margin-bottom: 1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        padding: 0.75rem;
        margin: 0.5rem 0;
        background: lighten($color-secondary, 40%);
        border-left: 4px solid $color-secondary;
        border-radius: 4px;
        line-height: 1.6;
        
        &:before {
          content: '•';
          color: $color-secondary;
          font-weight: bold;
          margin-right: 0.5rem;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .chapter2 {
    padding: 1rem;
  }
  
  .number-classification .tree-container {
    padding: 1rem;
    
    .tree-level .tree-node {
      min-width: 100%;
      
      &.highlight .e-badge {
        position: static;
        display: inline-block;
        margin-top: 0.5rem;
      }
    }
  }
  
  .e-value-display .value-main {
    font-size: 2.5rem;
  }
  
  .taylor-result {
    grid-template-columns: 1fr !important;
  }
  
  .relations-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-wrapper .chart-container {
    height: 300px;
  }
}
</style>
