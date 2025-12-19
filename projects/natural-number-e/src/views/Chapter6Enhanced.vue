<template>
  <div class="chapter-container chapter6-enhanced">
    <!-- 章节头部 -->
    <header class="chapter-header">
      <div class="header-content">
        <router-link to="/" class="back-link">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
        <h1 class="chapter-title">
          <span class="chapter-number">第六章</span>
          <span class="chapter-name">探索实验室 Pro</span>
        </h1>
        <p class="chapter-subtitle">深度实验，可视化编程，全方位探索 e 的奥秘</p>
      </div>
    </header>

    <!-- 吉祥物引导 -->
    <MascotCat 
      :message="mascotMessage"
      position="right"
    />

    <!-- 实验室导航 -->
    <nav class="lab-navigation">
      <el-button 
        v-for="section in labSections" 
        :key="section.id"
        :type="activeSection === section.id ? 'primary' : ''"
        @click="scrollToSection(section.id)"
      >
        {{ section.icon }} {{ section.name }}
      </el-button>
    </nav>

    <!-- 1. 增强版函数探索器 -->
    <section class="story-section" id="function-explorer">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><TrendCharts /></el-icon>
          函数探索器 Pro
        </h2>
        <el-tag type="success">支持多函数对比 + 导数积分可视化</el-tag>
      </div>

      <div class="content-box">
        <div class="explorer-intro">
          <h3>🎯 探索含有 e 的函数家族</h3>
          <p>多选函数进行对比，实时观察导数、积分的变化规律</p>
        </div>

        <!-- 多函数选择器 -->
        <div class="function-multi-selector">
          <el-checkbox-group v-model="selectedFunctions" @change="updateFunctionPlot">
            <el-checkbox label="exp" border>
              <span v-html="renderFormula('e^x')"></span>
            </el-checkbox>
            <el-checkbox label="ln" border>
              <span v-html="renderFormula('\\ln(x)')"></span>
            </el-checkbox>
            <el-checkbox label="exp_decay" border>
              <span v-html="renderFormula('e^{-x}')"></span>
            </el-checkbox>
            <el-checkbox label="gaussian" border>
              <span v-html="renderFormula('e^{-x^2}')"></span>
            </el-checkbox>
            <el-checkbox label="complex" border>
              <span v-html="renderFormula('e^x \\cdot \\sin(x)')"></span>
            </el-checkbox>
            <el-checkbox label="sinh" border>
              <span v-html="renderFormula('\\sinh(x)')"></span>
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <!-- 显示选项 -->
        <div class="display-options">
          <el-switch v-model="showDerivative" @change="updateFunctionPlot" active-text="显示导数" />
          <el-switch v-model="showIntegral" @change="updateFunctionPlot" active-text="显示积分" />
          <el-switch v-model="showTangent" active-text="显示切线" />
          <el-switch v-model="showSpecialPoints" @change="updateFunctionPlot" active-text="标注特殊点" />
        </div>

        <!-- 自定义函数输入 -->
        <div class="custom-function-area">
          <el-input 
            v-model="customExpression" 
            placeholder="自定义函数，例如: e^x * cos(x)"
            @blur="addCustomFunction"
          >
            <template #prepend>f(x) =</template>
            <template #append>
              <el-button @click="addCustomFunction" type="primary">添加</el-button>
            </template>
          </el-input>
        </div>

        <!-- 控制面板 -->
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
          <div class="control-item" v-if="showTangent">
            <label>切线位置 x₀: {{ tangentX }}</label>
            <el-slider 
              v-model="tangentX" 
              :min="xRange[0]" 
              :max="xRange[1]"
              :step="0.1"
              @change="updateFunctionPlot"
            />
          </div>
        </div>

        <!-- 增强版图表 -->
        <div class="chart-container enhanced">
          <div ref="functionChart" class="function-chart"></div>
          <div class="chart-toolbar">
            <el-button @click="resetView" size="small">
              <el-icon><RefreshRight /></el-icon>
              重置视图
            </el-button>
            <el-button @click="downloadChart" size="small">
              <el-icon><Download /></el-icon>
              下载图像
            </el-button>
          </div>
        </div>

        <!-- 函数性质分析 -->
        <div class="function-analysis">
          <h4>📊 当前选中函数性质分析</h4>
          <el-tabs v-model="analysisTab">
            <el-tab-pane 
              v-for="func in selectedFunctions" 
              :key="func"
              :label="getFunctionLabel(func)"
              :name="func"
            >
              <div class="analysis-content">
                <div class="properties-grid">
                  <div class="property-card">
                    <h5>📐 定义域</h5>
                    <p>{{ getFunctionProperties(func).domain }}</p>
                  </div>
                  <div class="property-card">
                    <h5>📈 值域</h5>
                    <p>{{ getFunctionProperties(func).range }}</p>
                  </div>
                  <div class="property-card">
                    <h5>↗️ 单调性</h5>
                    <p>{{ getFunctionProperties(func).monotonicity }}</p>
                  </div>
                  <div class="property-card">
                    <h5>⌒ 凹凸性</h5>
                    <p>{{ getFunctionProperties(func).concavity }}</p>
                  </div>
                  <div class="property-card">
                    <h5>🎯 导函数</h5>
                    <div v-html="renderFormula(getFunctionProperties(func).derivative)"></div>
                  </div>
                  <div class="property-card">
                    <h5>∫ 积分</h5>
                    <div v-html="renderFormula(getFunctionProperties(func).integral)"></div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <!-- 2. 数值实验台增强版 -->
    <section class="story-section" id="numerical-lab">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Operation /></el-icon>
          数值计算实验台 Pro
        </h2>
        <el-tag type="warning">新增蒙特卡洛模拟 + 牛顿迭代法</el-tag>
      </div>

      <div class="content-box">
        <el-tabs v-model="numericalTab">
          <!-- 原有的级数求和 -->
          <el-tab-pane label="级数求和" name="series">
            <div class="experiment-content">
              <h4>计算 e 的泰勒级数</h4>
              <div class="formula-display" v-html="renderFormula('e = \\sum_{n=0}^{N} \\frac{1}{n!}')"></div>
              
              <div class="experiment-controls">
                <label>计算项数 N: {{ seriesN }}</label>
                <el-slider v-model="seriesN" :min="1" :max="100" @change="calculateSeries" />
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

              <div class="convergence-chart-container">
                <div ref="seriesChart" class="convergence-chart"></div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 新增：蒙特卡洛模拟 -->
          <el-tab-pane label="🎲 蒙特卡洛模拟" name="montecarlo">
            <div class="experiment-content">
              <h4>用随机数估算 e</h4>
              <div class="method-explanation">
                <p>原理：重复随机实验，当 Σ random() ≥ 1 时停止，记录步数 n，则 E(n) ≈ e</p>
              </div>
              
              <div class="experiment-controls">
                <label>实验次数: {{ mcTrials }}</label>
                <el-slider v-model="mcTrials" :min="100" :max="100000" :step="100" @change="runMonteCarlo" />
              </div>

              <div class="result-display">
                <h5>模拟结果</h5>
                <div class="result-value">{{ mcResult.toFixed(10) }}</div>
                <div class="result-comparison">
                  <p>真实值: {{ Math.E.toFixed(10) }}</p>
                  <p>误差: {{ mcError.toExponential(4) }}</p>
                  <p>已运行 {{ mcTrials }} 次实验</p>
                </div>
              </div>

              <div class="mc-chart-container">
                <div ref="mcChart" class="mc-convergence-chart"></div>
              </div>

              <el-button @click="animateMonteCarlo" type="primary" :loading="mcAnimating">
                <el-icon><VideoPlay /></el-icon>
                动画演示收敛过程
              </el-button>
            </div>
          </el-tab-pane>

          <!-- 新增：牛顿迭代法 -->
          <el-tab-pane label="🔄 牛顿迭代法" name="newton">
            <div class="experiment-content">
              <h4>求解方程 ln(x) = 1 （即求 e）</h4>
              <div class="method-explanation">
                <p>牛顿迭代公式: <span v-html="renderFormula('x_{n+1} = x_n - \\frac{\\ln(x_n) - 1}{1/x_n}')"></span></p>
              </div>
              
              <div class="experiment-controls">
                <label>初始值 x₀: {{ newtonX0 }}</label>
                <el-slider v-model="newtonX0" :min="1" :max="5" :step="0.1" @change="runNewtonMethod" />
                
                <label>最大迭代次数: {{ newtonMaxIter }}</label>
                <el-slider v-model="newtonMaxIter" :min="5" :max="50" @change="runNewtonMethod" />
              </div>

              <div class="result-display">
                <h5>迭代结果</h5>
                <div class="result-value">{{ newtonResult.toFixed(15) }}</div>
                <div class="result-comparison">
                  <p>真实值: {{ Math.E.toFixed(15) }}</p>
                  <p>收敛速度: {{ newtonIterations }} 次迭代</p>
                  <p>最终误差: {{ newtonError.toExponential(4) }}</p>
                </div>
              </div>

              <div class="newton-table">
                <h5>迭代过程</h5>
                <table>
                  <thead>
                    <tr>
                      <th>迭代次数 n</th>
                      <th>xₙ</th>
                      <th>ln(xₙ) - 1</th>
                      <th>误差</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in newtonHistory" :key="row.n">
                      <td>{{ row.n }}</td>
                      <td>{{ row.x.toFixed(10) }}</td>
                      <td>{{ row.fx.toExponential(4) }}</td>
                      <td>{{ row.error.toExponential(4) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="newton-chart-container">
                <div ref="newtonChart" class="newton-chart"></div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 原有的极限计算 -->
          <el-tab-pane label="极限计算" name="limit">
            <div class="experiment-content">
              <h4>验证 e 的极限定义</h4>
              <div class="formula-display" v-html="renderFormula('\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e')"></div>
              
              <div class="experiment-controls">
                <label>n 值: {{ limitN }}</label>
                <el-slider v-model="limitN" :min="10" :max="100000" :step="10" @change="calculateLimit" />
              </div>

              <div class="result-display">
                <h5>计算结果</h5>
                <div class="result-value">{{ limitResult.toFixed(15) }}</div>
                <div class="result-comparison">
                  <p>真实值: {{ Math.E.toFixed(15) }}</p>
                  <p>误差: {{ limitError.toExponential(4) }}</p>
                </div>
              </div>

              <div class="limit-chart-container">
                <div ref="limitChart" class="limit-chart"></div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 新增：欧拉法解微分方程 -->
          <el-tab-pane label="🔬 欧拉法" name="euler">
            <div class="experiment-content">
              <h4>数值求解微分方程 dy/dx = y, y(0) = 1</h4>
              <div class="method-explanation">
                <p>欧拉法迭代: <span v-html="renderFormula('y_{n+1} = y_n + h \\cdot y_n')"></span></p>
                <p>精确解: <span v-html="renderFormula('y(x) = e^x')"></span></p>
              </div>
              
              <div class="experiment-controls">
                <label>步长 h: {{ eulerStepSize }}</label>
                <el-slider v-model="eulerStepSize" :min="0.01" :max="0.5" :step="0.01" @change="runEulerMethod" />
                
                <label>求解区间: [0, {{ eulerEndX }}]</label>
                <el-slider v-model="eulerEndX" :min="1" :max="5" :step="0.1" @change="runEulerMethod" />
              </div>

              <div class="euler-chart-container">
                <div ref="eulerChart" class="euler-chart"></div>
              </div>

              <div class="result-display">
                <h5>数值解 vs 精确解</h5>
                <p>步数: {{ eulerSteps }}</p>
                <p>最大误差: {{ eulerMaxError.toExponential(4) }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- 3. 可视化编程实验室 -->
    <section class="story-section" id="visual-coding">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Cpu /></el-icon>
          可视化编程实验
        </h2>
        <el-tag type="danger">拖拽编程 + Python 代码编辑器</el-tag>
      </div>

      <div class="content-box">
        <el-tabs v-model="codingTab">
          <!-- Blockly 可视化编程 -->
          <el-tab-pane label="🧩 拖拽编程" name="blockly">
            <div class="coding-intro">
              <h3>用积木块编程计算 e</h3>
              <p>拖拽左侧积木块到工作区，搭建算法逻辑</p>
            </div>

            <div class="blockly-container">
              <div class="blockly-workspace-wrapper">
                <div ref="blocklyDiv" class="blockly-workspace"></div>
              </div>
              <div class="blockly-output">
                <div class="output-header">
                  <h4>📟 运行结果</h4>
                  <el-button @click="runBlocklyCode" type="primary">
                    <el-icon><CaretRight /></el-icon>
                    运行代码
                  </el-button>
                </div>
                <div class="output-content">
                  <pre>{{ blocklyOutput }}</pre>
                </div>
                <div class="generated-code">
                  <h5>生成的 JavaScript 代码：</h5>
                  <pre><code>{{ blocklyGeneratedCode }}</code></pre>
                </div>
              </div>
            </div>

            <div class="blockly-examples">
              <h4>📚 示例程序</h4>
              <el-button @click="loadBlocklyExample('taylor')" size="small">泰勒级数</el-button>
              <el-button @click="loadBlocklyExample('limit')" size="small">极限定义</el-button>
              <el-button @click="loadBlocklyExample('factorial')" size="small">阶乘计算</el-button>
            </div>
          </el-tab-pane>

          <!-- Monaco Python 编辑器 -->
          <el-tab-pane label="🐍 Python 编程" name="python">
            <div class="coding-intro">
              <h3>在线 Python 环境</h3>
              <p>编写 Python 代码计算 e，实时运行</p>
            </div>

            <div class="python-editor-container">
              <div class="editor-wrapper">
                <div ref="monacoEditor" class="monaco-editor"></div>
              </div>
              <div class="editor-toolbar">
                <el-button @click="runPythonCode" type="primary" :loading="pythonRunning">
                  <el-icon><CaretRight /></el-icon>
                  运行 (Ctrl+Enter)
                </el-button>
                <el-button @click="clearPythonOutput" size="small">
                  <el-icon><Delete /></el-icon>
                  清空输出
                </el-button>
                <el-button @click="loadPythonTemplate" size="small">
                  <el-icon><Document /></el-icon>
                  加载模板
                </el-button>
              </div>
              <div class="python-output">
                <h4>📤 输出结果</h4>
                <pre class="output-pre">{{ pythonOutput }}</pre>
              </div>
            </div>

            <div class="python-templates">
              <h4>📚 代码模板</h4>
              <el-select v-model="selectedTemplate" @change="loadPythonTemplate" placeholder="选择模板">
                <el-option label="泰勒级数计算 e" value="taylor" />
                <el-option label="极限定义计算 e" value="limit" />
                <el-option label="连分数计算 e" value="continued_fraction" />
                <el-option label="蒙特卡洛模拟" value="montecarlo" />
                <el-option label="绘制 e^x 曲线" value="plot" />
              </el-select>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- 4. 增强版数学游戏 -->
    <section class="story-section" id="math-games">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Trophy /></el-icon>
          数学游戏挑战 Pro
        </h2>
        <el-tag type="success">新增时间挑战 + 排行榜</el-tag>
      </div>

      <div class="content-box">
        <div class="games-grid">
          <!-- 游戏1: 时间挑战模式 -->
          <div class="game-card featured">
            <div class="game-header">
              <h3>⏱️ 60秒极限挑战</h3>
              <el-tag type="danger">新游戏</el-tag>
            </div>
            <p class="game-desc">60秒内答对尽可能多的题目！</p>
            <div class="game-content">
              <div v-if="!timeChallenge.started" class="challenge-start">
                <div class="high-score">
                  <p>🏆 最高纪录: {{ timeChallenge.highScore }} 题</p>
                </div>
                <el-button @click="startTimeChallenge" type="danger" size="large">
                  <el-icon><Timer /></el-icon>
                  开始挑战
                </el-button>
              </div>
              <div v-else class="challenge-active">
                <div class="challenge-timer">
                  <el-progress 
                    type="circle" 
                    :percentage="timeChallenge.timeLeft / 60 * 100"
                    :color="timeChallenge.timeLeft <= 10 ? '#F56C6C' : '#67C23A'"
                  >
                    <span class="timer-text">{{ timeChallenge.timeLeft }}s</span>
                  </el-progress>
                </div>
                <div class="challenge-score">
                  <h4>已答对: {{ timeChallenge.score }} 题</h4>
                </div>
                <div v-if="timeChallenge.currentQuestion" class="challenge-question">
                  <h4>{{ timeChallenge.currentQuestion.question }}</h4>
                  <div class="challenge-options">
                    <el-button 
                      v-for="(option, index) in timeChallenge.currentQuestion.options" 
                      :key="index"
                      @click="answerTimeChallenge(index)"
                      size="large"
                      class="challenge-option-btn"
                    >
                      {{ option }}
                    </el-button>
                  </div>
                </div>
                <div v-else class="challenge-result">
                  <h3>⏰ 时间到！</h3>
                  <p class="final-score">最终得分: {{ timeChallenge.score }} 题</p>
                  <p v-if="timeChallenge.score > timeChallenge.highScore" class="new-record">
                    🎉 恭喜！新纪录！
                  </p>
                  <el-button @click="startTimeChallenge" type="primary">再来一次</el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 游戏2: e的小数位记忆 -->
          <div class="game-card">
            <div class="game-header">
              <h3>🎯 e 的小数位记忆</h3>
              <el-tag>记忆力</el-tag>
            </div>
            <p class="game-desc">记住 e 的前 50 位小数</p>
            <div class="game-content">
              <div class="e-digits-display">
                <span class="digit-label">e = 2.</span>
                <span v-for="(digit, index) in eDigitsArray.slice(0, 50)" :key="index" class="e-digit">
                  {{ showDigits || index < revealedDigits ? digit : '?' }}
                </span>
              </div>
              <div class="game-controls">
                <el-button @click="revealMoreDigits" size="small">显示更多</el-button>
                <el-button @click="showDigits = !showDigits" size="small" type="primary">
                  {{ showDigits ? '隐藏' : '显示答案' }}
                </el-button>
                <el-button @click="startMemoryTest" size="small" type="success">
                  <el-icon><Edit /></el-icon>
                  开始测试
                </el-button>
              </div>
              <div v-if="memoryTest.active" class="memory-test">
                <el-input 
                  v-model="memoryTest.input" 
                  placeholder="输入你记忆的数字"
                  @input="checkMemoryInput"
                />
                <p class="test-feedback" :class="memoryTest.correct ? 'correct' : 'wrong'">
                  已正确: {{ memoryTest.correctCount }} 位
                </p>
              </div>
            </div>
          </div>

          <!-- 游戏3: 公式配对 -->
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
        </div>

        <!-- 排行榜 -->
        <div class="leaderboard">
          <h3>🏆 本地排行榜</h3>
          <el-table :data="leaderboardData" style="width: 100%" max-height="400">
            <el-table-column prop="rank" label="排名" width="80" />
            <el-table-column prop="name" label="玩家" />
            <el-table-column prop="score" label="得分" width="100" />
            <el-table-column prop="game" label="游戏" />
            <el-table-column prop="date" label="日期" width="180" />
          </el-table>
        </div>
      </div>
    </section>

    <!-- 5. 增强版知识检测 -->
    <section class="story-section" id="knowledge-test">
      <div class="section-header">
        <h2>
          <el-icon class="section-icon"><Medal /></el-icon>
          学习成果检测 Pro
        </h2>
        <el-tag type="warning">新增错题本 + 学习曲线</el-tag>
      </div>

      <div class="content-box">
        <!-- 学习曲线图 -->
        <div class="learning-curve">
          <h3>📈 你的学习曲线</h3>
          <div ref="learningCurveChart" class="learning-curve-chart"></div>
        </div>

        <!-- 知识掌握度 -->
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

        <!-- 错题本 -->
        <div class="wrong-questions">
          <h3>📕 错题本</h3>
          <el-empty v-if="wrongQuestions.length === 0" description="还没有错题，继续加油！" />
          <div v-else class="wrong-list">
            <div v-for="(q, index) in wrongQuestions" :key="index" class="wrong-item">
              <div class="wrong-header">
                <span class="wrong-index">{{ index + 1 }}.</span>
                <el-tag type="danger" size="small">错误 {{ q.wrongCount }} 次</el-tag>
              </div>
              <div class="wrong-question">{{ q.question }}</div>
              <div class="wrong-analysis">
                <p><strong>你的答案：</strong>{{ q.yourAnswer }}</p>
                <p><strong>正确答案：</strong>{{ q.correctAnswer }}</p>
                <p><strong>解析：</strong>{{ q.explanation }}</p>
              </div>
              <el-button @click="reviewWrongQuestion(q)" size="small" type="primary">
                复习相关知识点
              </el-button>
            </div>
          </div>
        </div>

        <!-- 总体进度 -->
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

        <!-- 成就系统 -->
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
              <div v-if="achievement.unlocked" class="unlock-date">
                解锁时间: {{ achievement.unlockDate }}
              </div>
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
      <el-button @click="exportLearningReport" size="large" type="warning">
        <el-icon><Document /></el-icon>
        导出学习报告
      </el-button>
      <el-button @click="$router.push('/')" size="large" type="success">
        <el-icon><CircleCheck /></el-icon>
        完成学习
      </el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { 
  Back, TrendCharts, Operation, Cpu, Trophy, Medal, 
  VideoPlay, Refresh, ArrowLeft, CircleCheck, RefreshRight, 
  Download, CaretRight, Delete, Document, Timer, Edit 
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MascotCat from '@/components/common/MascotCat.vue'
import { ElMessage } from 'element-plus'

// ==================== 通用工具 ====================
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

// 吉祥物消息
const mascotMessage = ref('欢迎来到探索实验室 Pro！🚀 体验更强大的功能和更深度的实验！')

// 实验室导航
const activeSection = ref('function-explorer')
const labSections = [
  { id: 'function-explorer', name: '函数探索器', icon: '📊' },
  { id: 'numerical-lab', name: '数值实验台', icon: '🔬' },
  { id: 'visual-coding', name: '可视化编程', icon: '💻' },
  { id: 'math-games', name: '数学游戏', icon: '🎮' },
  { id: 'knowledge-test', name: '知识检测', icon: '📝' }
]

const scrollToSection = (id: string) => {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// ==================== 1. 增强版函数探索器 ====================
const selectedFunctions = ref<string[]>(['exp', 'ln'])
const showDerivative = ref(false)
const showIntegral = ref(false)
const showTangent = ref(false)
const showSpecialPoints = ref(false)
const customExpression = ref('')
const xRange = ref([-5, 5])
const tangentX = ref(1)
const analysisTab = ref('exp')

const functionChart = ref<HTMLElement>()
let functionChartInstance: echarts.ECharts | null = null

// 函数定义
const functionDefinitions: Record<string, any> = {
  exp: {
    label: 'e^x',
    latex: 'e^x',
    calc: (x: number) => Math.exp(x),
    derivative: 'e^x',
    derivativeCalc: (x: number) => Math.exp(x),
    integral: 'e^x + C',
    integralCalc: (x: number) => Math.exp(x),
    domain: '(-∞, +∞)',
    range: '(0, +∞)',
    monotonicity: '在整个定义域上单调递增',
    concavity: '在整个定义域上凹'
  },
  ln: {
    label: 'ln(x)',
    latex: '\\ln(x)',
    calc: (x: number) => x > 0 ? Math.log(x) : NaN,
    derivative: '1/x',
    derivativeCalc: (x: number) => x > 0 ? 1/x : NaN,
    integral: 'x\\ln(x) - x + C',
    integralCalc: (x: number) => x > 0 ? x * Math.log(x) - x : NaN,
    domain: '(0, +∞)',
    range: '(-∞, +∞)',
    monotonicity: '在 (0, +∞) 上单调递增',
    concavity: '在 (0, +∞) 上凸'
  },
  exp_decay: {
    label: 'e^(-x)',
    latex: 'e^{-x}',
    calc: (x: number) => Math.exp(-x),
    derivative: '-e^{-x}',
    derivativeCalc: (x: number) => -Math.exp(-x),
    integral: '-e^{-x} + C',
    integralCalc: (x: number) => -Math.exp(-x),
    domain: '(-∞, +∞)',
    range: '(0, +∞)',
    monotonicity: '在整个定义域上单调递减',
    concavity: '在整个定义域上凹'
  },
  gaussian: {
    label: 'e^(-x²)',
    latex: 'e^{-x^2}',
    calc: (x: number) => Math.exp(-x * x),
    derivative: '-2xe^{-x^2}',
    derivativeCalc: (x: number) => -2 * x * Math.exp(-x * x),
    integral: '\\text{erf}(x) \\text{ (无初等函数)}',
    integralCalc: (x: number) => NaN, // 误差函数，无解析解
    domain: '(-∞, +∞)',
    range: '(0, 1]',
    monotonicity: 'x < 0 时递增，x > 0 时递减',
    concavity: '在 x = ±1/√2 处有拐点'
  },
  complex: {
    label: 'e^x·sin(x)',
    latex: 'e^x \\cdot \\sin(x)',
    calc: (x: number) => Math.exp(x) * Math.sin(x),
    derivative: 'e^x(\\sin(x) + \\cos(x))',
    derivativeCalc: (x: number) => Math.exp(x) * (Math.sin(x) + Math.cos(x)),
    integral: '\\frac{e^x}{2}(\\sin(x) - \\cos(x)) + C',
    integralCalc: (x: number) => Math.exp(x) / 2 * (Math.sin(x) - Math.cos(x)),
    domain: '(-∞, +∞)',
    range: '(-∞, +∞)',
    monotonicity: '在多个区间上交替递增递减',
    concavity: '凹凸性复杂，有多个拐点'
  },
  sinh: {
    label: 'sinh(x)',
    latex: '\\sinh(x) = \\frac{e^x - e^{-x}}{2}',
    calc: (x: number) => Math.sinh(x),
    derivative: '\\cosh(x)',
    derivativeCalc: (x: number) => Math.cosh(x),
    integral: '\\cosh(x) + C',
    integralCalc: (x: number) => Math.cosh(x),
    domain: '(-∞, +∞)',
    range: '(-∞, +∞)',
    monotonicity: '在整个定义域上单调递增',
    concavity: 'x > 0 凹，x < 0 凸'
  }
}

const getFunctionLabel = (key: string) => functionDefinitions[key]?.label || key
const getFunctionProperties = (key: string) => functionDefinitions[key] || {}

// 生成数据点
const generatePlotData = (funcKey: string, range: number[]) => {
  const func = functionDefinitions[funcKey]
  if (!func) return []
  
  const data: [number, number][] = []
  const step = (range[1] - range[0]) / 200
  
  for (let x = range[0]; x <= range[1]; x += step) {
    const y = func.calc(x)
    if (!isNaN(y) && isFinite(y)) {
      data.push([x, y])
    }
  }
  return data
}

// 更新函数图表
const updateFunctionPlot = () => {
  if (!functionChartInstance) return
  
  const series: any[] = []
  
  // 原函数
  selectedFunctions.value.forEach(funcKey => {
    const func = functionDefinitions[funcKey]
    if (func) {
      series.push({
        name: func.label,
        type: 'line',
        data: generatePlotData(funcKey, xRange.value),
        smooth: true,
        lineStyle: { width: 3 }
      })
      
      // 导数
      if (showDerivative.value && func.derivativeCalc) {
        const derivData: [number, number][] = []
        const step = (xRange.value[1] - xRange.value[0]) / 200
        for (let x = xRange.value[0]; x <= xRange.value[1]; x += step) {
          const y = func.derivativeCalc(x)
          if (!isNaN(y) && isFinite(y)) {
            derivData.push([x, y])
          }
        }
        series.push({
          name: `${func.label}'`,
          type: 'line',
          data: derivData,
          lineStyle: { type: 'dashed', width: 2 },
          itemStyle: { opacity: 0.7 }
        })
      }
      
      // 积分
      if (showIntegral.value && func.integralCalc) {
        const integData: [number, number][] = []
        const step = (xRange.value[1] - xRange.value[0]) / 200
        for (let x = xRange.value[0]; x <= xRange.value[1]; x += step) {
          const y = func.integralCalc(x)
          if (!isNaN(y) && isFinite(y)) {
            integData.push([x, y])
          }
        }
        series.push({
          name: `∫${func.label}dx`,
          type: 'line',
          data: integData,
          lineStyle: { type: 'dotted', width: 2 },
          itemStyle: { opacity: 0.7 }
        })
      }
    }
  })
  
  // 切线
  if (showTangent.value && selectedFunctions.value.length > 0) {
    const funcKey = selectedFunctions.value[0]
    const func = functionDefinitions[funcKey]
    if (func) {
      const x0 = tangentX.value
      const y0 = func.calc(x0)
      const k = func.derivativeCalc(x0)
      
      const tangentData: [number, number][] = [
        [xRange.value[0], k * (xRange.value[0] - x0) + y0],
        [xRange.value[1], k * (xRange.value[1] - x0) + y0]
      ]
      
      series.push({
        name: '切线',
        type: 'line',
        data: tangentData,
        lineStyle: { color: '#E6A23C', width: 2 },
        markPoint: {
          data: [{ coord: [x0, y0], symbol: 'circle', symbolSize: 10 }]
        }
      })
    }
  }
  
  functionChartInstance.setOption({
    title: { text: '函数图像对比', left: 'center' },
    tooltip: { 
      trigger: 'axis',
      formatter: (params: any) => {
        let result = `x = ${params[0].data[0].toFixed(3)}<br/>`
        params.forEach((p: any) => {
          result += `${p.seriesName} = ${p.data[1].toFixed(3)}<br/>`
        })
        return result
      }
    },
    legend: { top: 30, type: 'scroll' },
    grid: { left: '10%', right: '5%', bottom: '15%', top: '15%' },
    xAxis: { 
      type: 'value', 
      name: 'x',
      min: xRange.value[0],
      max: xRange.value[1],
      axisLine: { lineStyle: { color: '#333' } }
    },
    yAxis: { 
      type: 'value', 
      name: 'y',
      axisLine: { 
        show: true,  // 显示纵坐标轴
        lineStyle: { color: '#333' } 
      },
      splitLine: { show: true }
    },
    series,
    dataZoom: [
      { type: 'inside' },
      { type: 'slider', bottom: 0 }
    ]
  })
}

const resetView = () => {
  xRange.value = [-5, 5]
  tangentX.value = 1
  updateFunctionPlot()
}

const downloadChart = () => {
  if (functionChartInstance) {
    const url = functionChartInstance.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    const a = document.createElement('a')
    a.href = url
    a.download = 'function_plot.png'
    a.click()
    ElMessage.success('图表已下载')
  }
}

const addCustomFunction = () => {
  // TODO: 解析自定义表达式，需要 math.js
  ElMessage.info('自定义函数功能开发中...')
}

// ==================== 2. 数值实验台增强 ====================
const numericalTab = ref('series')

// 级数求和
const seriesN = ref(20)
const seriesResult = ref(0)
const seriesError = ref(0)
const seriesChart = ref<HTMLElement>()
let seriesChartInstance: echarts.ECharts | null = null

const calculateSeries = () => {
  let sum = 0
  let factorial = 1
  const data: [number, number][] = []
  
  for (let n = 0; n <= seriesN.value; n++) {
    if (n > 0) factorial *= n
    sum += 1 / factorial
    data.push([n, sum])
  }
  
  seriesResult.value = sum
  seriesError.value = Math.abs(sum - Math.E)
  
  if (seriesChartInstance) {
    seriesChartInstance.setOption({
      title: { text: '泰勒级数收敛过程', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'value', 
        name: 'n (项数)',
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: { 
        type: 'value', 
        name: 'S_n (累加和)',
        axisLine: { 
          show: true,
          lineStyle: { color: '#333' } 
        }
      },
      series: [{
        type: 'line',
        data,
        smooth: true,
        markLine: {
          data: [{ yAxis: Math.E, name: 'e' }]
        }
      }]
    })
  }
}

// 蒙特卡洛模拟
const mcTrials = ref(1000)
const mcResult = ref(0)
const mcError = ref(0)
const mcAnimating = ref(false)
const mcChart = ref<HTMLElement>()
let mcChartInstance: echarts.ECharts | null = null

const runMonteCarlo = () => {
  let sum = 0
  const data: [number, number][] = []
  
  for (let trial = 1; trial <= mcTrials.value; trial++) {
    let n = 0
    let s = 0
    while (s < 1) {
      s += Math.random()
      n++
    }
    sum += n
    
    if (trial % 100 === 0) {
      const avg = sum / trial
      data.push([trial, avg])
    }
  }
  
  mcResult.value = sum / mcTrials.value
  mcError.value = Math.abs(mcResult.value - Math.E)
  
  if (mcChartInstance) {
    mcChartInstance.setOption({
      title: { text: '蒙特卡洛模拟收敛过程', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'value', 
        name: '实验次数',
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: { 
        type: 'value', 
        name: '估计值',
        axisLine: { 
          show: true,
          lineStyle: { color: '#333' } 
        }
      },
      series: [{
        type: 'line',
        data,
        smooth: true,
        markLine: {
          data: [{ yAxis: Math.E, name: 'e' }]
        }
      }]
    })
  }
}

const animateMonteCarlo = async () => {
  mcAnimating.value = true
  mcTrials.value = 100
  
  for (let i = 100; i <= 10000; i += 100) {
    mcTrials.value = i
    runMonteCarlo()
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  mcAnimating.value = false
  ElMessage.success('动画演示完成！')
}

// 牛顿迭代法
const newtonX0 = ref(2.5)
const newtonMaxIter = ref(10)
const newtonResult = ref(0)
const newtonError = ref(0)
const newtonIterations = ref(0)
const newtonHistory = ref<any[]>([])
const newtonChart = ref<HTMLElement>()
let newtonChartInstance: echarts.ECharts | null = null

const runNewtonMethod = () => {
  let x = newtonX0.value
  const history: any[] = []
  
  for (let n = 0; n < newtonMaxIter.value; n++) {
    const fx = Math.log(x) - 1
    const fpx = 1 / x
    const error = Math.abs(x - Math.E)
    
    history.push({ n, x, fx, error })
    
    if (Math.abs(fx) < 1e-10) {
      break
    }
    
    x = x - fx / fpx
  }
  
  newtonResult.value = x
  newtonError.value = Math.abs(x - Math.E)
  newtonIterations.value = history.length
  newtonHistory.value = history
  
  if (newtonChartInstance) {
    newtonChartInstance.setOption({
      title: { text: '牛顿迭代法收敛过程', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'value', 
        name: '迭代次数',
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: { 
        type: 'log', 
        name: '误差 (对数尺度)',
        axisLine: { 
          show: true,
          lineStyle: { color: '#333' } 
        }
      },
      series: [{
        type: 'line',
        data: history.map(h => [h.n, h.error]),
        smooth: true
      }]
    })
  }
}

// 极限计算
const limitN = ref(1000)
const limitResult = ref(0)
const limitError = ref(0)
const limitChart = ref<HTMLElement>()
let limitChartInstance: echarts.ECharts | null = null

const calculateLimit = () => {
  limitResult.value = Math.pow(1 + 1 / limitN.value, limitN.value)
  limitError.value = Math.abs(limitResult.value - Math.E)
  
  // 生成收敛曲线
  const data: [number, number][] = []
  for (let n = 10; n <= limitN.value; n += Math.max(1, Math.floor(limitN.value / 100))) {
    data.push([n, Math.pow(1 + 1/n, n)])
  }
  
  if (limitChartInstance) {
    limitChartInstance.setOption({
      title: { text: '极限定义收敛过程', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'value', 
        name: 'n',
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: { 
        type: 'value', 
        name: '(1 + 1/n)^n',
        axisLine: { 
          show: true,
          lineStyle: { color: '#333' } 
        }
      },
      series: [{
        type: 'line',
        data,
        smooth: true,
        markLine: {
          data: [{ yAxis: Math.E, name: 'e' }]
        }
      }]
    })
  }
}

// 欧拉法
const eulerStepSize = ref(0.1)
const eulerEndX = ref(2)
const eulerSteps = ref(0)
const eulerMaxError = ref(0)
const eulerChart = ref<HTMLElement>()
let eulerChartInstance: echarts.ECharts | null = null

const runEulerMethod = () => {
  const h = eulerStepSize.value
  const xEnd = eulerEndX.value
  
  const numerical: [number, number][] = [[0, 1]]
  const exact: [number, number][] = [[0, 1]]
  
  let x = 0
  let y = 1
  let maxError = 0
  
  while (x < xEnd) {
    y = y + h * y // dy/dx = y
    x = x + h
    
    const yExact = Math.exp(x)
    const error = Math.abs(y - yExact)
    maxError = Math.max(maxError, error)
    
    numerical.push([x, y])
    exact.push([x, yExact])
  }
  
  eulerSteps.value = numerical.length
  eulerMaxError.value = maxError
  
  if (eulerChartInstance) {
    eulerChartInstance.setOption({
      title: { text: '欧拉法 vs 精确解', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { top: 30 },
      xAxis: { 
        type: 'value', 
        name: 'x',
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: { 
        type: 'value', 
        name: 'y',
        axisLine: { 
          show: true,
          lineStyle: { color: '#333' } 
        }
      },
      series: [
        {
          name: '欧拉法数值解',
          type: 'line',
          data: numerical,
          itemStyle: { color: '#E6A23C' }
        },
        {
          name: '精确解 e^x',
          type: 'line',
          data: exact,
          lineStyle: { type: 'dashed' },
          itemStyle: { color: '#67C23A' }
        }
      ]
    })
  }
}

// ==================== 3. 可视化编程实验 ====================
const codingTab = ref('blockly')

// Blockly
const blocklyDiv = ref<HTMLElement>()
const blocklyOutput = ref('点击"运行代码"查看结果')
const blocklyGeneratedCode = ref('')
let blocklyWorkspace: any = null

const initBlockly = async () => {
  // TODO: 实际项目需要安装 Blockly
  // npm install blockly
  // import * as Blockly from 'blockly'
  
  blocklyOutput.value = '⚠️ Blockly 需要额外安装\nnpm install blockly\n\n这里展示模拟效果...'
}

const runBlocklyCode = () => {
  blocklyGeneratedCode.value = `// 示例生成的代码
let e = 0;
let factorial = 1;
for (let n = 0; n <= 20; n++) {
  if (n > 0) factorial *= n;
  e += 1 / factorial;
}
console.log('e ≈', e);`
  
  blocklyOutput.value = `运行结果：
e ≈ 2.7182818284590455

计算用时: 0.23ms`
  
  ElMessage.success('代码运行成功！')
}

const loadBlocklyExample = (type: string) => {
  ElMessage.info(`加载${type}示例...`)
}

// Monaco Editor (Python)
const monacoEditor = ref<HTMLElement>()
const pythonOutput = ref('')
const pythonRunning = ref(false)
const selectedTemplate = ref('taylor')
let monacoEditorInstance: any = null

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

# 计算 e
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
  
  montecarlo: `# 蒙特卡洛模拟估算 e
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

# 运行模拟
trials = 10000
result = monte_carlo_e(trials)
error = abs(result - math.e)

print(f"蒙特卡洛模拟 ({trials} 次实验):")
print(f"估计值: {result:.10f}")
print(f"真实值: {math.e:.10f}")
print(f"误差:   {error:.2e}")`
}

const initMonacoEditor = async () => {
  // TODO: 实际项目需要安装 Monaco Editor
  // npm install monaco-editor
  
  pythonOutput.value = '⚠️ Monaco Editor 需要额外配置\n这里展示模拟效果...'
}

const runPythonCode = async () => {
  pythonRunning.value = true
  
  // 模拟运行
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  pythonOutput.value = `运行结果：
使用 50 项泰勒级数:
计算结果: 2.718281828459046
真实值:   2.718281828459045
误差:     1.11e-15

运行完成 ✓`
  
  pythonRunning.value = false
  ElMessage.success('Python 代码执行成功！')
}

const clearPythonOutput = () => {
  pythonOutput.value = ''
}

const loadPythonTemplate = () => {
  const template = pythonTemplates[selectedTemplate.value]
  if (template) {
    // monacoEditorInstance?.setValue(template)
    ElMessage.success(`已加载${selectedTemplate.value}模板`)
  }
}

// ==================== 4. 增强版数学游戏 ====================

// 时间挑战
const timeChallenge = ref({
  started: false,
  timeLeft: 60,
  score: 0,
  highScore: parseInt(localStorage.getItem('timeChallenge_highScore') || '0'),
  currentQuestion: null as any,
  timer: null as any
})

const challengeQuestions = [
  { question: 'e 的值约为？', options: ['2.71', '3.14', '1.41', '1.73'], correct: 0 },
  { question: '哪个是 e 的极限定义？', options: ['(1+1/n)^n', '(1-1/n)^n', 'n!/n^n', '2^n/n'], correct: 0 },
  { question: 'e^0 = ?', options: ['0', '1', 'e', '∞'], correct: 1 },
  { question: 'ln(e) = ?', options: ['0', '1', 'e', '2'], correct: 1 },
  { question: 'd/dx(e^x) = ?', options: ['x·e^(x-1)', 'e^x', '1', 'x'], correct: 1 },
  // 更多题目...
]

const startTimeChallenge = () => {
  timeChallenge.value.started = true
  timeChallenge.value.timeLeft = 60
  timeChallenge.value.score = 0
  nextChallengeQuestion()
  
  // 倒计时
  timeChallenge.value.timer = setInterval(() => {
    timeChallenge.value.timeLeft--
    if (timeChallenge.value.timeLeft <= 0) {
      endTimeChallenge()
    }
  }, 1000)
}

const nextChallengeQuestion = () => {
  const randomIndex = Math.floor(Math.random() * challengeQuestions.length)
  timeChallenge.value.currentQuestion = { ...challengeQuestions[randomIndex] }
}

const answerTimeChallenge = (answerIndex: number) => {
  if (answerIndex === timeChallenge.value.currentQuestion.correct) {
    timeChallenge.value.score++
    ElMessage.success('✓ 正确！')
  } else {
    ElMessage.error('✗ 错误')
  }
  nextChallengeQuestion()
}

const endTimeChallenge = () => {
  clearInterval(timeChallenge.value.timer)
  timeChallenge.value.currentQuestion = null
  
  if (timeChallenge.value.score > timeChallenge.value.highScore) {
    timeChallenge.value.highScore = timeChallenge.value.score
    localStorage.setItem('timeChallenge_highScore', timeChallenge.value.score.toString())
    ElMessage.success('🎉 新纪录！')
  }
  
  // 保存到排行榜
  saveToLeaderboard('时间挑战', timeChallenge.value.score)
}

// e 的数字记忆
const eDigitsArray = '718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427'.split('')
const showDigits = ref(false)
const revealedDigits = ref(5)
const memoryTest = ref({
  active: false,
  input: '',
  correctCount: 0,
  correct: true
})

const revealMoreDigits = () => {
  revealedDigits.value = Math.min(revealedDigits.value + 5, eDigitsArray.length)
}

const startMemoryTest = () => {
  memoryTest.value.active = true
  memoryTest.value.input = ''
  memoryTest.value.correctCount = 0
  showDigits.value = false
}

const checkMemoryInput = () => {
  const input = memoryTest.value.input
  const correct = eDigitsArray.slice(0, input.length).join('')
  memoryTest.value.correct = input === correct
  memoryTest.value.correctCount = input === correct ? input.length : 0
}

// 公式配对
const matchingItems = ref<any[]>([])
const selectedMatch = ref<number | null>(null)
const matchScore = ref(0)

const initMatchingGame = () => {
  const pairs = [
    { formula: 'e^0', result: '1' },
    { formula: 'e^1', result: 'e' },
    { formula: '\\ln(e)', result: '1' },
    { formula: 'e^{i\\pi}', result: '-1' }
  ]
  
  const items: any[] = []
  pairs.forEach((pair, index) => {
    items.push({ formula: pair.formula, type: 'formula', pairId: index, matched: false, correct: false })
    items.push({ formula: pair.result, type: 'result', pairId: index, matched: false, correct: false })
  })
  
  // 打乱顺序
  matchingItems.value = items.sort(() => Math.random() - 0.5)
}

const selectMatch = (index: number) => {
  if (matchingItems.value[index].matched) return
  
  if (selectedMatch.value === null) {
    selectedMatch.value = index
  } else {
    const first = matchingItems.value[selectedMatch.value]
    const second = matchingItems.value[index]
    
    if (first.pairId === second.pairId && first.type !== second.type) {
      // 配对成功
      first.matched = true
      first.correct = true
      second.matched = true
      second.correct = true
      matchScore.value++
      ElMessage.success('配对成功！')
    } else {
      ElMessage.error('配对错误')
    }
    
    selectedMatch.value = null
  }
}

const resetMatching = () => {
  initMatchingGame()
  selectedMatch.value = null
  matchScore.value = 0
}

// 排行榜
const leaderboardData = ref<any[]>([])

const loadLeaderboard = () => {
  const data = localStorage.getItem('leaderboard')
  if (data) {
    leaderboardData.value = JSON.parse(data)
  }
}

const saveToLeaderboard = (game: string, score: number) => {
  const entry = {
    rank: 0,
    name: '玩家',
    score,
    game,
    date: new Date().toLocaleString()
  }
  
  leaderboardData.value.push(entry)
  leaderboardData.value.sort((a, b) => b.score - a.score)
  leaderboardData.value = leaderboardData.value.slice(0, 10)
  
  // 更新排名
  leaderboardData.value.forEach((item, index) => {
    item.rank = index + 1
  })
  
  localStorage.setItem('leaderboard', JSON.stringify(leaderboardData.value))
}

// ==================== 5. 增强版知识检测 ====================

// 学习曲线
const learningCurveChart = ref<HTMLElement>()
let learningCurveChartInstance: echarts.ECharts | null = null

const initLearningCurve = () => {
  if (!learningCurveChartInstance) return
  
  // 模拟学习数据
  const dates = []
  const scores = []
  const base = new Date()
  
  for (let i = 7; i >= 0; i--) {
    const date = new Date(base)
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString())
    scores.push(Math.min(100, 40 + i * 8 + Math.random() * 10))
  }
  
  learningCurveChartInstance.setOption({
    title: { text: '最近7天学习进度', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { 
      type: 'category', 
      data: dates,
      axisLine: { lineStyle: { color: '#333' } }
    },
    yAxis: { 
      type: 'value', 
      name: '掌握度 (%)',
      min: 0,
      max: 100,
      axisLine: { 
        show: true,
        lineStyle: { color: '#333' } 
      }
    },
    series: [{
      type: 'line',
      data: scores,
      smooth: true,
      areaStyle: { opacity: 0.3 },
      itemStyle: { color: '#667eea' }
    }]
  })
}

// 知识分类
const knowledgeCategories = ref([
  {
    name: 'e的定义',
    icon: '📚',
    description: 'e的极限定义、级数定义',
    mastery: 85,
    topics: ['极限定义', '泰勒级数', '连分数']
  },
  {
    name: 'e的性质',
    icon: '🔍',
    description: 'e的数学性质与特征',
    mastery: 72,
    topics: ['导数', '积分', '无理性']
  },
  {
    name: 'e的应用',
    icon: '🎯',
    description: 'e在各领域的应用',
    mastery: 68,
    topics: ['复利', '概率', '微分方程']
  },
  {
    name: '相关函数',
    icon: '📈',
    description: '指数函数、对数函数',
    mastery: 90,
    topics: ['e^x', 'ln(x)', '双曲函数']
  }
])

// 错题本
const wrongQuestions = ref([
  {
    question: 'e 的精确值是多少？',
    yourAnswer: '2.71',
    correctAnswer: 'e 是无理数，无精确值，约为 2.718281828...',
    explanation: 'e 是一个无理数，小数部分无限不循环，只能用近似值表示',
    wrongCount: 2
  }
])

const reviewWrongQuestion = (q: any) => {
  ElMessage.info(`跳转到相关章节进行复习...`)
}

// 总体掌握度
const overallMastery = computed(() => {
  const sum = knowledgeCategories.value.reduce((acc, cat) => acc + cat.mastery, 0)
  return Math.round(sum / knowledgeCategories.value.length)
})

const progressColor = computed(() => {
  if (overallMastery.value >= 80) return '#67C23A'
  if (overallMastery.value >= 60) return '#E6A23C'
  return '#F56C6C'
})

const getMasteryLevel = () => {
  const m = overallMastery.value
  if (m >= 90) return '🏆 精通大师'
  if (m >= 80) return '🌟 融会贯通'
  if (m >= 70) return '💪 熟练掌握'
  if (m >= 60) return '📖 基本理解'
  return '🌱 初学入门'
}

// 成就系统
const achievements = ref([
  {
    name: '初来乍到',
    icon: '🌱',
    description: '完成第一个实验',
    unlocked: true,
    unlockDate: '2024-12-18'
  },
  {
    name: '数值专家',
    icon: '🔢',
    description: '完成所有数值实验',
    unlocked: true,
    unlockDate: '2024-12-18'
  },
  {
    name: '编程达人',
    icon: '💻',
    description: '编写并运行自己的代码',
    unlocked: false,
    unlockDate: ''
  },
  {
    name: '游戏高手',
    icon: '🎮',
    description: '时间挑战达到20分',
    unlocked: false,
    unlockDate: ''
  },
  {
    name: '记忆大师',
    icon: '🧠',
    description: '记住 e 的前30位小数',
    unlocked: false,
    unlockDate: ''
  },
  {
    name: '完美通关',
    icon: '🏆',
    description: '所有知识点掌握度达到90%',
    unlocked: false,
    unlockDate: ''
  }
])

// 导出学习报告
const exportLearningReport = () => {
  const report = `
=== Play with Math - 学习报告 ===
生成时间: ${new Date().toLocaleString()}

【总体掌握度】${overallMastery.value}% - ${getMasteryLevel()}

【各模块掌握情况】
${knowledgeCategories.value.map(cat => 
  `${cat.icon} ${cat.name}: ${cat.mastery}%`
).join('\n')}

【错题统计】共 ${wrongQuestions.value.length} 道错题

【已解锁成就】${achievements.value.filter(a => a.unlocked).length} / ${achievements.value.length}

【游戏最高分】
- 时间挑战: ${timeChallenge.value.highScore} 分

继续加油！💪
`
  
  const blob = new Blob([report], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'learning_report.txt'
  a.click()
  
  ElMessage.success('学习报告已导出！')
}

// ==================== 生命周期 ====================
onMounted(() => {
  nextTick(() => {
    // 初始化图表
    if (functionChart.value) {
      functionChartInstance = echarts.init(functionChart.value)
      updateFunctionPlot()
      
      // 响应式
      window.addEventListener('resize', () => {
        functionChartInstance?.resize()
      })
    }
    
    if (seriesChart.value) {
      seriesChartInstance = echarts.init(seriesChart.value)
      calculateSeries()
    }
    
    if (mcChart.value) {
      mcChartInstance = echarts.init(mcChart.value)
      runMonteCarlo()
    }
    
    if (newtonChart.value) {
      newtonChartInstance = echarts.init(newtonChart.value)
      runNewtonMethod()
    }
    
    if (limitChart.value) {
      limitChartInstance = echarts.init(limitChart.value)
      calculateLimit()
    }
    
    if (eulerChart.value) {
      eulerChartInstance = echarts.init(eulerChart.value)
      runEulerMethod()
    }
    
    if (learningCurveChart.value) {
      learningCurveChartInstance = echarts.init(learningCurveChart.value)
      initLearningCurve()
    }
    
    // 初始化游戏
    initMatchingGame()
    loadLeaderboard()
    
    // 初始化编程环境
    initBlockly()
    initMonacoEditor()
  })
})

onBeforeUnmount(() => {
  functionChartInstance?.dispose()
  seriesChartInstance?.dispose()
  mcChartInstance?.dispose()
  newtonChartInstance?.dispose()
  limitChartInstance?.dispose()
  eulerChartInstance?.dispose()
  learningCurveChartInstance?.dispose()
  
  if (timeChallenge.value.timer) {
    clearInterval(timeChallenge.value.timer)
  }
})
</script>

<style scoped lang="scss">
.chapter6-enhanced {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 80px;
}

.chapter-header {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 20px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 15px;
    
    &:hover {
      color: #764ba2;
    }
  }
  
  .chapter-title {
    font-size: 48px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 10px 0;
    
    .chapter-number {
      display: block;
      font-size: 16px;
      color: #999;
      margin-bottom: 5px;
    }
  }
  
  .chapter-subtitle {
    font-size: 18px;
    color: #666;
  }
}

.lab-navigation {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.story-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    
    h2 {
      font-size: 32px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  
  .content-box {
    background: rgba(255, 255, 255, 0.98);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
}

// 函数探索器样式
.function-multi-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 25px 0;
}

.display-options {
  display: flex;
  gap: 25px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.custom-function-area {
  margin: 20px 0;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 25px 0;
  
  .control-item {
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 10px;
      color: #2c3e50;
    }
  }
}

.chart-container.enhanced {
  position: relative;
  
  .function-chart {
    width: 100%;
    height: 500px;
  }
  
  .chart-toolbar {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: center;
  }
}

.function-analysis {
  margin-top: 30px;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
    
    .property-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 12px;
      padding: 20px;
      
      h5 {
        font-size: 16px;
        color: #667eea;
        margin-bottom: 10px;
      }
      
      p {
        color: #2c3e50;
        line-height: 1.6;
      }
    }
  }
}

// 数值实验台样式
.experiment-content {
  padding: 20px 0;
  
  h4 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .method-explanation {
    background: #f0f2f5;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    
    p {
      color: #666;
      line-height: 1.8;
      margin: 8px 0;
    }
  }
  
  .experiment-controls {
    margin: 25px 0;
    
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 10px;
      color: #2c3e50;
    }
  }
  
  .result-display {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 25px;
    border-radius: 12px;
    margin: 20px 0;
    
    h5 {
      font-size: 18px;
      margin-bottom: 15px;
    }
    
    .result-value {
      font-size: 32px;
      font-weight: 700;
      margin: 15px 0;
      font-family: 'Courier New', monospace;
    }
    
    .result-comparison {
      p {
        margin: 8px 0;
        font-size: 14px;
      }
    }
  }
}

.convergence-chart,
.mc-convergence-chart,
.newton-chart,
.limit-chart,
.euler-chart {
  width: 100%;
  height: 400px;
  margin: 20px 0;
}

.newton-table {
  margin: 20px 0;
  
  h5 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px;
      text-align: center;
      border: 1px solid #e0e0e0;
    }
    
    th {
      background: #667eea;
      color: white;
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background: #f5f7fa;
    }
  }
}

// 可视化编程样式
.coding-intro {
  margin-bottom: 30px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
}

.blockly-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
  
  .blockly-workspace-wrapper {
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    
    .blockly-workspace {
      width: 100%;
      height: 500px;
      background: #f5f5f5;
    }
  }
  
  .blockly-output {
    .output-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      h4 {
        font-size: 18px;
        color: #2c3e50;
      }
    }
    
    .output-content {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 20px;
      border-radius: 8px;
      height: 200px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      
      pre {
        margin: 0;
        white-space: pre-wrap;
      }
    }
    
    .generated-code {
      margin-top: 20px;
      
      h5 {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }
      
      pre {
        background: #f5f5f5;
        padding: 15px;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 12px;
      }
    }
  }
}

.blockly-examples {
  margin-top: 20px;
  
  h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 15px;
  }
}

.python-editor-container {
  .editor-wrapper {
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    margin: 20px 0;
    
    .monaco-editor {
      width: 100%;
      height: 400px;
      background: #1e1e1e;
    }
  }
  
  .editor-toolbar {
    display: flex;
    gap: 10px;
    margin: 15px 0;
  }
  
  .python-output {
    h4 {
      font-size: 16px;
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .output-pre {
      background: #1e1e1e;
      color: #4ec9b0;
      padding: 20px;
      border-radius: 8px;
      min-height: 150px;
      max-height: 300px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
    }
  }
}

.python-templates {
  margin-top: 20px;
  
  h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 10px;
  }
}

// 游戏样式
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin: 25px 0;
  
  .game-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 16px;
    padding: 25px;
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }
    
    &.featured {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      .game-header h3,
      .game-desc {
        color: white;
      }
    }
    
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      h3 {
        font-size: 20px;
        color: #2c3e50;
      }
    }
    
    .game-desc {
      color: #666;
      margin-bottom: 20px;
    }
  }
}

