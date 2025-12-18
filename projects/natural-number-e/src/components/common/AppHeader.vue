<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <span class="logo-e">e</span>
        <span class="logo-text">玩转数学</span>
      </router-link>
      
      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/chapter1" class="nav-item">第1章</router-link>
        <router-link to="/chapter2" class="nav-item">第2章</router-link>
        <router-link to="/chapter3" class="nav-item">第3章</router-link>
        <router-link to="/chapter4" class="nav-item">第4章</router-link>
        <router-link to="/chapter5" class="nav-item">第5章</router-link>
        <router-link to="/chapter6" class="nav-item">第6章</router-link>
        <router-link to="/lab" class="nav-item">实验室</router-link>
      </nav>
      
      <!-- 右侧按钮 -->
      <div class="header-actions">
        <el-button circle icon="Search" title="搜索" class="hide-mobile" />
        <el-button 
          circle 
          icon="Menu" 
          class="show-mobile mobile-menu-btn" 
          @click="showMobileMenu = true"
          title="菜单"
        />
      </div>
    </div>
    
    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="showMobileMenu"
      direction="rtl"
      title="菜单"
      size="280px"
    >
      <nav class="mobile-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path" 
          class="mobile-nav-item"
          @click="showMobileMenu = false"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMobileMenu = ref(false)

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/chapter1', label: '第1章 - e的发现之旅', icon: '📚' },
  { path: '/chapter2', label: '第2章 - e的数学地位', icon: '📊' },
  { path: '/chapter3', label: '第3章 - e的有趣故事', icon: '🎭' },
  { path: '/chapter4', label: '第4章 - e的特殊性质', icon: '✨' },
  { path: '/chapter5', label: '第5章 - e的应用', icon: '🚀' },
  { path: '/chapter6', label: '第6章 - 挑战与探索', icon: '🎯' },
  { path: '/lab', label: '互动实验室', icon: '🧪' }
]
</script>

<style scoped lang="scss">
.app-header {
  background: linear-gradient(135deg, #5470c6 0%, #91cc75 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      
      .logo-e {
        font-size: 2.5rem;
        color: white;
        font-style: italic;
        text-shadow: 2px 2px 0 #fac858;
      }
      
      .logo-text {
        color: white;
        font-family: 'Ma Shan Zheng', cursive;
      }
    }
    
    .nav-menu {
      display: flex;
      gap: 1.5rem;
      
      @media (max-width: 968px) {
        display: none;
      }
      
      .nav-item {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255,255,255,0.2);
        }
        
        &.router-link-active {
          background: white;
          color: #5470c6;
          font-weight: bold;
        }
      }
    }
    
    .header-actions {
      display: flex;
      gap: 0.5rem;
      
      .show-mobile {
        display: none;
      }
    }
  }
}

// 移动端导航样式
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  
  .mobile-nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-decoration: none;
    color: #333;
    border-radius: 8px;
    transition: all 0.3s ease;
    // 增大触摸目标
    min-height: 56px;
    
    .nav-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    
    .nav-label {
      font-size: 1rem;
      font-weight: 500;
    }
    
    &:hover {
      background: #f0f0f0;
    }
    
    &.router-link-active {
      background: linear-gradient(135deg, #5470c6 0%, #91cc75 100%);
      color: white;
      font-weight: bold;
    }
  }
}

// 移动端适配
@media (max-width: 968px) {
  .app-header .header-content {
    padding: 1rem;
    
    .logo {
      font-size: 1.2rem;
      
      .logo-e {
        font-size: 2rem;
      }
    }
    
    .header-actions {
      .show-mobile {
        display: flex;
      }
    }
  }
}

@media (max-width: 640px) {
  .app-header .header-content {
    padding: 0.75rem 1rem;
    
    .logo {
      font-size: 1.1rem;
      
      .logo-e {
        font-size: 1.75rem;
      }
      
      .logo-text {
        font-size: 1rem;
      }
    }
  }
}
</style>
