<template>
  <div class="chapter-container chapter4">
    <!-- 章节头部 -->
    <header class="chapter-header">
      <div class="header-content">
        <router-link to="/" class="back-link">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
        <h1 class="chapter-title">
          <span class="chapter-number">第四章</span>
          <span class="chapter-name">e的应用领域</span>
        </h1>
        <p class="chapter-subtitle">探索 e 在现实世界的广泛应用</p>
      </div>
    </header>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :message="mascotMessage"
      position="right"
    />

    <!-- 1. 自然增长模型 -->
    <section class="story-section" id="growth">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><TrendCharts /></el-icon>
          自然增长模型
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>指数增长基本公式</h3>
          <div class="formula-display" v-html="renderFormula('N(t) = N_0 \\cdot e^{rt}')"></div>
          <div class="explanation">
            <ul>
              <li><span v-html="renderFormula('N(t)')"></span>：t 时刻的数量</li>
              <li><span v-html="renderFormula('N_0')"></span>：初始数量</li>
              <li><span v-html="renderFormula('r')"></span>：增长率 (正值增长，负值衰减)</li>
              <li><span v-html="renderFormula('t')"></span>：时间</li>
            </ul>
            <p><strong>为什么是 e？</strong> 当增长率恒定时，e 是自然对数的底，使微分方程 <span v-html="renderFormula('\\frac{dN}{dt} = rN')"></span> 的解最简洁优雅。</p>
          </div>
        </div>

        <!-- 增长模拟器 -->
        <div class="growth-simulator">
          <h3>交互式增长模拟</h3>
          
          <div class="controls-grid">
            <div class="control-item">
              <label>初始数量 (N₀): {{ growthParams.initial }}</label>
              <el-slider 
                v-model="growthParams.initial" 
                :min="10" 
                :max="1000"
                :step="10"
                @change="updateGrowthChart"
              />
            </div>
            
            <div class="control-item">
              <label>增长率 (r): {{ growthParams.rate.toFixed(2) }}</label>
              <el-slider 
                v-model="growthParams.rate" 
                :min="-0.5" 
                :max="0.5"
                :step="0.01"
                :format-tooltip="(val: number) => val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)"
                @change="updateGrowthChart"
              />
            </div>
            
            <div class="control-item">
              <label>时间范围: {{ growthParams.timeRange }} 单位</label>
              <el-slider 
                v-model="growthParams.timeRange" 
                :min="5" 
                :max="50"
                :step="5"
                @change="updateGrowthChart"
              />
            </div>
          </div>

          <div class="scenario-tabs">
            <el-radio-group v-model="growthScenario" @change="switchGrowthScenario">
              <el-radio-button label="population">人口增长</el-radio-button>
              <el-radio-button label="bacteria">细菌繁殖</el-radio-button>
              <el-radio-button label="decay">放射性衰变</el-radio-button>
              <el-radio-button label="cooling">冷却过程</el-radio-button>
            </el-radio-group>
          </div>

          <div class="chart-container">
            <div ref="growthChart" class="growth-chart"></div>
          </div>

          <div class="growth-stats">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <h4>当前状态</h4>
                <p>{{ growthParams.rate > 0 ? '指数增长' : '指数衰减' }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <h4>倍增/半衰期</h4>
                <p>{{ doublingTime.toFixed(2) }} 单位</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <h4>最终数量</h4>
                <p>{{ finalValue.toFixed(0) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. 概率统计应用 -->
    <section class="story-section" id="probability">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><PieChart /></el-icon>
          概率统计中的 e
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>正态分布概率密度函数</h3>
          <div class="formula-display" v-html="renderFormula('f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}')"></div>
          <div class="explanation">
            <ul>
              <li><span v-html="renderFormula('\\mu')"></span>：均值 (分布中心)</li>
              <li><span v-html="renderFormula('\\sigma')"></span>：标准差 (离散程度)</li>
              <li><span v-html="renderFormula('e')"></span> 出现在指数项中，保证概率密度的优美形式</li>
            </ul>
          </div>
        </div>

        <!-- 正态分布可视化 -->
        <div class="normal-distribution">
          <h3>正态分布交互探索</h3>
          
          <div class="controls-grid">
            <div class="control-item">
              <label>均值 (μ): {{ normalParams.mean }}</label>
              <el-slider 
                v-model="normalParams.mean" 
                :min="-5" 
                :max="5"
                :step="0.5"
                @change="updateNormalChart"
              />
            </div>
            
            <div class="control-item">
              <label>标准差 (σ): {{ normalParams.stdDev.toFixed(1) }}</label>
              <el-slider 
                v-model="normalParams.stdDev" 
                :min="0.5" 
                :max="3"
                :step="0.1"
                @change="updateNormalChart"
              />
            </div>
          </div>

          <div class="chart-container">
            <div ref="normalChart" class="normal-chart"></div>
          </div>

          <div class="probability-calculator">
            <h4>概率计算器</h4>
            <div class="calc-inputs">
              <el-input-number 
                v-model="probRange.lower" 
                :precision="1"
                :step="0.5"
                @change="updateProbability"
              />
              <span class="calc-separator">到</span>
              <el-input-number 
                v-model="probRange.upper" 
                :precision="1"
                :step="0.5"
                @change="updateProbability"
              />
            </div>
            <div class="calc-result">
              <p>P({{ probRange.lower }} ≤ X ≤ {{ probRange.upper }}) ≈ <strong>{{ probability.toFixed(4) }}</strong> ({{ (probability * 100).toFixed(2) }}%)</p>
            </div>
          </div>

          <div class="normal-insights">
            <h4>正态分布特性</h4>
            <div class="insights-grid">
              <div class="insight-item">
                <span class="insight-label">68-95-99.7 规则</span>
                <span class="insight-value">68%数据在±1σ内</span>
              </div>
              <div class="insight-item">
                <span class="insight-label">均值=中位数=众数</span>
                <span class="insight-value">完美对称分布</span>
              </div>
              <div class="insight-item">
                <span class="insight-label">中心极限定理</span>
                <span class="insight-value">大样本均值趋近正态</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 物理学应用 -->
    <section class="story-section" id="physics">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Lightning /></el-icon>
          物理学中的 e
        </h2>
      </div>

      <div class="content-box">
        <div class="physics-tabs">
          <el-tabs v-model="physicsTab" @tab-change="updatePhysicsChart">
            <el-tab-pane label="放射性衰变" name="decay">
              <div class="theory-box">
                <h3>放射性衰变定律</h3>
                <div class="formula-display" v-html="renderFormula('N(t) = N_0 e^{-\\lambda t}')"></div>
                <div class="explanation">
                  <ul>
                    <li><span v-html="renderFormula('\\lambda')"></span>：衰变常数</li>
                    <li>半衰期 <span v-html="renderFormula('T_{1/2} = \\frac{\\ln 2}{\\lambda}')"></span></li>
                    <li>实例：碳-14 半衰期 5,730 年，用于考古定年</li>
                  </ul>
                </div>
              </div>

              <div class="controls-grid">
                <div class="control-item">
                  <label>初始原子数: {{ decayParams.initial }}</label>
                  <el-slider 
                    v-model="decayParams.initial" 
                    :min="100" 
                    :max="10000"
                    :step="100"
                    @change="updatePhysicsChart"
                  />
                </div>
                <div class="control-item">
                  <label>半衰期: {{ decayParams.halfLife }} 年</label>
                  <el-slider 
                    v-model="decayParams.halfLife" 
                    :min="100" 
                    :max="10000"
                    :step="100"
                    @change="updatePhysicsChart"
                  />
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="RC电路充放电" name="rc">
              <div class="theory-box">
                <h3>RC 电路充电过程</h3>
                <div class="formula-display" v-html="renderFormula('V(t) = V_0(1 - e^{-\\frac{t}{RC}})')"></div>
                <div class="explanation">
                  <ul>
                    <li><span v-html="renderFormula('R')"></span>：电阻 (Ω)</li>
                    <li><span v-html="renderFormula('C')"></span>：电容 (F)</li>
                    <li>时间常数 <span v-html="renderFormula('\\tau = RC')"></span></li>
                    <li>充电至 63.2% 需要 1τ 时间</li>
                  </ul>
                </div>
              </div>

              <div class="controls-grid">
                <div class="control-item">
                  <label>电阻 R: {{ rcParams.resistance }} Ω</label>
                  <el-slider 
                    v-model="rcParams.resistance" 
                    :min="100" 
                    :max="10000"
                    :step="100"
                    @change="updatePhysicsChart"
                  />
                </div>
                <div class="control-item">
                  <label>电容 C: {{ rcParams.capacitance }} μF</label>
                  <el-slider 
                    v-model="rcParams.capacitance" 
                    :min="10" 
                    :max="1000"
                    :step="10"
                    @change="updatePhysicsChart"
                  />
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="牛顿冷却定律" name="cooling">
              <div class="theory-box">
                <h3>牛顿冷却定律</h3>
                <div class="formula-display" v-html="renderFormula('T(t) = T_{env} + (T_0 - T_{env})e^{-kt}')"></div>
                <div class="explanation">
                  <ul>
                    <li><span v-html="renderFormula('T_0')"></span>：初始温度</li>
                    <li><span v-html="renderFormula('T_{env}')"></span>：环境温度</li>
                    <li><span v-html="renderFormula('k')"></span>：冷却系数</li>
                    <li>应用：法医推断死亡时间</li>
                  </ul>
                </div>
              </div>

              <div class="controls-grid">
                <div class="control-item">
                  <label>初始温度: {{ coolingParams.initial }}°C</label>
                  <el-slider 
                    v-model="coolingParams.initial" 
                    :min="20" 
                    :max="100"
                    :step="5"
                    @change="updatePhysicsChart"
                  />
                </div>
                <div class="control-item">
                  <label>环境温度: {{ coolingParams.ambient }}°C</label>
                  <el-slider 
                    v-model="coolingParams.ambient" 
                    :min="0" 
                    :max="30"
                    :step="5"
                    @change="updatePhysicsChart"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

          <div class="chart-container">
            <div ref="physicsChart" class="physics-chart"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 金融工程应用 -->
    <section class="story-section" id="finance">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Money /></el-icon>
          金融工程中的 e
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>连续复利公式</h3>
          <div class="formula-display" v-html="renderFormula('A = Pe^{rt}')"></div>
          <div class="explanation">
            <ul>
              <li><span v-html="renderFormula('P')"></span>：本金</li>
              <li><span v-html="renderFormula('r')"></span>：年利率</li>
              <li><span v-html="renderFormula('t')"></span>：时间（年）</li>
              <li>连续复利是离散复利的极限形式</li>
            </ul>
          </div>
        </div>

        <!-- 金融计算器 -->
        <div class="finance-calculator">
          <h3>投资收益计算器</h3>
          
          <div class="controls-grid">
            <div class="control-item">
              <label>本金: ¥{{ financeParams.principal.toLocaleString() }}</label>
              <el-slider 
                v-model="financeParams.principal" 
                :min="1000" 
                :max="1000000"
                :step="1000"
                @change="updateFinanceChart"
              />
            </div>
            
            <div class="control-item">
              <label>年利率: {{ (financeParams.rate * 100).toFixed(2) }}%</label>
              <el-slider 
                v-model="financeParams.rate" 
                :min="0.01" 
                :max="0.20"
                :step="0.01"
                :format-tooltip="(val: number) => (val * 100).toFixed(1) + '%'"
                @change="updateFinanceChart"
              />
            </div>
            
            <div class="control-item">
              <label>投资期限: {{ financeParams.years }} 年</label>
              <el-slider 
                v-model="financeParams.years" 
                :min="1" 
                :max="30"
                :step="1"
                @change="updateFinanceChart"
              />
            </div>
          </div>

          <div class="chart-container">
            <div ref="financeChart" class="finance-chart"></div>
          </div>

          <div class="finance-comparison">
            <h4>复利方式对比</h4>
            <div class="comparison-grid">
              <div class="comparison-card" v-for="method in comparisonResults" :key="method.name">
                <h5>{{ method.name }}</h5>
                <div class="method-value">¥{{ method.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</div>
                <div class="method-gain">收益: ¥{{ method.gain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</div>
                <div class="method-diff" v-if="method.diff !== 0">
                  {{ method.diff > 0 ? '+' : '' }}¥{{ Math.abs(method.diff).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 信号处理应用 -->
    <section class="story-section" id="signal">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Connection /></el-icon>
          信号处理中的 e
        </h2>
      </div>

      <div class="content-box">
        <div class="theory-box">
          <h3>欧拉公式与傅里叶变换</h3>
          <div class="formula-display" v-html="renderFormula('e^{i\\theta} = \\cos\\theta + i\\sin\\theta')"></div>
          <div class="formula-display" v-html="renderFormula('F(\\omega) = \\int_{-\\infty}^{\\infty} f(t)e^{-i\\omega t}dt')"></div>
          <div class="explanation">
            <ul>
              <li>欧拉公式连接指数函数与三角函数</li>
              <li>傅里叶变换将时域信号转换到频域</li>
              <li>应用：音频处理、图像压缩、通信系统</li>
            </ul>
          </div>
        </div>

        <!-- 信号可视化 -->
        <div class="signal-visualizer">
          <h3>信号合成与分解</h3>
          
          <div class="signal-controls">
            <h4>添加频率分量</h4>
            <div class="frequency-components">
              <div v-for="(comp, index) in signalComponents" :key="index" class="component-control">
                <label>频率 {{ comp.frequency }} Hz</label>
                <el-slider 
                  v-model="comp.amplitude" 
                  :min="0" 
                  :max="1"
                  :step="0.1"
                  @change="updateSignalChart"
                />
                <el-button @click="removeComponent(index)" size="small" type="danger" circle>
                  <el-icon><Close /></el-icon>
                </el-button>
              </div>
            </div>
            <el-button @click="addComponent" type="primary" size="small">
              <el-icon><Plus /></el-icon>
              添加分量
            </el-button>
          </div>

          <div class="chart-container">
            <div ref="signalChart" class="signal-chart"></div>
          </div>

          <div class="signal-info">
            <div class="info-card">
              <div class="info-icon">🎵</div>
              <div class="info-content">
                <h4>时域信号</h4>
                <p>显示信号随时间的变化</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon">📊</div>
              <div class="info-content">
                <h4>频域分解</h4>
                <p>通过 e^(iωt) 分解为频率分量</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon">⚡</div>
              <div class="info-content">
                <h4>实际应用</h4>
                <p>MP3压缩、降噪、频谱分析</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 章节导航 -->
    <footer class="chapter-footer">
      <el-button @click="$router.push('/chapter3')" size="large">
        <el-icon><ArrowLeft /></el-icon>
        上一章
      </el-button>
      <el-button @click="$router.push('/')" size="large" type="info">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
      <el-button @click="$router.push('/chapter5')" size="large" type="primary">
        下一章
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Back, TrendCharts, PieChart, Lightning, Money, Connection, Plus, Close, ArrowLeft, ArrowRight, HomeFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'
import { initChart, setupChartResize } from '@/utils/echartsHelper'

// 吉祥物消息
const mascotMessage = ref('探索 e 在各个领域的实际应用，从自然界到金融市场，e 无处不在！🌍')

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

// ========== 1. 自然增长模型 ==========
const growthParams = ref({
  initial: 100,
  rate: 0.1,
  timeRange: 20
})

const growthScenario = ref('population')
const growthChart = ref<HTMLElement | null>(null)
let growthChartInstance: echarts.ECharts | null = null

const doublingTime = computed(() => {
  return Math.abs(Math.log(2) / growthParams.value.rate)
})

const finalValue = computed(() => {
  return growthParams.value.initial * Math.exp(growthParams.value.rate * growthParams.value.timeRange)
})

const switchGrowthScenario = (scenario: string) => {
  const scenarios: Record<string, any> = {
    population: { initial: 100, rate: 0.02, timeRange: 50, title: '人口增长' },
    bacteria: { initial: 10, rate: 0.3, timeRange: 10, title: '细菌繁殖' },
    decay: { initial: 1000, rate: -0.1, timeRange: 30, title: '放射性衰变' },
    cooling: { initial: 500, rate: -0.15, timeRange: 20, title: '冷却过程' }
  }
  
  const config = scenarios[scenario]
  growthParams.value = { ...config }
  updateGrowthChart()
  
  mascotMessage.value = `切换到 ${config.title} 场景，观察 e 如何描述这个过程！📊`
}

const updateGrowthChart = () => {
  if (!growthChartInstance) return
  
  const timePoints = []
  const values = []
  
  for (let t = 0; t <= growthParams.value.timeRange; t += 0.5) {
    timePoints.push(t.toFixed(1))
    values.push(growthParams.value.initial * Math.exp(growthParams.value.rate * t))
  }
  
  const scenarioNames: Record<string, string> = {
    population: '人口数量',
    bacteria: '细菌数量',
    decay: '剩余原子数',
    cooling: '温度差'
  }
  
  const option = {
    title: {
      text: `${scenarioNames[growthScenario.value]}随时间变化`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `时间: ${params[0].axisValue}<br/>${scenarioNames[growthScenario.value]}: ${params[0].data.toFixed(2)}`
      }
    },
    grid: { left: '10%', right: '10%', top: 80, bottom: 60 },
    xAxis: {
      type: 'category',
      data: timePoints,
      name: '时间',
      nameLocation: 'middle',
      nameGap: 30
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: scenarioNames[growthScenario.value]
    },
    series: [{
      type: 'line',
      data: values,
      smooth: true,
      lineStyle: { width: 3, color: '#409EFF' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
          { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
        ])
      }
    }]
  }
  
  growthChartInstance.setOption(option)
}

const initGrowthChart = async () => {
  if (!growthChart.value) return
  growthChartInstance = await initChart(growthChart.value)
  if (!growthChartInstance) return
  updateGrowthChart()
}

// ========== 2. 概率统计应用 ==========
const normalParams = ref({
  mean: 0,
  stdDev: 1
})

const probRange = ref({
  lower: -1,
  upper: 1
})

const probability = ref(0.6827)

const normalChart = ref<HTMLElement | null>(null)
let normalChartInstance: echarts.ECharts | null = null

// 正态分布概率密度函数
const normalPDF = (x: number, mean: number, stdDev: number): number => {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI))
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
  return coefficient * Math.exp(exponent)
}

// 使用辛普森法则近似计算积分
const normalCDF = (x: number, mean: number, stdDev: number): number => {
  const step = 0.01
  let sum = 0
  for (let t = -10; t <= x; t += step) {
    sum += normalPDF(t, mean, stdDev) * step
  }
  return sum
}

const updateNormalChart = () => {
  if (!normalChartInstance) return
  
  const xValues = []
  const yValues = []
  
  const rangeStart = normalParams.value.mean - 4 * normalParams.value.stdDev
  const rangeEnd = normalParams.value.mean + 4 * normalParams.value.stdDev
  
  for (let x = rangeStart; x <= rangeEnd; x += 0.1) {
    xValues.push(x.toFixed(2))
    yValues.push(normalPDF(x, normalParams.value.mean, normalParams.value.stdDev))
  }
  
  const option = {
    title: {
      text: '正态分布概率密度曲线',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `x = ${params[0].axisValue}<br/>f(x) = ${params[0].data.toFixed(4)}`
      }
    },
    grid: { left: '10%', right: '10%', top: 80, bottom: 60 },
    xAxis: {
      type: 'category',
      data: xValues,
      name: 'x',
      axisLabel: {
        interval: Math.floor(xValues.length / 10)
      }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: 'f(x)'
    },
    series: [{
      type: 'line',
      data: yValues,
      smooth: true,
      lineStyle: { width: 3, color: '#67C23A' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(103, 194, 58, 0.3)' },
          { offset: 1, color: 'rgba(103, 194, 58, 0.05)' }
        ])
      },
      markLine: {
        silent: true,
        symbol: 'none',
        data: [
          { xAxis: xValues.findIndex(x => parseFloat(x) >= normalParams.value.mean), label: { formatter: 'μ' } }
        ]
      }
    }]
  }
  
  normalChartInstance.setOption(option)
}

const updateProbability = () => {
  const p1 = normalCDF(probRange.value.lower, normalParams.value.mean, normalParams.value.stdDev)
  const p2 = normalCDF(probRange.value.upper, normalParams.value.mean, normalParams.value.stdDev)
  probability.value = Math.abs(p2 - p1)
}

const initNormalChart = async () => {
  if (!normalChart.value) return
  normalChartInstance = await initChart(normalChart.value)
  if (!normalChartInstance) return
  updateNormalChart()
}

// ========== 3. 物理学应用 ==========
const physicsTab = ref('decay')

const decayParams = ref({
  initial: 5000,
  halfLife: 5730
})

const rcParams = ref({
  resistance: 1000,
  capacitance: 100
})

const coolingParams = ref({
  initial: 80,
  ambient: 20
})

const physicsChart = ref<HTMLElement | null>(null)
let physicsChartInstance: echarts.ECharts | null = null

const updatePhysicsChart = () => {
  if (!physicsChartInstance) return
  
  const timePoints = []
  const values = []
  let title = ''
  let yAxisName = ''
  
  if (physicsTab.value === 'decay') {
    const lambda = Math.log(2) / decayParams.value.halfLife
    for (let t = 0; t <= decayParams.value.halfLife * 3; t += decayParams.value.halfLife / 20) {
      timePoints.push(t.toFixed(0))
      values.push(decayParams.value.initial * Math.exp(-lambda * t))
    }
    title = '放射性衰变曲线'
    yAxisName = '原子数'
  } else if (physicsTab.value === 'rc') {
    const tau = rcParams.value.resistance * rcParams.value.capacitance / 1000000 // 转换为秒
    const maxTime = tau * 5
    for (let t = 0; t <= maxTime; t += maxTime / 50) {
      timePoints.push(t.toFixed(3))
      values.push(100 * (1 - Math.exp(-t / tau)))
    }
    title = 'RC电路充电曲线'
    yAxisName = '电压 (%)'
  } else if (physicsTab.value === 'cooling') {
    const k = 0.1
    for (let t = 0; t <= 50; t += 1) {
      timePoints.push(t.toString())
      values.push(coolingParams.value.ambient + (coolingParams.value.initial - coolingParams.value.ambient) * Math.exp(-k * t))
    }
    title = '牛顿冷却曲线'
    yAxisName = '温度 (°C)'
  }
  
  const option = {
    title: { text: title, left: 'center' },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `时间: ${params[0].axisValue}<br/>${yAxisName}: ${params[0].data.toFixed(2)}`
      }
    },
    grid: { left: '10%', right: '10%', top: 80, bottom: 60 },
    xAxis: {
      type: 'category',
      data: timePoints,
      name: '时间',
      axisLabel: {
        interval: Math.floor(timePoints.length / 10)
      }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: yAxisName
    },
    series: [{
      type: 'line',
      data: values,
      smooth: true,
      lineStyle: { width: 3, color: '#E6A23C' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(230, 162, 60, 0.3)' },
          { offset: 1, color: 'rgba(230, 162, 60, 0.05)' }
        ])
      }
    }]
  }
  
  physicsChartInstance.setOption(option)
}

