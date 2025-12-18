<template>
  <div class="chapter-container chapter5">
    <!-- 章节头部 -->
    <header class="chapter-header">
      <div class="header-content">
        <router-link to="/" class="back-link">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
        <h1 class="chapter-title">
          <span class="chapter-number">第五章</span>
          <span class="chapter-name">e与其他常数</span>
        </h1>
        <p class="chapter-subtitle">探索数学常数之间的美妙联系</p>
      </div>
    </header>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :message="mascotMessage"
      position="right"
    />

    <!-- 1. 欧拉恒等式 -->
    <section class="story-section" id="euler-identity">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><MagicStick /></el-icon>
          欧拉恒等式：最美的公式
        </h2>
      </div>

      <div class="content-box">
        <div class="euler-showcase">
          <div class="main-formula" v-html="renderFormula('e^{i\\pi} + 1 = 0')"></div>
          <p class="formula-description">
            这个公式被誉为"数学中最美的公式"，因为它将五个最重要的数学常数完美地联系在一起：
          </p>
          <div class="constants-grid">
            <div class="constant-card">
              <div class="constant-symbol" v-html="renderFormula('e')"></div>
              <div class="constant-name">自然对数的底</div>
              <div class="constant-value">≈ 2.71828...</div>
            </div>
            <div class="constant-card">
              <div class="constant-symbol" v-html="renderFormula('i')"></div>
              <div class="constant-name">虚数单位</div>
              <div class="constant-value" v-html="renderFormula('i^2 = -1')"></div>
            </div>
            <div class="constant-card">
              <div class="constant-symbol" v-html="renderFormula('\\pi')"></div>
              <div class="constant-name">圆周率</div>
              <div class="constant-value">≈ 3.14159...</div>
            </div>
            <div class="constant-card">
              <div class="constant-symbol">1</div>
              <div class="constant-name">乘法单位元</div>
              <div class="constant-value">最基本的数</div>
            </div>
            <div class="constant-card">
              <div class="constant-symbol">0</div>
              <div class="constant-name">加法单位元</div>
              <div class="constant-value">空无一物</div>
            </div>
          </div>
        </div>

        <!-- 欧拉公式动态演示 -->
        <div class="euler-demo">
          <h3>欧拉公式动态演示</h3>
          <div class="theory-box">
            <div class="formula-display" v-html="renderFormula('e^{i\\theta} = \\cos\\theta + i\\sin\\theta')"></div>
            <p>当 <span v-html="renderFormula('\\theta = \\pi')"></span> 时，得到欧拉恒等式</p>
          </div>

          <div class="controls">
            <div class="control-item">
              <label>角度 θ: {{ (eulerAngle * 180 / Math.PI).toFixed(1) }}° ({{ eulerAngle.toFixed(3) }} 弧度)</label>
              <el-slider 
                v-model="eulerAngle" 
                :min="0" 
                :max="Math.PI * 2"
                :step="0.01"
                @change="updateEulerVisualization"
              />
            </div>
          </div>

          <div class="visualization-grid">
            <div class="complex-plane">
              <div ref="complexPlane" class="complex-canvas"></div>
              <div class="plane-info">
                <h4>复平面表示</h4>
                <p>实部: {{ Math.cos(eulerAngle).toFixed(3) }}</p>
                <p>虚部: {{ Math.sin(eulerAngle).toFixed(3) }}i</p>
                <p v-html="renderFormula(`e^{i\\theta} = ${Math.cos(eulerAngle).toFixed(3)} + ${Math.sin(eulerAngle).toFixed(3)}i`)"></p>
              </div>
            </div>

            <div class="euler-verification">
              <h4>特殊角度验证</h4>
              <div class="special-angles">
                <div 
                  v-for="angle in specialAngles" 
                  :key="angle.value"
                  class="angle-card"
                  :class="{ active: Math.abs(eulerAngle - angle.value) < 0.1 }"
                  @click="setAngle(angle.value)"
                >
                  <div class="angle-label">{{ angle.label }}</div>
                  <div class="angle-formula" v-html="renderFormula(angle.formula)"></div>
                  <div class="angle-result">= {{ angle.result }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. e与π的关系 -->
    <section class="story-section" id="e-and-pi">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Histogram /></el-icon>
          e与π：超越数的双子星
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>共同特性</h3>
          <div class="properties-grid">
            <div class="property-item">
              <h4>超越数</h4>
              <p>都不是任何整系数多项式的根</p>
            </div>
            <div class="property-item">
              <h4>无理数</h4>
              <p>都不能表示为两个整数的比</p>
            </div>
            <div class="property-item">
              <h4>无限不循环</h4>
              <p>小数展开无穷且不重复</p>
            </div>
            <div class="property-item">
              <h4>数学基石</h4>
              <p>分析学和几何学的核心常数</p>
            </div>
          </div>
        </div>

        <!-- e和π的关系公式 -->
        <div class="relationships">
          <h3>e和π的数学关系</h3>
          <div class="relation-cards">
            <div class="relation-card">
              <h4>欧拉恒等式</h4>
              <div class="formula-display" v-html="renderFormula('e^{i\\pi} = -1')"></div>
              <p>最简洁的关系式</p>
            </div>
            <div class="relation-card">
              <h4>Stirling近似</h4>
              <div class="formula-display" v-html="renderFormula('n! \\approx \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n')"></div>
              <p>阶乘的渐近公式</p>
            </div>
            <div class="relation-card">
              <h4>正态分布</h4>
              <div class="formula-display" v-html="renderFormula('\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^2}{2}}')"></div>
              <p>概率密度函数</p>
            </div>
            <div class="relation-card">
              <h4>Gamma函数</h4>
              <div class="formula-display" v-html="renderFormula('\\Gamma\\left(\\frac{1}{2}\\right) = \\sqrt{\\pi}')"></div>
              <p>连接阶乘与π</p>
            </div>
          </div>
        </div>

        <!-- 数值比较 -->
        <div class="numerical-comparison">
          <h3>数值特性对比</h3>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>特性</th>
                <th>e</th>
                <th>π</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>近似值</td>
                <td>2.71828182845904...</td>
                <td>3.14159265358979...</td>
              </tr>
              <tr>
                <td>发现年代</td>
                <td>1683年（Leibniz）</td>
                <td>古代（数千年前）</td>
              </tr>
              <tr>
                <td>命名者</td>
                <td>Euler（1727年）</td>
                <td>William Jones（1706年）</td>
              </tr>
              <tr>
                <td>来源</td>
                <td>增长与变化</td>
                <td>圆与周期</td>
              </tr>
              <tr>
                <td>主要出现</td>
                <td>微积分、概率论</td>
                <td>几何、三角学</td>
              </tr>
              <tr>
                <td>连分数</td>
                <td>规律性强</td>
                <td>无明显规律</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 3. e与黄金比例φ -->
    <section class="story-section" id="e-and-phi">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Compass /></el-icon>
          e与黄金比例φ
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>黄金比例</h3>
          <div class="formula-display" v-html="renderFormula('\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618...')"></div>
          <div class="explanation">
            <p>黄金比例是最"无理"的无理数，出现在自然界、艺术和建筑中。</p>
            <p>虽然φ和e看似无关，但它们通过斐波那契数列产生联系：</p>
          </div>
        </div>

        <!-- 斐波那契与e -->
        <div class="fibonacci-demo">
          <h3>斐波那契数列与指数增长</h3>
          
          <div class="fib-formula">
            <div class="formula-display" v-html="renderFormula('F_n = \\frac{\\varphi^n - (1-\\varphi)^n}{\\sqrt{5}}')"></div>
            <p>斐波那契数列的通项公式（Binet公式）</p>
          </div>

          <div class="controls">
            <div class="control-item">
              <label>显示项数: {{ fibTerms }}</label>
              <el-slider 
                v-model="fibTerms" 
                :min="5" 
                :max="20"
                @change="updateFibonacciChart"
              />
            </div>
          </div>

          <div class="chart-container">
            <div ref="fibChart" class="fib-chart"></div>
          </div>

          <div class="fib-insights">
            <h4>有趣发现</h4>
            <ul>
              <li>📊 斐波那契数列的增长接近指数增长 <span v-html="renderFormula('e^{0.481n}')"></span></li>
              <li>🌀 相邻两项的比值趋近于黄金比例φ</li>
              <li>🔢 极限：<span v-html="renderFormula('\\lim_{n\\to\\infty} \\frac{F_{n+1}}{F_n} = \\varphi')"></span></li>
              <li>🌻 黄金螺旋在自然界中广泛存在（向日葵、鹦鹉螺）</li>
            </ul>
          </div>
        </div>

        <!-- 黄金螺旋可视化 -->
        <div class="golden-spiral">
          <h3>黄金螺旋生成器</h3>
          <div class="spiral-container">
            <canvas ref="spiralCanvas" width="400" height="400" class="spiral-canvas"></canvas>
            <div class="spiral-controls">
              <el-button @click="drawGoldenSpiral" type="primary">
                <el-icon><Refresh /></el-icon>
                重新生成
              </el-button>
            </div>
          </div>
          <p class="spiral-note">基于斐波那契数列的黄金螺旋，每个方格的边长是斐波那契数</p>
        </div>
      </div>
    </section>

    <!-- 4. 数学常数关系网络 -->
    <section class="story-section" id="constants-network">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Share /></el-icon>
          数学常数关系图谱
        </h2>
      </div>

      <div class="content-box">
        <div class="network-intro">
          <h3>重要数学常数</h3>
          <p>数学中有许多重要的常数，它们之间通过各种公式相互联系，形成了一个美妙的关系网络。</p>
        </div>

        <div class="constants-showcase">
          <div v-for="constant in mathematicalConstants" :key="constant.symbol" class="constant-detail">
            <div class="constant-header">
              <div class="constant-symbol-large" v-html="renderFormula(constant.symbol)"></div>
              <div class="constant-info">
                <h4>{{ constant.name }}</h4>
                <p class="constant-value-text">{{ constant.value }}</p>
              </div>
            </div>
            <p class="constant-description">{{ constant.description }}</p>
            <div class="constant-formulas">
              <div v-for="(formula, index) in constant.formulas" :key="index" class="mini-formula" v-html="renderFormula(formula)"></div>
            </div>
          </div>
        </div>

        <!-- 关系网络图 -->
        <div class="network-visualization">
          <h3>常数关系网络</h3>
          <div ref="networkChart" class="network-chart"></div>
          <div class="network-legend">
            <h4>连接说明</h4>
            <ul>
              <li><span class="legend-line strong"></span> 强关系（直接出现在公式中）</li>
              <li><span class="legend-line medium"></span> 中等关系（通过函数联系）</li>
              <li><span class="legend-line weak"></span> 弱关系（间接关联）</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 美丽公式集锦 -->
    <section class="story-section" id="beautiful-formulas">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Star /></el-icon>
          数学之美：公式集锦
        </h2>
      </div>

      <div class="content-box">
        <div class="beauty-intro">
          <h3>最美的数学公式</h3>
          <p>这些公式因其简洁、深刻和优雅而被数学家们推崇为"最美"的公式。</p>
        </div>

        <div class="formulas-gallery">
          <div v-for="(formula, index) in beautifulFormulas" :key="index" class="formula-card" @click="selectFormula(index)">
            <div class="formula-rank">{{ index + 1 }}</div>
            <div class="formula-content" v-html="renderFormula(formula.latex)"></div>
            <h4 class="formula-title">{{ formula.name }}</h4>
            <p class="formula-desc">{{ formula.description }}</p>
            <div class="formula-rating">
              <el-rate v-model="formula.rating" disabled show-score />
            </div>
            <div class="formula-tags">
              <el-tag v-for="tag in formula.tags" :key="tag" size="small">{{ tag }}</el-tag>
            </div>
          </div>
        </div>

        <!-- 公式详情对话框 -->
        <el-dialog 
          v-model="formulaDialogVisible" 
          :title="selectedFormula?.name"
          width="600px"
        >
          <div v-if="selectedFormula" class="formula-detail-dialog">
            <div class="dialog-formula" v-html="renderFormula(selectedFormula.latex)"></div>
            <div class="dialog-section">
              <h4>公式含义</h4>
              <p>{{ selectedFormula.meaning }}</p>
            </div>
            <div class="dialog-section">
              <h4>历史背景</h4>
              <p>{{ selectedFormula.history }}</p>
            </div>
            <div class="dialog-section">
              <h4>美学评价</h4>
              <p>{{ selectedFormula.aesthetics }}</p>
            </div>
          </div>
        </el-dialog>
      </div>
    </section>

    <!-- 章节导航 -->
    <footer class="chapter-footer">
      <el-button @click="$router.push('/chapter4')" size="large">
        <el-icon><ArrowLeft /></el-icon>
        上一章
      </el-button>
      <el-button @click="$router.push('/')" size="large" type="info">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
      <el-button @click="$router.push('/chapter6')" size="large" type="primary">
        下一章
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { Back, MagicStick, Histogram, Compass, Share, Star, Refresh, ArrowLeft, ArrowRight, HomeFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'

// 吉祥物消息
const mascotMessage = ref('让我们探索数学常数之间的美妙联系，发现数学的终极美！✨')

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

// ========== 1. 欧拉恒等式 ==========
const eulerAngle = ref(Math.PI)
const complexPlane = ref<HTMLElement | null>(null)
let complexPlaneChart: echarts.ECharts | null = null

const specialAngles = [
  { label: 'θ = 0', value: 0, formula: 'e^{i \\cdot 0} = 1', result: '1' },
  { label: 'θ = π/2', value: Math.PI / 2, formula: 'e^{i\\pi/2} = i', result: 'i' },
  { label: 'θ = π', value: Math.PI, formula: 'e^{i\\pi} = -1', result: '-1' },
  { label: 'θ = 3π/2', value: Math.PI * 3 / 2, formula: 'e^{i3\\pi/2} = -i', result: '-i' },
  { label: 'θ = 2π', value: Math.PI * 2, formula: 'e^{i2\\pi} = 1', result: '1' }
]

const setAngle = (angle: number) => {
  eulerAngle.value = angle
  updateEulerVisualization()
  mascotMessage.value = `已切换到特殊角度！观察单位圆上的位置变化 🎯`
}

const updateEulerVisualization = () => {
  if (!complexPlaneChart) return
  
  const realPart = Math.cos(eulerAngle.value)
  const imagPart = Math.sin(eulerAngle.value)
  
  const option = {
    title: {
      text: '单位圆与复平面',
      left: 'center'
    },
    tooltip: {
      formatter: (params: any) => {
        return `点: (${params.data[0].toFixed(3)}, ${params.data[1].toFixed(3)}i)`
      }
    },
    grid: {
      left: 80,
      right: 80,
      top: 80,
      bottom: 80
    },
    xAxis: {
      type: 'value',
      name: '实部',
      min: -1.5,
      max: 1.5,
      interval: 0.5,
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
      axisLine: { lineStyle: { color: '#666' } }
    },
    yAxis: {
      type: 'value',
      name: '虚部',
      min: -1.5,
      max: 1.5,
      interval: 0.5,
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
      axisLine: { lineStyle: { color: '#666' } }
    },
    series: [
      {
        name: '单位圆',
        type: 'line',
        data: Array.from({ length: 100 }, (_, i) => {
          const angle = (i / 100) * 2 * Math.PI
          return [Math.cos(angle), Math.sin(angle)]
        }),
        lineStyle: { color: '#409EFF', width: 2 },
        showSymbol: false
      },
      {
        name: '当前点',
        type: 'scatter',
        data: [[realPart, imagPart]],
        symbolSize: 15,
        itemStyle: { color: '#F56C6C' }
      },
      {
        name: '连线',
        type: 'line',
        data: [[0, 0], [realPart, imagPart]],
        lineStyle: { color: '#67C23A', width: 3 },
        showSymbol: false
      }
    ]
  }
  
  complexPlaneChart.setOption(option)
}

const initComplexPlane = () => {
  if (!complexPlane.value) return
  complexPlaneChart = echarts.init(complexPlane.value)
  updateEulerVisualization()
}

// ========== 2. 斐波那契与φ ==========
const fibTerms = ref(12)
const fibChart = ref<HTMLElement | null>(null)
let fibChartInstance: echarts.ECharts | null = null
const spiralCanvas = ref<HTMLCanvasElement | null>(null)

const fibonacci = (n: number): number => {
  if (n <= 1) return n
  let a = 0, b = 1
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}

const updateFibonacciChart = () => {
  if (!fibChartInstance) return
  
  const indices = Array.from({ length: fibTerms.value }, (_, i) => i + 1)
  const fibValues = indices.map(i => fibonacci(i))
  const phi = (1 + Math.sqrt(5)) / 2
  const expValues = indices.map(i => Math.pow(phi, i) / Math.sqrt(5))
  
  const option = {
    title: {
      text: '斐波那契数列 vs φⁿ/√5',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['斐波那契数', 'φⁿ/√5（Binet公式）'],
      top: 40
    },
    grid: {
      left: '10%',
      right: '10%',
      top: 100,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: indices,
      name: 'n'
    },
    yAxis: {
      type: 'log',
      name: '值（对数坐标）'
    },
    series: [
      {
        name: '斐波那契数',
        type: 'line',
        data: fibValues,
        lineStyle: { width: 3, color: '#E6A23C' },
        itemStyle: { color: '#E6A23C' }
      },
      {
        name: 'φⁿ/√5（Binet公式）',
        type: 'line',
        data: expValues,
        lineStyle: { width: 2, color: '#409EFF', type: 'dashed' },
        itemStyle: { color: '#409EFF' }
      }
    ]
  }
  
  fibChartInstance.setOption(option)
}

const initFibChart = () => {
  if (!fibChart.value) return
  fibChartInstance = echarts.init(fibChart.value)
  updateFibonacciChart()
}

// 绘制黄金螺旋
const drawGoldenSpiral = () => {
  const canvas = spiralCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, 400, 400)
  ctx.translate(200, 200)
  
  // 绘制斐波那契方格
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21]
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e']
  
  let x = 0, y = 0, direction = 0
  const scale = 3
  
  for (let i = 0; i < fibs.length; i++) {
    const size = fibs[i] * scale
    
    // 绘制方格
    ctx.fillStyle = colors[i] + '30'
    ctx.strokeStyle = colors[i]
    ctx.lineWidth = 2
    
    switch (direction % 4) {
      case 0: // 右
        ctx.fillRect(x, y - size, size, size)
        ctx.strokeRect(x, y - size, size, size)
        break
      case 1: // 下
        ctx.fillRect(x, y, size, size)
        ctx.strokeRect(x, y, size, size)
        break
      case 2: // 左
        ctx.fillRect(x - size, y, size, size)
        ctx.strokeRect(x - size, y, size, size)
        break
      case 3: // 上
        ctx.fillRect(x - size, y - size, size, size)
        ctx.strokeRect(x - size, y - size, size, size)
        break
    }
    
    // 绘制螺旋弧线
    ctx.beginPath()
    ctx.strokeStyle = '#2d3436'
    ctx.lineWidth = 3
    
    const startAngle = direction * Math.PI / 2
    const endAngle = startAngle + Math.PI / 2
    
    let centerX = x, centerY = y
    switch (direction % 4) {
      case 0: centerX += size; centerY -= size; break
      case 1: centerX += size; centerY += size; break
      case 2: centerX -= size; centerY += size; break
      case 3: centerX -= size; centerY -= size; break
    }
    
    ctx.arc(centerX, centerY, size, startAngle, endAngle)
    ctx.stroke()
    
    // 更新位置
    switch (direction % 4) {
      case 0: x += size; break
      case 1: y += size; break
      case 2: x -= size; break
      case 3: y -= size; break
    }
    
    direction++
  }
  
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

// ========== 3. 数学常数 ==========
const mathematicalConstants = [
  {
    symbol: 'e',
    name: '自然对数的底',
    value: '2.718281828...',
    description: '增长与变化的基本常数，微积分的核心',
    formulas: ['e = \\sum_{n=0}^{\\infty}\\frac{1}{n!}', 'e^x = \\lim_{n\\to\\infty}(1+\\frac{x}{n})^n']
  },
  {
    symbol: '\\pi',
    name: '圆周率',
    value: '3.141592653...',
    description: '圆的周长与直径之比，几何学的基础',
    formulas: ['\\pi = \\frac{C}{d}', '\\pi = 4\\sum_{n=0}^{\\infty}\\frac{(-1)^n}{2n+1}']
  },
  {
    symbol: '\\varphi',
    name: '黄金比例',
    value: '1.618033988...',
    description: '最美的比例，自然界中广泛存在',
    formulas: ['\\varphi = \\frac{1+\\sqrt{5}}{2}', '\\varphi^2 = \\varphi + 1']
  },
  {
    symbol: 'i',
    name: '虚数单位',
    value: '√(-1)',
    description: '扩展数系的关键，复分析的基础',
    formulas: ['i^2 = -1', 'e^{i\\pi} = -1']
  },
  {
    symbol: '\\gamma',
    name: '欧拉-马歇罗尼常数',
    value: '0.577215664...',
    description: '调和级数与对数的差',
    formulas: ['\\gamma = \\lim_{n\\to\\infty}(\\sum_{k=1}^{n}\\frac{1}{k}-\\ln n)']
  }
]

const networkChart = ref<HTMLElement | null>(null)
let networkChartInstance: echarts.ECharts | null = null

const initNetworkChart = () => {
  if (!networkChart.value) return
  
  networkChartInstance = echarts.init(networkChart.value)
  
  const option = {
    title: {
      text: '数学常数关系网络',
      left: 'center'
    },
    tooltip: {},
    series: [{
      type: 'graph',
      layout: 'force',
      data: [
        { name: 'e', value: 10, symbolSize: 60, itemStyle: { color: '#E6A23C' } },
        { name: 'π', value: 10, symbolSize: 60, itemStyle: { color: '#409EFF' } },
        { name: 'φ', value: 8, symbolSize: 50, itemStyle: { color: '#67C23A' } },
        { name: 'i', value: 9, symbolSize: 55, itemStyle: { color: '#F56C6C' } },
        { name: '0', value: 6, symbolSize: 40, itemStyle: { color: '#909399' } },
        { name: '1', value: 6, symbolSize: 40, itemStyle: { color: '#909399' } }
      ],
      links: [
        { source: 'e', target: 'π', value: 3, label: { show: true, formatter: 'e^(iπ)=-1' } },
        { source: 'e', target: 'i', value: 3 },
        { source: 'π', target: 'i', value: 3 },
        { source: 'e', target: '1', value: 2 },
        { source: 'π', target: '1', value: 2 },
        { source: 'i', target: '1', value: 2 },
        { source: 'e', target: '0', value: 1 },
        { source: 'π', target: '0', value: 1 },
        { source: 'φ', target: '1', value: 2 },
        { source: 'φ', target: 'e', value: 1 }
      ],
      roam: true,
      label: {
        show: true,
        fontSize: 18,
        fontWeight: 'bold'
      },
      force: {
        repulsion: 200,
        edgeLength: 150
      },
      lineStyle: {
        width: 2,
        curveness: 0.3
      }
    }]
  }
  
  networkChartInstance.setOption(option)
}

// ========== 4. 美丽公式 ==========
interface BeautifulFormula {
  name: string
  latex: string
  description: string
  rating: number
  tags: string[]
  meaning: string
  history: string
  aesthetics: string
}

const beautifulFormulas: BeautifulFormula[] = [
  {
    name: '欧拉恒等式',
    latex: 'e^{i\\pi} + 1 = 0',
    description: '连接五个最重要的数学常数',
    rating: 5,
    tags: ['经典', '优雅', '深刻'],
    meaning: '这个公式将自然对数的底 e、虚数单位 i、圆周率 π、乘法单位元 1 和加法单位元 0 完美地联系在一起。',
    history: '由瑞士数学家莱昂哈德·欧拉在18世纪发现。它是欧拉公式 e^(iθ) = cosθ + isinθ 在 θ = π 时的特殊情况。',
    aesthetics: '被称为"上帝创造的公式"，因其极致的简洁性和深刻性被评为最美的数学公式。五个基本常数通过三种基本运算联系在一起，展现了数学的统一之美。'
  },
  {
    name: '欧拉公式',
    latex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
    description: '连接指数函数与三角函数',
    rating: 5,
    tags: ['基础', '复分析', '周期性'],
    meaning: '将指数函数扩展到复数域，建立了指数函数与三角函数之间的桥梁。',
    history: '欧拉在1748年发表，是复分析的基石之一。',
    aesthetics: '展现了数学不同分支之间的深刻联系，是数学统一性的典范。'
  },
  {
    name: '斯特林公式',
    latex: 'n! \\approx \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n',
    description: '阶乘的渐近展开',
    rating: 4,
    tags: ['近似', '实用', '分析'],
    meaning: '给出了阶乘函数的精确渐近表达式，e 和 π 同时出现。',
    history: '由苏格兰数学家詹姆斯·斯特林在1730年提出。',
    aesthetics: 'e 和 π 意外地在阶乘公式中相遇，展现了数学的和谐性。'
  },
  {
    name: '正态分布',
    latex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    description: '自然界最重要的概率分布',
    rating: 4.5,
    tags: ['概率', '统计', '自然'],
    meaning: 'e 和 π 共同定义了描述自然界随机现象的基本分布。',
    history: '由高斯在研究测量误差时发现，也称高斯分布。',
    aesthetics: 'e 和 π 的结合恰到好处地描述了自然界的随机性规律。'
  },
  {
    name: '勾股定理',
    latex: 'a^2 + b^2 = c^2',
    description: '几何学的基石',
    rating: 4,
    tags: ['经典', '几何', '直观'],
    meaning: '直角三角形三边长度的关系，是欧几里得几何的核心定理。',
    history: '公元前6世纪由毕达哥拉斯学派发现，但更早的文明已经使用。',
    aesthetics: '简洁明了，直观易懂，是数学美的经典代表。'
  },
  {
    name: '黄金比例',
    latex: '\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.618',
    description: '最美的比例',
    rating: 4,
    tags: ['美学', '自然', '艺术'],
    meaning: '满足 φ² = φ + 1 的正数，在艺术和自然界中广泛存在。',
    history: '古希腊时期就被研究，文艺复兴时期被称为"神圣比例"。',
    aesthetics: '被认为是最和谐的比例，广泛应用于艺术、建筑和设计中。'
  }
]

const formulaDialogVisible = ref(false)
const selectedFormula = ref<BeautifulFormula | null>(null)

const selectFormula = (index: number) => {
  selectedFormula.value = beautifulFormulas[index]
  formulaDialogVisible.value = true
}

// ========== 生命周期 ==========
onMounted(() => {
  nextTick(() => {
    initComplexPlane()
    initFibChart()
    initNetworkChart()
    drawGoldenSpiral()
    
    // 响应式处理
    window.addEventListener('resize', () => {
      complexPlaneChart?.resize()
      fibChartInstance?.resize()
      networkChartInstance?.resize()
    })
  })
})
</script>

<style scoped lang="scss">
.chapter5 {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding-bottom: 80px;
}

.chapter-header {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
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
    font-size: 28px;
    text-align: center;
    margin: 20px 0;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .explanation, p {
    font-size: 16px;
    line-height: 1.8;
    color: #34495e;
    margin: 15px 0;
  }
}

// 欧拉恒等式展示
.euler-showcase {
  text-align: center;
  margin-bottom: 40px;
  
  .main-formula {
    font-size: 48px;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 20px;
    margin: 30px 0;
    box-shadow: 0 15px 50px rgba(102, 126, 234, 0.4);
  }
  
  .formula-description {
    font-size: 18px;
    color: #555;
    line-height: 1.8;
    margin: 30px 0;
  }
}

.constants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  .constant-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .constant-symbol {
      font-size: 48px;
      color: #667eea;
      margin-bottom: 15px;
    }
    
    .constant-name {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .constant-value {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
  }
}

.controls {
  margin: 30px 0;
  
  .control-item {
    label {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
  }
}

.visualization-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.complex-plane {
  .complex-canvas {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }
  
  .plane-info {
    background: #f5f7fa;
    padding: 20px;
    border-radius: 12px;
    
    h4 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #2c3e50;
    }
    
    p {
      margin: 8px 0;
      font-size: 15px;
      color: #555;
    }
  }
}

.euler-verification {
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .special-angles {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .angle-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 15px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: #667eea;
        transform: translateX(5px);
      }
      
      &.active {
        border-color: #667eea;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .angle-label {
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .angle-formula {
        font-size: 16px;
        margin: 5px 0;
      }
      
      .angle-result {
        font-size: 14px;
        opacity: 0.8;
      }
    }
  }
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
  .property-item {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    
    h4 {
      font-size: 18px;
      color: #667eea;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  }
}

.relationships {
  margin-top: 40px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 25px;
  }
}

.relation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  
  .relation-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 25px;
    
    h4 {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    
    .formula-display {
      font-size: 20px;
      text-align: center;
      margin: 15px 0;
      padding: 15px;
      background: white;
      border-radius: 8px;
    }
    
    p {
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  }
}

.numerical-comparison {
  margin-top: 40px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .comparison-table {
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
        padding: 18px;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
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
          padding: 15px 18px;
          font-size: 14px;
          color: #555;
          
          &:first-child {
            font-weight: 600;
            color: #333;
          }
        }
      }
    }
  }
}

