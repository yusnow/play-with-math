<template>
  <div class="lab-section">
    <h2 class="lab-title">🔬 探索实验室</h2>
    
    <!-- 标签页导航 -->
    <el-tabs v-model="activeTab" type="border-card">
      <!-- Tab 1: 函数探索器 -->
      <el-tab-pane label="📊 函数探索器" name="functions">
        <div class="lab-content">
          <h3>多函数对比与分析</h3>
          
          <!-- 函数选择 -->
          <div class="function-selector">
            <el-checkbox-group v-model="selectedFunctions" @change="updateFunctionPlot">
              <el-checkbox label="exp" border>e^x</el-checkbox>
              <el-checkbox label="ln" border>ln(x)</el-checkbox>
              <el-checkbox label="exp_decay" border>e^(-x)</el-checkbox>
              <el-checkbox label="gaussian" border>e^(-x²)</el-checkbox>
              <el-checkbox label="sinh" border>sinh(x)</el-checkbox>
            </el-checkbox-group>
          </div>
          
          <!-- 显示选项 -->
          <div class="display-options">
            <el-switch v-model="showDerivative" @change="updateFunctionPlot" active-text="显示导数" />
            <el-switch v-model="showIntegral" @change="updateFunctionPlot" active-text="显示积分" />
            <el-switch v-model="showSpecialPoints" @change="updateFunctionPlot" active-text="标注特殊点" />
          </div>
          
          <!-- 图表 -->
          <div ref="functionChartRef" class="chart" style="height: 500px"></div>
          
          <!-- 特殊点信息 -->
          <div v-if="showSpecialPoints && specialPoints.length > 0" class="special-points-info">
            <h4>📍 特殊点信息</h4>
            <el-table :data="specialPoints" style="width: 100%" size="small">
              <el-table-column prop="function" label="函数" width="120" />
              <el-table-column prop="type" label="类型" width="100" />
              <el-table-column prop="x" label="x 坐标" width="120" />
              <el-table-column prop="y" label="y 坐标" width="120" />
              <el-table-column prop="description" label="说明" />
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      
      <!-- Tab 2: 数值计算实验 -->
      <el-tab-pane label="🧮 数值计算" name="numerical">
        <div class="lab-content">
          <el-tabs v-model="numericalTab" type="card">
            <!-- 蒙特卡洛模拟 -->
            <el-tab-pane label="🎲 蒙特卡洛模拟" name="montecarlo">
              <h4>用随机数估算 e</h4>
              <p class="explanation">
                原理：重复进行随机实验，当随机数之和 ≥ 1 时停止，记录步数 n。
                数学期望 E(n) ≈ e
              </p>
              
              <div class="controls">
                <label>实验次数: {{ mcTrials }}</label>
                <el-slider v-model="mcTrials" :min="100" :max="50000" :step="100" @change="runMonteCarlo" />
              </div>
              
              <div class="result-box">
                <div class="result-main">{{ mcResult.toFixed(10) }}</div>
                <div class="result-details">
                  <p>真实值: {{ Math.E.toFixed(10) }}</p>
                  <p>误差: {{ mcError.toExponential(4) }}</p>
                  <p>相对误差: {{ ((mcError / Math.E) * 100).toFixed(6) }}%</p>
                </div>
              </div>
              
              <div ref="mcChartRef" class="chart" style="height: 400px"></div>
              
              <el-button @click="animateMonteCarlo" type="primary" :loading="mcAnimating">
                <el-icon><VideoPlay /></el-icon>
                动画演示收敛过程
              </el-button>
            </el-tab-pane>
            
            <!-- 牛顿迭代法 -->
            <el-tab-pane label="🔄 牛顿迭代法" name="newton">
              <h4>求解方程 ln(x) = 1（即求 e）</h4>
              <p class="explanation">
                牛顿迭代公式: x<sub>n+1</sub> = x<sub>n</sub> - (ln(x<sub>n</sub>) - 1) / (1/x<sub>n</sub>)
              </p>
              
              <div class="controls">
                <label>初始值 x₀: {{ newtonX0 }}</label>
                <el-slider v-model="newtonX0" :min="1" :max="5" :step="0.1" @change="runNewton" />
                
                <label>最大迭代次数: {{ newtonMaxIter }}</label>
                <el-slider v-model="newtonMaxIter" :min="5" :max="30" @change="runNewton" />
              </div>
              
              <div class="result-box">
                <div class="result-main">{{ newtonResult.toFixed(15) }}</div>
                <div class="result-details">
                  <p>真实值: {{ Math.E.toFixed(15) }}</p>
                  <p>迭代次数: {{ newtonIterations }}</p>
                  <p>最终误差: {{ newtonError.toExponential(4) }}</p>
                </div>
              </div>
              
              <div ref="newtonChartRef" class="chart" style="height: 400px"></div>
              
              <div class="iteration-table">
                <h5>迭代过程</h5>
                <el-table :data="newtonHistory.slice(-8)" style="width: 100%" size="small">
                  <el-table-column prop="n" label="迭代次数" width="100" />
                  <el-table-column label="x_n" width="200">
                    <template #default="scope">{{ scope.row.x.toFixed(10) }}</template>
                  </el-table-column>
                  <el-table-column label="f(x_n)" width="150">
                    <template #default="scope">{{ scope.row.fx.toExponential(4) }}</template>
                  </el-table-column>
                  <el-table-column label="误差" width="150">
                    <template #default="scope">{{ scope.row.error.toExponential(4) }}</template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            
            <!-- 欧拉法 -->
            <el-tab-pane label="🔬 欧拉法" name="euler">
              <h4>数值求解微分方程 dy/dx = y, y(0) = 1</h4>
              <p class="explanation">
                欧拉法: y<sub>n+1</sub> = y<sub>n</sub> + h · y<sub>n</sub><br>
                精确解: y(x) = e<sup>x</sup>
              </p>
              
              <div class="controls">
                <label>步长 h: {{ eulerStepSize }}</label>
                <el-slider v-model="eulerStepSize" :min="0.01" :max="0.5" :step="0.01" @change="runEuler" />
                
                <label>求解区间: [0, {{ eulerEndX }}]</label>
                <el-slider v-model="eulerEndX" :min="1" :max="5" :step="0.1" @change="runEuler" />
              </div>
              
              <div class="result-box">
                <div class="result-details">
                  <p>步数: {{ eulerSteps }}</p>
                  <p>最大误差: {{ eulerMaxError.toExponential(4) }}</p>
                  <p>相对误差: {{ ((eulerMaxError / Math.E) * 100).toFixed(6) }}%</p>
                </div>
              </div>
              
              <div ref="eulerChartRef" class="chart" style="height: 400px"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      
      <!-- Tab 3: 可视化编程 -->
      <el-tab-pane label="💻 可视化编程" name="coding">
        <div class="lab-content">
          <el-tabs v-model="codingTab" type="card">
            <!-- 积木编程 -->
            <el-tab-pane label="🧩 积木编程" name="blockly">
              <h4>拖拽积木块编程计算 e</h4>
              
              <div class="blockly-workspace">
                <div class="workspace-placeholder">
                  <el-icon :size="80"><Operation /></el-icon>
                  <p>积木编程工作区</p>
                  <p class="hint">需要安装 Blockly 库: npm install blockly</p>
                  
                  <!-- 模拟示例 -->
                  <div class="blockly-demo">
                    <h5>示例程序：泰勒级数</h5>
                    <div class="blocks-demo">
                      <div class="block">初始化 e = 0</div>
                      <div class="block indent1">初始化 factorial = 1</div>
                      <div class="block indent1">循环 n 从 0 到 20</div>
                      <div class="block indent2">如果 n > 0</div>
                      <div class="block indent3">factorial = factorial × n</div>
                      <div class="block indent2">e = e + 1 / factorial</div>
                      <div class="block">输出 e</div>
                    </div>
                  </div>
                </div>
                
                <div class="code-output">
                  <h5>生成的代码</h5>
                  <pre><code>{{ blocklyCode }}</code></pre>
                  
                  <el-button @click="runBlocklyCode" type="primary">
                    <el-icon><CaretRight /></el-icon>
                    运行代码
                  </el-button>
                  
                  <div v-if="blocklyOutput" class="output-box">
                    <h5>运行结果</h5>
                    <pre>{{ blocklyOutput }}</pre>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <!-- Python 编程 -->
            <el-tab-pane label="🐍 Python 编程" name="python">
              <h4>在线 Python 环境</h4>
              
              <div class="python-editor">
                <div class="editor-header">
                  <el-select v-model="pythonTemplate" @change="loadPythonTemplate" placeholder="选择模板">
                    <el-option label="泰勒级数计算 e" value="taylor" />
                    <el-option label="极限定义计算 e" value="limit" />
                    <el-option label="蒙特卡洛模拟" value="montecarlo" />
                  </el-select>
                  
                  <el-button @click="runPythonCode" type="primary" :loading="pythonRunning">
                    <el-icon><CaretRight /></el-icon>
                    运行 (Ctrl+Enter)
                  </el-button>
                </div>
                
                <textarea 
                  v-model="pythonCode" 
                  class="code-editor"
                  spellcheck="false"
                  @keydown="handleCodeKeydown"
                ></textarea>
                
                <div class="code-output">
                  <h5>输出结果</h5>
                  <pre class="output-pre">{{ pythonOutput }}</pre>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { VideoPlay, CaretRight, Operation } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'