const initPhysicsChart = async () => {
  if (!physicsChart.value) return
  physicsChartInstance = await initChart(physicsChart.value)
  if (!physicsChartInstance) return
  updatePhysicsChart()
}

// ========== 4. 金融工程应用 ==========
const financeParams = ref({
  principal: 10000,
  rate: 0.05,
  years: 10
})

const financeChart = ref<HTMLElement | null>(null)
let financeChartInstance: echarts.ECharts | null = null

const comparisonResults = computed(() => {
  const P = financeParams.value.principal
  const r = financeParams.value.rate
  const t = financeParams.value.years
  
  const continuous = P * Math.exp(r * t)
  const annual = P * Math.pow(1 + r, t)
  const semiAnnual = P * Math.pow(1 + r/2, 2*t)
  const quarterly = P * Math.pow(1 + r/4, 4*t)
  const monthly = P * Math.pow(1 + r/12, 12*t)
  
  return [
    { name: '连续复利', value: continuous, gain: continuous - P, diff: 0 },
    { name: '年复利', value: annual, gain: annual - P, diff: annual - continuous },
    { name: '半年复利', value: semiAnnual, gain: semiAnnual - P, diff: semiAnnual - continuous },
    { name: '季度复利', value: quarterly, gain: quarterly - P, diff: quarterly - continuous },
    { name: '月复利', value: monthly, gain: monthly - P, diff: monthly - continuous }
  ]
})

