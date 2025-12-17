<template>
  <div class="mascot-container" :class="{ 'expanded': showMessage }">
    <!-- 小猫主体 -->
    <div 
      class="mascot-cat" 
      :class="`emotion-${emotion}`"
      @click="toggleMessage"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <!-- 耳朵 -->
      <div class="ear ear-left"></div>
      <div class="ear ear-right"></div>
      
      <!-- 脸 -->
      <div class="face">
        <!-- 眼睛 -->
        <div class="eyes">
          <div class="eye eye-left">
            <div class="pupil"></div>
          </div>
          <div class="eye eye-right">
            <div class="pupil"></div>
          </div>
        </div>
        
        <!-- 鼻子 -->
        <div class="nose"></div>
        
        <!-- 嘴巴 -->
        <div class="mouth"></div>
        
        <!-- 胡须 -->
        <div class="whiskers whiskers-left">
          <div class="whisker"></div>
          <div class="whisker"></div>
          <div class="whisker"></div>
        </div>
        <div class="whiskers whiskers-right">
          <div class="whisker"></div>
          <div class="whisker"></div>
          <div class="whisker"></div>
        </div>
      </div>
      
      <!-- 身体 -->
      <div class="body">
        <!-- 学士袍 -->
        <div class="robe">
          <div class="robe-collar"></div>
        </div>
        
        <!-- 数学书 -->
        <div class="math-book" v-if="['thinking', 'studying'].includes(emotion)">
          <div class="book-content">e≈2.718...</div>
        </div>
        
        <!-- 放大镜 -->
        <div class="magnifier" v-if="emotion === 'curious'">
          <div class="magnifier-glass"></div>
          <div class="magnifier-handle"></div>
        </div>
      </div>
      
      <!-- 尾巴 -->
      <div class="tail"></div>
    </div>
    
    <!-- 消息气泡 -->
    <transition name="bubble">
      <div v-if="showMessage && message" class="message-bubble">
        <div class="bubble-content">{{ message }}</div>
        <div class="bubble-arrow"></div>
      </div>
    </transition>
    
    <!-- 悬浮提示 -->
    <transition name="fade">
      <div v-if="isHovering && !showMessage" class="hover-hint">
        点我说话!
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  emotion?: 'happy' | 'excited' | 'thinking' | 'curious' | 'studying' | 'surprised' | 'proud'
  message?: string
  autoShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  emotion: 'happy',
  message: '你好呀!我是e小猫,让我带你探索数学的奥秘吧~',
  autoShow: false
})

const showMessage = ref(props.autoShow)
const isHovering = ref(false)

// 监听消息变化,自动显示
watch(() => props.message, (newMessage) => {
  if (newMessage && newMessage !== props.message) {
    showMessage.value = true
    // 5秒后自动隐藏
    setTimeout(() => {
      showMessage.value = false
    }, 5000)
  }
})

function toggleMessage() {
  showMessage.value = !showMessage.value
}
</script>

<style scoped lang="scss">
.mascot-container {
  position: relative;
  width: 120px;
  height: 150px;
  
  &.expanded {
    z-index: 1000;
  }
}

.mascot-cat {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: float 3s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.05);
  }
  
  // 不同情绪的动画
  &.emotion-excited {
    animation: bounce 0.6s ease-in-out infinite;
  }
  
  &.emotion-thinking {
    animation: sway 2s ease-in-out infinite;
  }
  
  &.emotion-surprised {
    animation: shake 0.5s ease-in-out;
  }
}