.chart-container {
  margin: 30px 0;
  
  .fib-chart,
  .network-chart {
    width: 100%;
    height: 400px;
  }
}

.fib-insights {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
  
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
      font-size: 15px;
      line-height: 1.8;
      color: #555;
      border-left: 3px solid #667eea;
      padding-left: 20px;
      margin-bottom: 10px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 8px;
      padding: 15px 20px;
    }
  }
}

.golden-spiral {
  margin-top: 40px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .spiral-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    .spiral-canvas {
      border: 2px solid #ddd;
      border-radius: 12px;
      background: white;
    }
  }
  
  .spiral-note {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 15px;
  }
}

.constants-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
  
  .constant-detail {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 25px;
    
    .constant-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 15px;
      
      .constant-symbol-large {
        font-size: 48px;
        color: #667eea;
      }
      
      .constant-info {
        h4 {
          font-size: 20px;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .constant-value-text {
          font-size: 16px;
          color: #666;
          font-family: 'Courier New', monospace;
        }
      }
    }
    
    .constant-description {
      font-size: 14px;
      color: #555;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .constant-formulas {
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      .mini-formula {
        background: white;
        padding: 10px;
        border-radius: 8px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
}

.network-legend {
  margin-top: 20px;
  background: #f5f7fa;
  padding: 20px;
  border-radius: 12px;
  
  h4 {
    font-size: 18px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      
      .legend-line {
        width: 40px;
        height: 3px;
        
        &.strong {
          background: #409EFF;
        }
        
        &.medium {
          background: #E6A23C;
        }
        
        &.weak {
          background: #909399;
        }
      }
    }
  }
}

.beauty-intro {
  margin-bottom: 40px;
  
  h3 {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.8;
  }
}

.formulas-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  
  .formula-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
    
    .formula-rank {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
    }
    
    .formula-content {
      font-size: 28px;
      text-align: center;
      margin: 20px 0;
      padding: 25px;
      background: white;
      border-radius: 12px;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .formula-title {
      font-size: 20px;
      color: #2c3e50;
      margin: 15px 0 10px;
      text-align: center;
    }
    
    .formula-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 15px;
    }
    
    .formula-rating {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    
    .formula-tags {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }
  }
}

.formula-detail-dialog {
  .dialog-formula {
    font-size: 32px;
    text-align: center;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    margin-bottom: 25px;
  }
  
  .dialog-section {
    margin-bottom: 25px;
    
    h4 {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 10px;
      border-left: 4px solid #667eea;
      padding-left: 12px;
    }
    
    p {
      font-size: 15px;
      color: #555;
      line-height: 1.8;
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
  
  .euler-showcase .main-formula {
    font-size: 32px;
    padding: 30px 20px;
  }
  
  .constants-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .visualization-grid {
    grid-template-columns: 1fr;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
  }
  
  .relation-cards {
    grid-template-columns: 1fr;
  }
  
  .comparison-table {
    font-size: 12px;
    
    thead th,
    tbody td {
      padding: 10px 12px;
    }
  }
  
  .constants-showcase {
    grid-template-columns: 1fr;
  }
  
  .formulas-gallery {
    grid-template-columns: 1fr;
  }
  
  .chapter-footer {
    flex-direction: column;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>