const updateFinanceChart = () => {
  if (!financeChartInstance) return
  
  const years = []
  const continuousData = []
  const annualData = []
  const monthlyData = []
  
  const P = financeParams.value.principal
  const r = financeParams.value.rate
  
  for (let t = 0; t <= financeParams.value.years; t++) {
    years.push(t)
    continuousData.push(P * Math.exp(r * t))
    annualData.push(P * Math.pow(1 + r, t))
    monthlyData.push(P * Math.pow(1 + r/12, 12*t))
  }
  
  const option = {
    title: { text: '不同复利方式收益对比', left: 'center' },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        let result = `第 ${params[0].axisValue} 年<br/>`
        params.forEach((param: any) => {
          result += `${param.seriesName}: ¥${param.data.toLocaleString(undefined, {minimumFractionDigits: 2})}<br/>`
        })
        return result
      }
    },
    legend: {
      data: ['连续复利', '年复利', '月复利'],
      top: 40
    },
    grid: { left: '10%', right: '10%', top: 100, bottom: 60 },
    xAxis: {
      type: 'category',
      data: years,
      name: '年份'
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: '金额 (¥)',
      axisLabel: {
        formatter: (value: number) => '¥' + (value / 1000).toFixed(0) + 'K'
      }
    },
    series: [
      {
        name: '连续复利',
        type: 'line',
        data: continuousData,
        smooth: true,
        lineStyle: { width: 3, color: '#F56C6C' }
      },
      {
        name: '年复利',
        type: 'line',
        data: annualData,
        smooth: true,
        lineStyle: { width: 2, color: '#409EFF', type: 'dashed' }
      },
      {
        name: '月复利',
        type: 'line',
        data: monthlyData,
        smooth: true,
        lineStyle: { width: 2, color: '#67C23A', type: 'dotted' }
      }
    ]
  }
  
  financeChartInstance.setOption(option)
}