// 耳朵
.ear {
  position: absolute;
  width: 30px;
  height: 35px;
  background: linear-gradient(135deg, #87ceeb 0%, #4a90e2 100%);
  border-radius: 50% 50% 0 0;
  border: 2px solid #333;
  
  &.ear-left {
    top: 0;
    left: 10px;
    transform: rotate(-20deg);
  }
  
  &.ear-right {
    top: 0;
    right: 10px;
    transform: rotate(20deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 20px;
    background: #ffb6c1;
    border-radius: 50%;
  }
}

// 脸
.face {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
  border-radius: 50%;
  border: 3px solid #333;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

// 眼睛
.eyes {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  display: flex;
  justify-content: space-between;
}

.eye {
  width: 12px;
  height: 16px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  
  .pupil {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: #333;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
}

// 不同情绪的眼睛
.emotion-excited .eye {
  height: 20px;
  animation: sparkle 1s ease-in-out infinite;
  
  .pupil {
    background: radial-gradient(circle, #333 40%, #ffeb3b 100%);
  }
}

.emotion-thinking .eye {
  transform: translateY(-2px);
  
  .pupil {
    left: 30%;
  }
}

.emotion-surprised .eye {
  width: 16px;
  height: 20px;
  border-radius: 50%;
}

// 鼻子
.nose {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 6px;
  background: #ffb6c1;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  border: 1px solid #333;
}

// 嘴巴
.mouth {
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  border: 2px solid #333;
  border-top: none;
  border-radius: 0 0 50% 50%;
  transition: all 0.3s ease;
}

.emotion-happy .mouth,
.emotion-excited .mouth {
  width: 30px;
  height: 15px;
}

.emotion-surprised .mouth {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-top: 2px solid #333;
}

.emotion-thinking .mouth {
  width: 15px;
  height: 5px;
  border-radius: 50%;
  transform: translateX(-50%) rotate(-10deg);
}

// 胡须
.whiskers {
  position: absolute;
  top: 40px;
  
  &.whiskers-left {
    left: -10px;
  }
  
  &.whiskers-right {
    right: -10px;
  }
  
  .whisker {
    width: 15px;
    height: 2px;
    background: #333;
    margin: 4px 0;
    border-radius: 1px;
    transition: all 0.3s ease;
  }
  
  &.whiskers-left .whisker {
    transform-origin: right center;
    
    &:nth-child(1) { transform: rotate(-15deg); }
    &:nth-child(2) { transform: rotate(0deg); }
    &:nth-child(3) { transform: rotate(15deg); }
  }
  
  &.whiskers-right .whisker {
    transform-origin: left center;
    
    &:nth-child(1) { transform: rotate(15deg); }
    &:nth-child(2) { transform: rotate(0deg); }
    &:nth-child(3) { transform: rotate(-15deg); }
  }
}

// 身体
.body {
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 60px;
}

// 学士袍
.robe {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border-radius: 40% 40% 50% 50%;
  border: 2px solid #333;
  
  .robe-collar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 15px;
    background: white;
    border: 2px solid #333;
    border-radius: 50% 50% 0 0;
  }
}

// 数学书
.math-book {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: 25px;
  background: #8b4513;
  border: 2px solid #333;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .book-content {
    font-size: 8px;
    font-weight: bold;
    color: gold;
    font-family: 'Courier New', monospace;
  }
}

// 放大镜
.magnifier {
  position: absolute;
  bottom: 10px;
  right: -20px;
  width: 30px;
  height: 30px;
  
  .magnifier-glass {
    width: 20px;
    height: 20px;
    border: 3px solid #333;
    border-radius: 50%;
    background: rgba(135, 206, 235, 0.3);
  }
  
  .magnifier-handle {
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 15px;
    height: 3px;
    background: #333;
    border-radius: 2px;
    transform: rotate(-45deg);
  }
}

// 尾巴
.tail {
  position: absolute;
  bottom: 20px;
  right: -15px;
  width: 30px;
  height: 40px;
  background: linear-gradient(135deg, #87ceeb 0%, #4a90e2 100%);
  border: 2px solid #333;
  border-radius: 50% 0 50% 50%;
  transform: rotate(20deg);
  animation: tailWag 1.5s ease-in-out infinite;
}

// 消息气泡
.message-bubble {
  position: absolute;
  top: -20px;
  right: 130px;
  min-width: 200px;
  max-width: 300px;
  padding: 1rem;
  background: white;
  border: 3px solid #4a90e2;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10;
  
  .bubble-content {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #333;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  
  .bubble-arrow {
    position: absolute;
    right: -12px;
    top: 30px;
    width: 0;
    height: 0;
    border-left: 12px solid #4a90e2;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    
    &::after {
      content: '';
      position: absolute;
      right: 3px;
      top: -6px;
      width: 0;
      height: 0;
      border-left: 9px solid white;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
}

// 悬浮提示
.hover-hint {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 0.8rem;
  background: #ffeb3b;
  border: 2px solid #333;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

// 动画
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes sway {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes tailWag {
  0%, 100% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(40deg);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

// 过渡动画
.bubble-enter-active,
.bubble-leave-active {
  transition: all 0.3s ease;
}

.bubble-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.bubble-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
