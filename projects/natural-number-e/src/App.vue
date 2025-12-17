<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <!-- 顶部导航栏 -->
    <AppHeader />
    
    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 底部 -->
    <AppFooter />
    
    <!-- AI助手悬浮按钮 -->
    <AIChatButton 
      v-if="!isHomePage"
      @click="toggleAIPanel"
    />
    
    <!-- AI助手侧边栏 -->
    <Transition name="slide-left">
      <AIChatPanel 
        v-if="showAIPanel"
        @close="showAIPanel = false"
      />
    </Transition>
    
    <!-- 吉祥物（猫老师）- 特定场景出现 -->
    <MascotCat
      v-if="showMascot"
      :emotion="mascotEmotion"
      :message="mascotMessage"
      @close="showMascot = false"
    />
    
    <!-- 全局Loading -->
    <GlobalLoading v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import AIChatButton from '@/components/ai/AIChatButton.vue';
import AIChatPanel from '@/components/ai/AIChatPanel.vue';
import MascotCat from '@/components/common/MascotCat.vue';
import GlobalLoading from '@/components/common/GlobalLoading.vue';

const route = useRoute();

// 响应式状态
const isDarkMode = ref(false);
const showAIPanel = ref(false);
const showMascot = ref(false);
const mascotEmotion = ref<'happy' | 'thinking' | 'excited' | 'confused'>('happy');
const mascotMessage = ref('');
const isLoading = ref(false);

// 计算属性
const isHomePage = computed(() => route.path === '/');

// 方法
function toggleAIPanel() {
  showAIPanel.value = !showAIPanel.value;
}

// 显示吉祥物提示
export function showMascotTip(emotion: typeof mascotEmotion.value, message: string) {
  mascotEmotion.value = emotion;
  mascotMessage.value = message;
  showMascot.value = true;
}

// 生命周期
onMounted(() => {
  // 欢迎提示
  setTimeout(() => {
    showMascotTip('happy', '嗨！我是猫老师，欢迎来到自然之数的世界！有任何疑问随时问我哦~ 😺');
  }, 1000);
  
  // 3秒后自动隐藏
  setTimeout(() => {
    showMascot.value = false;
  }, 4000);
});
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/hand-drawn.scss';
@import '@/styles/animations.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: $bg-light;
  color: $text-primary;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  // 纸张质感背景
  background-image: url('@/assets/textures/paper.png');
  background-size: 400px 400px;
  background-repeat: repeat;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

// 页面切换动画
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// AI面板滑入动画
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

// 响应式设计
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
</style>