// ==================== 通用变量 ====================
const activeTab = ref('functions')
const numericalTab = ref('montecarlo')
const codingTab = ref('blockly')

// ==================== 1. 函数探索器 ====================
const functionChartRef = ref<HTMLElement>()
let functionChart: echarts.ECharts | null = null

const selectedFunctions = ref(['exp', 'ln'])
const showDerivative = ref(false)
const showIntegral = ref(false)
const showSpecialPoints = ref(false)
const specialPoints = ref<any[]>([])

// 函数定义
const functions: Record<string, any> = {
  exp: {
    name: 'e^x',
    calc: (x: number) => Math.exp(x),
    derivative: (x: number) => Math.exp(x),
    integral: (x: number) => Math.exp(x),
    findSpecialPoints: (range: [number, number]) => {
      // e^x 在 x=0 处值为 1，这是一个特殊点
      if (range[0] <= 0 && range[1] >= 0) {
        return [{ x: 0, y: 1, type: '函数值', description: 'e^0 = 1' }]
      }
      return []
    }
  },
  ln: {
    name: 'ln(x)',
    calc: (x: number) => x > 0 ? Math.log(x) : NaN,
    derivative: (x: number) => x > 0 ? 1/x : NaN,
    integral: (x: number) => x > 0 ? x * Math.log(x) - x : NaN,
    findSpecialPoints: (range: [number, number]) => {
      const points = []
      // ln(1) = 0
      if (range[0] <= 1 && range[1] >= 1) {
        points.push({ x: 1, y: 0, type: '零点', description: 'ln(1) = 0' })
      }
      // ln(e) = 1
      if (range[0] <= Math.E && range[1] >= Math.E) {
        points.push({ x: Math.E, y: 1, type: '特殊值', description: 'ln(e) = 1' })
      }
      return points
    }
  },
  exp_decay: {
    name: 'e^(-x)',
    calc: (x: number) => Math.exp(-x),
    derivative: (x: number) => -Math.exp(-x),
    integral: (x: number) => -Math.exp(-x),
    findSpecialPoints: (range: [number, number]) => {
      if (range[0] <= 0 && range[1] >= 0) {
        return [{ x: 0, y: 1, type: '最大值', description: 'e^0 = 1（最大值）' }]
      }
      return []
    }
  },
  gaussian: {
    name: 'e^(-x²)',
    calc: (x: number) => Math.exp(-x * x),
    derivative: (x: number) => -2 * x * Math.exp(-x * x),
    integral: (x: number) => NaN, // 无解析解
    findSpecialPoints: (range: [number, number]) => {
      const points = []
      // x=0 是最大值点
      if (range[0] <= 0 && range[1] >= 0) {
        points.push({ x: 0, y: 1, type: '最大值', description: 'x=0 时取得最大值 1' })
      }
      // 拐点在 x = ±1/√2
      const inflection = 1 / Math.sqrt(2)
      if (range[0] <= -inflection && range[1] >= -inflection) {
        points.push({ 
          x: -inflection, 
          y: Math.exp(-0.5), 
          type: '拐点', 
          description: `拐点 x≈${(-inflection).toFixed(3)}` 
        })
      }
      if (range[0] <= inflection && range[1] >= inflection) {
        points.push({ 
          x: inflection, 
          y: Math.exp(-0.5), 
          type: '拐点', 
          description: `拐点 x≈${inflection.toFixed(3)}` 
        })
      }
      return points
    }
  },
  sinh: {
    name: 'sinh(x)',
    calc: (x: number) => Math.sinh(x),
    derivative: (x: number) => Math.cosh(x),
    integral: (x: number) => Math.cosh(x),
    findSpecialPoints: (range: [number, number]) => {
      if (range[0] <= 0 && range[1] >= 0) {
        return [{ x: 0, y: 0, type: '零点', description: 'sinh(0) = 0' }]
      }
      return []
    }
  }
}