.challenge-start,
.challenge-active,
.challenge-result {
  text-align: center;
  padding: 20px;
}

.challenge-timer {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  
  .timer-text {
    font-size: 32px;
    font-weight: 700;
  }
}

.challenge-score {
  h4 {
    font-size: 24px;
    margin: 15px 0;
    color: white;
  }
}

.challenge-question {
  margin: 20px 0;
  
  h4 {
    font-size: 18px;
    margin-bottom: 20px;
    color: white;
  }
  
  .challenge-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    
    .challenge-option-btn {
      height: 60px;
      font-size: 16px;
    }
  }
}

.e-digits-display {
  background: #f0f2f5;
  padding: 20px;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  line-height: 2;
  margin: 15px 0;
  
  .e-digit {
    display: inline-block;
    width: 20px;
    text-align: center;
    color: #667eea;
    font-weight: 600;
  }
}

.game-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.memory-test {
  margin-top: 20px;
  
  .test-feedback {
    margin-top: 10px;
    font-weight: 600;
    
    &.correct {
      color: #67c23a;
    }
    
    &.wrong {
      color: #f56c6c;
    }
  }
}

.matching-game {
  .formula-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    
    .match-item {
      background: white;
      border: 3px solid transparent;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: #667eea;
        transform: scale(1.05);
      }
      
      &.selected {
        border-color: #667eea;
        background: #e6eeff;
      }
      
      &.correct {
        border-color: #67c23a;
        background: #f0f9ff;
        pointer-events: none;
      }
      
      &.wrong {
        border-color: #f56c6c;
        animation: shake 0.3s;
      }
    }
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.game-score {
  margin-top: 20px;
  text-align: center;
  
  p {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
  }
}