const initFinanceChart = async () => {
  if (!financeChart.value) return
  financeChartInstance = await initChart(financeChart.value)
  if (!financeChartInstance) return
  updateFinanceChart()
}

// ========== 5. 信号处理应用 ==========
interface SignalComponent {
  frequency: number
  amplitude: number
}

const signalComponents = ref<SignalComponent[]>([
  { frequency: 1, amplitude: 1 },
  { frequency: 3, amplitude: 0.5 }
])

const signalChart = ref<HTMLElement | null>(null)
let signalChartInstance: echarts.ECharts | null = null

const addComponent = () => {
  if (signalComponents.value.length < 5) {
    const newFreq = (signalComponents.value.length + 1) * 2 - 1
    signalComponents.value.push({ frequency: newFreq, amplitude: 0.3 })
    updateSignalChart()
  }
}

const removeComponent = (index: number) => {
  if (signalComponents.value.length > 1) {
    signalComponents.value.splice(index, 1)
    updateSignalChart()
  }
}

const updateSignalChart = () => {
  if (!signalChartInstance) return
  
  const timePoints = []
  const signalValues = []
  
  for (let t = 0; t <= 2; t += 0.01) {
    timePoints.push(t.toFixed(2))
    
    let value = 0
    signalComponents.value.forEach(comp => {
      value += comp.amplitude * Math.sin(2 * Math.PI * comp.frequency * t)
    })
    signalValues.push(value)
  }
  
  const option = {
    title: { text: '合成信号波形', left: 'center' },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `时间: ${params[0].axisValue}s<br/>幅度: ${params[0].data.toFixed(3)}`
      }
    },
    grid: { left: '10%', right: '10%', top: 80, bottom: 60 },
    xAxis: {
      type: 'category',
      data: timePoints,
      name: '时间 (s)',
      axisLabel: {
        interval: Math.floor(timePoints.length / 10)
      }
    },
    yAxis: {
      axisLine: { show: true, lineStyle: { color: '#333' } },
      type: 'value',
      name: '幅度'
    },
    series: [{
      type: 'line',
      data: signalValues,
      smooth: false,
      lineStyle: { width: 2, color: '#9C27B0' },
      itemStyle: { color: '#9C27B0' },
      showSymbol: false
    }]
  }
  
  signalChartInstance.setOption(option)
}