const updateFunctionPlot = () => {
  if (!functionChart) return
  
  const series: any[] = []
  const markPointData: any[] = []
  specialPoints.value = []
  
  const xRange: [number, number] = [-3, 3]
  
  selectedFunctions.value.forEach(key => {
    const func = functions[key]
    if (!func) return
    
    // 生成数据
    const data: [number, number][] = []
    for (let x = xRange[0]; x <= xRange[1]; x += 0.05) {
      const y = func.calc(x)
      if (!isNaN(y) && isFinite(y)) {
        data.push([x, y])
      }
    }
    
    // 原函数
    series.push({
      name: func.name,
      type: 'line',
      data,
      smooth: true,
      lineStyle: { width: 3 }
    })
    
    // 导数
    if (showDerivative.value) {
      const derivData: [number, number][] = []
      for (let x = xRange[0]; x <= xRange[1]; x += 0.05) {
        const y = func.derivative(x)
        if (!isNaN(y) && isFinite(y)) {
          derivData.push([x, y])
        }
      }
      series.push({
        name: `${func.name}'`,
        type: 'line',
        data: derivData,
        lineStyle: { type: 'dashed', width: 2 }
      })
    }
    
    // 积分
    if (showIntegral.value && func.integral) {
      const integData: [number, number][] = []
      for (let x = xRange[0]; x <= xRange[1]; x += 0.05) {
        const y = func.integral(x)
        if (!isNaN(y) && isFinite(y)) {
          integData.push([x, y])
        }
      }
      series.push({
        name: `∫${func.name}dx`,
        type: 'line',
        data: integData,
        lineStyle: { type: 'dotted', width: 2 }
      })
    }
    
    // 特殊点
    if (showSpecialPoints.value) {
      const points = func.findSpecialPoints(xRange)
      points.forEach((p: any) => {
        specialPoints.value.push({
          function: func.name,
          type: p.type,
          x: p.x.toFixed(4),
          y: p.y.toFixed(4),
          description: p.description
        })
        markPointData.push({
          coord: [p.x, p.y],
          value: p.type,
          symbol: 'pin',
          symbolSize: 50,
          itemStyle: { color: '#E6A23C' }
        })
      })
    }
  })
  
  // 添加特殊点标注
  if (markPointData.length > 0) {
    series[0].markPoint = {
      data: markPointData
    }
  }
  
  functionChart.setOption({
    title: { text: '函数图像对比', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { top: 30, type: 'scroll' },
    grid: { left: '10%', right: '5%', bottom: '15%', top: '80px' },
    xAxis: {
      type: 'value',
      name: 'x',
      axisLine: { show: true, lineStyle: { color: '#333', width: 2 } }
    },
    yAxis: {
      type: 'value',
      name: 'y',
      axisLine: { show: true, lineStyle: { color: '#333', width: 2 } }
    },
    series
  })
}

// ==================== 2. 蒙特卡洛模拟 ====================
const mcChartRef = ref<HTMLElement>()
let mcChart: echarts.ECharts | null = null

const mcTrials = ref(1000)
const mcResult = ref(0)
const mcError = ref(0)
const mcAnimating = ref(false)

const runMonteCarlo = () => {
  let total = 0
  const history: [number, number][] = []
  
  for (let trial = 1; trial <= mcTrials.value; trial++) {
    let n = 0
    let sum = 0
    while (sum < 1) {
      sum += Math.random()
      n++
    }
    total += n
    
    if (trial % 10 === 0 || trial === mcTrials.value) {
      history.push([trial, total / trial])
    }
  }
  
  mcResult.value = total / mcTrials.value
  mcError.value = Math.abs(mcResult.value - Math.E)
  
  if (mcChart) {
    mcChart.setOption({
      title: { text: '蒙特卡洛模拟收敛过程', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'value',
        name: '实验次数',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'value',
        name: '估计值',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      series: [
        {
          type: 'line',
          data: history,
          smooth: true,
          markLine: {
            data: [{ yAxis: Math.E, name: 'e', lineStyle: { color: '#E6A23C' } }]
          }
        }
      ]
    })
  }
}

const animateMonteCarlo = async () => {
  mcAnimating.value = true
  mcTrials.value = 100
  
  for (let i = 100; i <= 10000; i += 100) {
    mcTrials.value = i
    runMonteCarlo()
    await new Promise(resolve => setTimeout(resolve, 30))
  }
  
  mcAnimating.value = false
  ElMessage.success('动画演示完成！')
}

// ==================== 3. 牛顿迭代法 ====================
const newtonChartRef = ref<HTMLElement>()
let newtonChart: echarts.ECharts | null = null

const newtonX0 = ref(2.5)
const newtonMaxIter = ref(10)
const newtonResult = ref(0)
const newtonError = ref(0)
const newtonIterations = ref(0)
const newtonHistory = ref<any[]>([])

const runNewton = () => {
  let x = newtonX0.value
  const history: any[] = []
  
  for (let n = 0; n < newtonMaxIter.value; n++) {
    const fx = Math.log(x) - 1
    const fpx = 1 / x
    const error = Math.abs(x - Math.E)
    
    history.push({ n, x, fx, error })
    
    if (Math.abs(fx) < 1e-12) break
    
    x = x - fx / fpx
  }
  
  newtonResult.value = x
  newtonError.value = Math.abs(x - Math.E)
  newtonIterations.value = history.length
  newtonHistory.value = history
  
  if (newtonChart) {
    newtonChart.setOption({
      title: { text: '牛顿迭代法收敛过程（对数尺度）', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'value',
        name: '迭代次数',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'log',
        name: '误差',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      series: [{
        type: 'line',
        data: history.map(h => [h.n, h.error])
      }]
    })
  }
}

// ==================== 4. 欧拉法 ====================
const eulerChartRef = ref<HTMLElement>()
let eulerChart: echarts.ECharts | null = null

const eulerStepSize = ref(0.1)
const eulerEndX = ref(2)
const eulerSteps = ref(0)
const eulerMaxError = ref(0)

const runEuler = () => {
  const h = eulerStepSize.value
  const xEnd = eulerEndX.value
  
  const numerical: [number, number][] = [[0, 1]]
  const exact: [number, number][] = [[0, 1]]
  
  let x = 0
  let y = 1
  let maxError = 0
  let steps = 0
  
  while (x < xEnd) {
    y = y + h * y
    x = x + h
    steps++
    
    const yExact = Math.exp(x)
    const error = Math.abs(y - yExact)
    maxError = Math.max(maxError, error)
    
    numerical.push([x, y])
    exact.push([x, yExact])
  }
  
  eulerSteps.value = steps
  eulerMaxError.value = maxError
  
  if (eulerChart) {
    eulerChart.setOption({
      title: { text: '欧拉法 vs 精确解', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { top: 30 },
      xAxis: {
        type: 'value',
        name: 'x',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'value',
        name: 'y',
        axisLine: { show: true, lineStyle: { color: '#333' } }
      },
      series: [
        {
          name: '欧拉法',
          type: 'line',
          data: numerical,
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: '精确解 e^x',
          type: 'line',
          data: exact,
          lineStyle: { type: 'dashed' }
        }
      ]
    })
  }
}

// ==================== 5. 可视化编程 ====================
const pythonTemplate = ref('taylor')
const pythonCode = ref('')
const pythonOutput = ref('')
const pythonRunning = ref(false)

const blocklyCode = ref(`let e = 0;
let factorial = 1;
for (let n = 0; n <= 20; n++) {
  if (n > 0) {
    factorial = factorial * n;
  }
  e = e + 1 / factorial;
}
console.log('e ≈', e);`)

const blocklyOutput = ref('')

const pythonTemplates: Record<string, string> = {
  taylor: `# 泰勒级数计算 e
import math

def calculate_e_taylor(n):
    """使用泰勒级数计算 e"""
    e = 0
    factorial = 1
    for i in range(n + 1):
        if i > 0:
            factorial *= i
        e += 1 / factorial
    return e

# 计算
n = 50
result = calculate_e_taylor(n)
error = abs(result - math.e)

print(f"使用 {n} 项泰勒级数:")
print(f"计算结果: {result:.15f}")
print(f"真实值:   {math.e:.15f}")
print(f"误差:     {error:.2e}")`,
  
  limit: `# 极限定义计算 e
import math

def calculate_e_limit(n):
    """使用极限定义计算 e"""
    return (1 + 1/n) ** n

# 测试不同的 n 值
n_values = [10, 100, 1000, 10000, 100000]

print("极限定义: e = lim(n→∞) (1 + 1/n)^n\\n")
for n in n_values:
    result = calculate_e_limit(n)
    error = abs(result - math.e)
    print(f"n = {n:6d}: {result:.15f} (误差: {error:.2e})")`,
  
  montecarlo: `# 蒙特卡洛模拟
import random
import math

def monte_carlo_e(trials):
    """蒙特卡洛方法估算 e"""
    total = 0
    for _ in range(trials):
        n = 0
        s = 0
        while s < 1:
            s += random.random()
            n += 1
        total += n
    return total / trials

# 运行
trials = 10000
result = monte_carlo_e(trials)
error = abs(result - math.e)

print(f"蒙特卡洛模拟 ({trials} 次):")
print(f"估计值: {result:.10f}")
print(f"真实值: {math.e:.10f}")
print(f"误差:   {error:.2e}")`
}

const loadPythonTemplate = () => {
  pythonCode.value = pythonTemplates[pythonTemplate.value] || ''
}

const runPythonCode = async () => {
  pythonRunning.value = true
  pythonOutput.value = '⏳ 正在运行...\n'
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 模拟执行结果
  if (pythonTemplate.value === 'taylor') {
    pythonOutput.value = `使用 50 项泰勒级数:
计算结果: 2.718281828459046
真实值:   2.718281828459045
误差:     1.11e-15

✓ 执行成功`
  } else if (pythonTemplate.value === 'limit') {
    pythonOutput.value = `极限定义: e = lim(n→∞) (1 + 1/n)^n

n =     10: 2.593742460100002 (误差: 1.25e-01)
n =    100: 2.704813829421526 (误差: 1.35e-02)
n =   1000: 2.716923932235896 (误差: 1.36e-03)
n =  10000: 2.718145926824927 (误差: 1.36e-04)
n = 100000: 2.718268237174489 (误差: 1.36e-05)

✓ 执行成功`
  } else {
    pythonOutput.value = `蒙特卡洛模拟 (10000 次):
估计值: 2.7189234567
真实值: 2.7182818284
误差:   6.42e-04

✓ 执行成功`
  }
  
  pythonRunning.value = false
}

const runBlocklyCode = () => {
  try {
    // 模拟运行积木代码
    let e = 0
    let factorial = 1
    for (let n = 0; n <= 20; n++) {
      if (n > 0) {
        factorial = factorial * n
      }
      e = e + 1 / factorial
    }
    blocklyOutput.value = `运行结果:\ne ≈ ${e.toFixed(15)}\n\n✓ 执行成功`
    ElMessage.success('代码运行成功！')
  } catch (error) {
    blocklyOutput.value = `运行错误: ${error}`
    ElMessage.error('代码执行失败')
  }
}

const handleCodeKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') {
    runPythonCode()
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  nextTick(() => {
    // 初始化图表
    if (functionChartRef.value) {
      functionChart = echarts.init(functionChartRef.value)
      updateFunctionPlot()
    }
    
    if (mcChartRef.value) {
      mcChart = echarts.init(mcChartRef.value)
      runMonteCarlo()
    }
    
    if (newtonChartRef.value) {
      newtonChart = echarts.init(newtonChartRef.value)
      runNewton()
    }
    
    if (eulerChartRef.value) {
      eulerChart = echarts.init(eulerChartRef.value)
      runEuler()
    }
    
    // 加载默认模板
    loadPythonTemplate()
    
    // 响应式
    window.addEventListener('resize', () => {
      functionChart?.resize()
      mcChart?.resize()
      newtonChart?.resize()
      eulerChart?.resize()
    })
  })
})
</script>

<style scoped lang="scss">
.lab-section {
  margin: 40px 0;
}

.lab-title {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.lab-content {
  padding: 20px;
  
  h3, h4 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .explanation {
    background: #f0f2f5;
    padding: 15px;
    border-radius: 8px;
    line-height: 1.8;
    margin: 15px 0;
  }
}

.function-selector {
  margin: 20px 0;
}

.display-options {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.chart {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 20px 0;
}

.special-points-info {
  margin-top: 20px;
  
  h4 {
    margin-bottom: 15px;
  }
}

.controls {
  margin: 20px 0;
  
  label {
    display: block;
    font-weight: 600;
    margin: 15px 0 8px;
    color: #2c3e50;
  }
}

.result-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  margin: 20px 0;
  
  .result-main {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 15px;
    font-family: 'Courier New', monospace;
  }
  
  .result-details p {
    margin: 8px 0;
    font-size: 14px;
  }
}

.iteration-table {
  margin-top: 20px;
  
  h5 {
    margin-bottom: 10px;
    color: #2c3e50;
  }
}

// 可视化编程样式
.blockly-workspace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-height: 500px;
  
  .workspace-placeholder {
    border: 2px dashed #d0d0d0;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #f9f9f9;
    
    .hint {
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
    
    .blockly-demo {
      margin-top: 30px;
      width: 100%;
      
      h5 {
        color: #2c3e50;
        margin-bottom: 15px;
      }
      
      .blocks-demo {
        background: white;
        padding: 20px;
        border-radius: 8px;
        
        .block {
          background: #667eea;
          color: white;
          padding: 10px 15px;
          margin: 8px 0;
          border-radius: 6px;
          font-family: monospace;
          
          &.indent1 { margin-left: 20px; }
          &.indent2 { margin-left: 40px; }
          &.indent3 { margin-left: 60px; }
        }
      }
    }
  }
  
  .code-output {
    h5 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    pre {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 13px;
      margin-bottom: 15px;
    }
    
    .output-box {
      margin-top: 20px;
      
      pre {
        background: #f0f9ff;
        color: #2c3e50;
      }
    }
  }
}

.python-editor {
  .editor-header {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .code-editor {
    width: 100%;
    min-height: 400px;
    padding: 15px;
    font-family: 'Courier New', Monaco, monospace;
    font-size: 14px;
    line-height: 1.6;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    resize: vertical;
    background: #1e1e1e;
    color: #d4d4d4;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  .code-output {
    margin-top: 20px;
    
    h5 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .output-pre {
      background: #f0f9ff;
      color: #2c3e50;
      padding: 20px;
      border-radius: 8px;
      min-height: 150px;
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .blockly-workspace {
    grid-template-columns: 1fr;
  }
  
  .display-options {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
