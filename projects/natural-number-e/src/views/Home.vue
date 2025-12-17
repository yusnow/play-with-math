<template>
  <div class="home-container">
    <!-- Hero区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-main">探索自然常数</span>
          <span class="title-highlight">e</span>
        </h1>
        <p class="hero-subtitle">从银行利息到宇宙规律</p>
        <p class="hero-description">
          一场跨越300年的数学冒险之旅
        </p>
        
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="startJourney">
            <el-icon><Position /></el-icon>
            开始探索
          </el-button>
          <el-button size="large" @click="$router.push('/lab')">
            <el-icon><Operation /></el-icon>
            交互实验室
          </el-button>
        </div>
      </div>
      
      <!-- 3D动画:e的视觉化 -->
      <div class="hero-visual">
        <div ref="threeContainer" class="three-container"></div>
      </div>
    </section>

    <!-- 章节导航卡片 -->
    <section class="chapters-section">
      <h2 class="section-title">📚 学习章节</h2>
      
      <div class="chapters-grid">
        <div 
          v-for="(chapter, index) in chapters" 
          :key="index"
          class="chapter-card"
          :style="{ '--delay': `${index * 0.1}s` }"
          @click="$router.push(chapter.path)"
        >
          <div class="chapter-icon">{{ chapter.icon }}</div>
          <h3 class="chapter-title">{{ chapter.title }}</h3>
          <p class="chapter-description">{{ chapter.description }}</p>
          
          <div class="chapter-meta">
            <span class="chapter-duration">
              <el-icon><Clock /></el-icon>
              {{ chapter.duration }}
            </span>
            <span class="chapter-difficulty" :class="`difficulty-${chapter.difficulty}`">
              {{ difficultyLabel(chapter.difficulty) }}
            </span>
          </div>
          
          <div class="chapter-progress" v-if="chapter.progress">
            <el-progress :percentage="chapter.progress" :show-text="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- 特色功能 -->
    <section class="features-section">
      <h2 class="section-title">✨ 特色功能</h2>
      
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 快速统计 -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ eDigits }}</div>
          <div class="stat-label">e的精确位数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">300+</div>
          <div class="stat-label">年历史</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">23+</div>
          <div class="stat-label">AI模型支持</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">∞</div>
          <div class="stat-label">探索可能</div>
        </div>
      </div>
    </section>

    <!-- 吉祥物 -->
    <MascotCat 
      :emotion="mascotEmotion"
      :message="mascotMessage"
      class="home-mascot"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Position, Operation, Clock } from '@element-plus/icons-vue'
import * as THREE from 'three'
import MascotCat from '@/components/common/MascotCat.vue'

// 章节数据
const chapters = [
  {
    icon: '🚀',
    title: '第一章:e的发现之旅',
    description: '从复利计算到数学常数的诞生',
    path: '/chapter1',
    duration: '15分钟',
    difficulty: 'easy',
    progress: 0
  },
  {
    icon: '👑',
    title: '第二章:e的数学地位',
    description: '超越数、无理数与微积分之美',
    path: '/chapter2',
    duration: '20分钟',
    difficulty: 'medium',
    progress: 0
  },
  {
    icon: '🎭',
    title: '第三章:e的有趣故事',
    description: '数学家们的奇闻趣事',
    path: '/chapter3',
    duration: '10分钟',
    difficulty: 'easy',
    progress: 0
  },
  {
    icon: '✨',
    title: '第四章:e的特殊性质',
    description: '导数、泰勒级数与欧拉公式',
    path: '/chapter4',
    duration: '25分钟',
    difficulty: 'hard',
    progress: 0
  },
  {
    icon: '🌍',
    title: '第五章:e的实际应用',
    description: '从金融到物理的广泛应用',
    path: '/chapter5',
    duration: '20分钟',
    difficulty: 'medium',
    progress: 0
  },
  {
    icon: '🔬',
    title: '第六章:e的深度探索',
    description: '数论、复数与高等数学',
    path: '/chapter6',
    duration: '30分钟',
    difficulty: 'hard',
    progress: 0
  }
]

// 特色功能
const features = [
  {
    icon: '🎮',
    title: '交互式参数调节',
    description: '实时调整参数,观察e的变化规律'
  },
  {
    icon: '🎨',
    title: '手绘风格设计',
    description: '活泼生动的界面,让数学变得有趣'
  },
  {
    icon: '🤖',
    title: 'AI学习助手',
    description: '支持23+国内外主流AI模型,随时解答疑问'
  },
  {
    icon: '🔗',
    title: '概念关联系统',
    description: '连接微积分、概率论等相关知识点'
  },
  {
    icon: '🎵',
    title: '沉浸式音效',
    description: '配合学习节奏的背景音乐和交互音效'
  },
  {
    icon: '🏆',
    title: '成就系统',
    description: '完成学习任务,收集徽章和奖励'
  }
]

// e的位数展示
const eDigits = ref('2.7182818284...')

// 吉祥物状态
const mascotEmotion = ref<'happy' | 'excited' | 'thinking'>('happy')
const mascotMessage = ref('欢迎来到e的世界!点击上方按钮开始你的数学之旅吧~')

// Three.js相关
const threeContainer = ref<HTMLElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null
let spiralMesh: THREE.Mesh | null = null

// 难度标签
function difficultyLabel(level: string): string {
  const labels: Record<string, string> = {
    easy: '⭐ 入门',
    medium: '⭐⭐ 进阶',
    hard: '⭐⭐⭐ 挑战'
  }
  return labels[level] || level
}