const initSignalChart = async () => {
  if (!signalChart.value) return
  signalChartInstance = await initChart(signalChart.value)
  if (!signalChartInstance) return
  updateSignalChart()
}

// ========== 生命周期 ==========
let cleanupGrowth: (() => void) | null = null
let cleanupNormal: (() => void) | null = null
let cleanupPhysics: (() => void) | null = null
let cleanupFinance: (() => void) | null = null
let cleanupSignal: (() => void) | null = null

onMounted(async () => {
  await nextTick()
  
  await initGrowthChart()
  await initNormalChart()
  await initPhysicsChart()
  await initFinanceChart()
  await initSignalChart()
  updateProbability()
  
  // ✅ 设置响应式调整
  if (growthChartInstance) cleanupGrowth = setupChartResize(growthChartInstance, growthChart.value!)
  if (normalChartInstance) cleanupNormal = setupChartResize(normalChartInstance, normalChart.value!)
  if (physicsChartInstance) cleanupPhysics = setupChartResize(physicsChartInstance, physicsChart.value!)
  if (financeChartInstance) cleanupFinance = setupChartResize(financeChartInstance, financeChart.value!)
  if (signalChartInstance) cleanupSignal = setupChartResize(signalChartInstance, signalChart.value!)
})

onUnmounted(() => {
  if (cleanupGrowth) cleanupGrowth()
  if (cleanupNormal) cleanupNormal()
  if (cleanupPhysics) cleanupPhysics()
  if (cleanupFinance) cleanupFinance()
  if (cleanupSignal) cleanupSignal()
  
  const charts = [growthChartInstance, normalChartInstance, physicsChartInstance, financeChartInstance, signalChartInstance]
  charts.forEach(chart => {
    if (chart && !chart.isDisposed()) chart.dispose()
  })
})
</script>