.leaderboard {
  margin-top: 40px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
}

// 知识检测样式
.learning-curve {
  margin-bottom: 40px;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .learning-curve-chart {
    width: 100%;
    height: 300px;
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
    }
  }
}

.wrong-questions {
  margin: 40px 0;
  
  h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .wrong-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .wrong-item {
      background: #fff5f5;
      border-left: 4px solid #f56c6c;
      border-radius: 8px;
      padding: 20px;
      
      .wrong-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        
        .wrong-index {
          font-weight: 700;
          color: #f56c6c;
        }
      }
      
      .wrong-question {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 15px;
      }
      
      .wrong-analysis {
        p {
          margin: 8px 0;
          line-height: 1.6;
          color: #666;
          
          strong {
            color: #2c3e50;
          }
        }
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
    margin-bottom: 20px;
  }
  
  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    
    .achievement-badge {
      background: #f5f5f5;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      transition: all 0.3s;
      opacity: 0.5;
      
      &.unlocked {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        opacity: 1;
        
        .badge-icon {
          font-size: 48px;
          animation: bounce 1s infinite;
        }
        
        .badge-name,
        .badge-desc,
        .unlock-date {
          color: white;
        }
      }
      
      .badge-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }
      
      .badge-name {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 8px;
      }
      
      .badge-desc {
        font-size: 12px;
        color: #666;
        line-height: 1.4;
      }
      
      .unlock-date {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 10px;
      }
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.chapter-footer {
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

// 移动端适配
@media (max-width: 768px) {
  .chapter-header {
    padding: 20px 15px;
    
    .chapter-title {
      font-size: 32px;
    }
    
    .chapter-subtitle {
      font-size: 14px;
    }
  }
  
  .lab-navigation {
    padding: 0 15px;
  }
  
  .story-section {
    padding: 0 15px;
    
    .content-box {
      padding: 20px;
    }
  }
  
  .function-multi-selector {
    flex-direction: column;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
  }
  
  .blockly-container,
  .games-grid,
  .knowledge-categories {
    grid-template-columns: 1fr;
  }
  
  .challenge-options {
    grid-template-columns: 1fr !important;
  }
  
  .chapter-footer {
    flex-direction: column;
  }
}
</style>
