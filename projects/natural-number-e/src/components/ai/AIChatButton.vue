<template>
  <div class="ai-chat-button-wrapper">
    <el-button 
      class="ai-chat-button"
      type="primary"
      circle
      size="large"
      @click="togglePanel"
      :icon="visible ? Close : ChatDotRound"
    >
    </el-button>
    
    <!-- 未读消息提示 -->
    <transition name="badge">
      <div v-if="unreadCount > 0 && !visible" class="unread-badge">
        {{ unreadCount }}
      </div>
    </transition>
    
    <!-- 提示气泡 -->
    <transition name="hint">
      <div v-if="showHint && !visible" class="hint-bubble">
        有问题? 问我!
      </div>
    </transition>
    
    <!-- AI 聊天面板 -->
    <AIChatPanel 
      :visible="visible" 
      :context="context"
      @close="visible = false"
      @message="handleMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChatDotRound, Close } from '@element-plus/icons-vue'
import AIChatPanel from './AIChatPanel.vue'

interface Props {
  context?: string  // 当前页面的上下文信息
}

defineProps<Props>()

const visible = ref(false)
const unreadCount = ref(0)
const showHint = ref(false)

// 初始化提示
onMounted(() => {
  // 首次访问时显示提示
  const hasSeenHint = localStorage.getItem('ai-hint-seen')
  if (!hasSeenHint) {
    setTimeout(() => {
      showHint.value = true
      
      // 5秒后自动隐藏
      setTimeout(() => {
        showHint.value = false
        localStorage.setItem('ai-hint-seen', 'true')
      }, 5000)
    }, 2000)
  }
})

function togglePanel() {
  visible.value = !visible.value
  
  if (visible.value) {
    unreadCount.value = 0
    showHint.value = false
  }
}

function handleMessage(message: any) {
  if (!visible.value) {
    unreadCount.value++
  }
}
</script>

<style scoped lang="scss">
.ai-chat-button-wrapper {
  position: fixed;
  right: 2rem;
  bottom: 10rem;
  z-index: 1000;
}

.ai-chat-button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(84, 112, 198, 0.4);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(84, 112, 198, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 20px;
  height: 20px;
  background: #f44336;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0 6px;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
}

.hint-bubble {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.8rem 1.2rem;
  background: white;
  border: 2px solid #5470c6;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  
  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid #5470c6;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  
  &::before {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid white;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    z-index: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(84, 112, 198, 0.4);
  }
  50% {
    box-shadow: 0 4px 20px rgba(84, 112, 198, 0.7);
  }
}

.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s ease;
}

.badge-enter-from {
  opacity: 0;
  transform: scale(0);
}

.badge-leave-to {
  opacity: 0;
  transform: scale(0);
}

.hint-enter-active,
.hint-leave-active {
  transition: all 0.3s ease;
}

.hint-enter-from {
  opacity: 0;
  transform: translateY(-50%) translateX(20px);
}

.hint-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(20px);
}
</style>