<style scoped lang="scss">
.chapter4 {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding-bottom: 80px;
}

.chapter-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
    font-size: 22px;
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
        border-left: 3px solid #f093fb;
        padding-left: 15px;
        margin-bottom: 8px;
      }
    }
  }
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
  
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

.scenario-tabs {
  margin-bottom: 30px;
  text-align: center;
}

.chart-container {
  margin: 30px 0;
  
  .growth-chart,
  .normal-chart,
  .physics-chart,
  .finance-chart,
  .signal-chart {
    width: 100%;
    height: 400px;
  }
}

.growth-stats,
.signal-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  .stat-card,
  .info-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    
    .stat-icon,
    .info-icon {
      font-size: 36px;
    }
    
    .stat-content,
    .info-content {
      h4 {
        font-size: 16px;
        color: #2c3e50;
        margin-bottom: 8px;
      }
      
      p {
        font-size: 18px;
        color: #f5576c;
        font-weight: 700;
      }
    }
  }
}

.probability-calculator {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .calc-inputs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
    
    .calc-separator {
      font-size: 16px;
      color: #666;
    }
  }
  
  .calc-result {
    text-align: center;
    
    p {
      font-size: 18px;
      color: #333;
      
      strong {
        color: #f5576c;
        font-size: 24px;
      }
    }
  }
}