// 开始探索
function startJourney() {
  mascotEmotion.value = 'excited'
  mascotMessage.value = '太好了!让我们从第一章开始吧!'
  setTimeout(() => {
    router.push('/chapter1')
  }, 1500)
}

// Three.js初始化
onMounted(() => {
  initThreeScene()
  animateEDigits()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})

function initThreeScene() {
  if (!threeContainer.value) return
  
  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xfffbf5)
  
  // 相机
  const width = threeContainer.value.clientWidth
  const height = threeContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5
  
  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  threeContainer.value.appendChild(renderer.domElement)
  
  // 创建e的对数螺旋
  createESpiral()
  
  // 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)
  
  // 动画循环
  animate()
}

function createESpiral() {
  if (!scene) return
  
  // 创建对数螺旋几何体
  const points = []
  for (let i = 0; i <= 100; i++) {
    const theta = (i / 100) * Math.PI * 4
    const r = Math.E ** (theta / 10)
    const x = r * Math.cos(theta) * 0.3
    const y = r * Math.sin(theta) * 0.3
    points.push(new THREE.Vector3(x, y, 0))
  }
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ 
    color: 0x5470c6,
    linewidth: 3
  })
  
  spiralMesh = new THREE.Line(geometry, material)
  scene.add(spiralMesh)
  
  // 添加粒子效果
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 500
  const positions = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount; i++) {
    const theta = Math.random() * Math.PI * 4
    const r = Math.E ** (theta / 10) * 0.3
    positions[i * 3] = r * Math.cos(theta) * (0.8 + Math.random() * 0.4)
    positions[i * 3 + 1] = r * Math.sin(theta) * (0.8 + Math.random() * 0.4)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x91cc75,
    size: 0.05,
    transparent: true,
    opacity: 0.6
  })
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

function animate() {
  if (!scene || !camera || !renderer) return
  
  animationId = requestAnimationFrame(animate)
  
  // 旋转螺旋
  if (spiralMesh) {
    spiralMesh.rotation.z += 0.005
  }
  
  renderer.render(scene, camera)
}

// e位数动画
function animateEDigits() {
  const fullDigits = '2.718281828459045235360287471352662497757247093699959574966967627724...'
  let currentIndex = 1
  
  const interval = setInterval(() => {
    if (currentIndex <= fullDigits.length) {
      eDigits.value = fullDigits.substring(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(interval)
    }
  }, 100)
}
</script>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fffbf5 0%, #fff5e6 100%);
  font-family: 'Comic Sans MS', cursive, 'Ma Shan Zheng', sans-serif;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
  min-height: 80vh;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content {
    .hero-title {
      font-size: 4rem;
      margin-bottom: 1rem;
      line-height: 1.2;
      
      .title-main {
        display: block;
        color: #333;
        font-family: 'Ma Shan Zheng', cursive;
      }
      
      .title-highlight {
        display: inline-block;
        font-size: 6rem;
        color: #5470c6;
        font-style: italic;
        font-weight: bold;
        text-shadow: 3px 3px 0 #fac858;
        animation: float 3s ease-in-out infinite;
      }
    }
    
    .hero-subtitle {
      font-size: 1.5rem;
      color: #666;
      margin-bottom: 1rem;
    }
    
    .hero-description {
      font-size: 1.1rem;
      color: #999;
      margin-bottom: 2rem;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 968px) {
        justify-content: center;
      }
      
      .el-button {
        font-size: 1.1rem;
        padding: 1.2rem 2rem;
        border-radius: 25px;
        font-weight: bold;
      }
    }
  }
  
  .hero-visual {
    .three-container {
      width: 100%;
      height: 500px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
  }
}

.chapters-section,
.features-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  .section-title {
    font-size: 2.5rem;
    color: #5470c6;
    text-align: center;
    margin-bottom: 3rem;
    font-family: 'Ma Shan Zheng', cursive;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: #fac858;
      border-radius: 2px;
    }
  }
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  
  .chapter-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    border: 3px solid #5470c6;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: var(--delay);
    
    &:hover {
      transform: translateY(-10px) rotate(1deg);
      box-shadow: 0 10px 30px rgba(84, 112, 198, 0.3);
      border-color: #fac858;
    }
    
    .chapter-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .chapter-title {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    .chapter-description {
      font-size: 0.95rem;
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .chapter-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      .chapter-duration {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.9rem;
        color: #999;
      }
      
      .chapter-difficulty {
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: bold;
        
        &.difficulty-easy {
          background: #e7f6e7;
          color: #4caf50;
        }
        
        &.difficulty-medium {
          background: #fff8e1;
          color: #ff9800;
        }
        
        &.difficulty-hard {
          background: #ffebee;
          color: #f44336;
        }
      }
    }
    
    .chapter-progress {
      margin-top: 1rem;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  .feature-card {
    background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
    padding: 2rem;
    border-radius: 20px;
    border: 2px dashed #5470c6;
    text-align: center;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-title {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    .feature-description {
      font-size: 0.95rem;
      color: #666;
      line-height: 1.6;
    }
  }
}

.stats-section {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #5470c6 0%, #91cc75 100%);
  
  .stats-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    
    .stat-item {
      text-align: center;
      color: white;
      
      .stat-value {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }
      
      .stat-label {
        font-size: 1.1rem;
        opacity: 0.9;
      }
    }
  }
}

.home-mascot {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