.normal-insights {
  margin-top: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    
    .insight-item {
      background: white;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      
      .insight-label {
        font-size: 14px;
        color: #666;
        font-weight: 600;
      }
      
      .insight-value {
        font-size: 16px;
        color: #f5576c;
      }
    }
  }
}

.physics-tabs {
  :deep(.el-tabs__header) {
    background: #f5f7fa;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
  }
}

.finance-comparison {
  margin-top: 30px;
  
  h4 {
    font-size: 22px;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    
    .comparison-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      
      h5 {
        font-size: 16px;
        margin-bottom: 15px;
        opacity: 0.9;
      }
      
      .method-value {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      
      .method-gain {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 8px;
      }
      
      .method-diff {
        font-size: 13px;
        background: rgba(255, 255, 255, 0.2);
        padding: 5px 10px;
        border-radius: 20px;
        display: inline-block;
      }
    }
  }
}

.signal-controls {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .frequency-components {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    
    .component-control {
      display: flex;
      align-items: center;
      gap: 15px;
      background: white;
      padding: 15px;
      border-radius: 10px;
      
      label {
        min-width: 100px;
        font-weight: 600;
        color: #333;
      }
      
      .el-slider {
        flex: 1;
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
      font-size: 16px;
      padding: 15px;
    }
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .chart-container {
    .growth-chart,
    .normal-chart,
    .physics-chart,
    .finance-chart,
    .signal-chart {
      height: 280px;
    }
  }
  
  .growth-stats,
  .signal-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .probability-calculator {
    padding: 20px;
    
    .calc-inputs {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  .normal-insights .insights-grid {
    grid-template-columns: 1fr;
  }
  
  .finance-comparison .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .signal-controls {
    padding: 20px;
    
    .component-control {
      flex-direction: column;
      align-items: flex-start;
      
      label {
        min-width: auto;
      }
      
      .el-slider {
        width: 100%;
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
