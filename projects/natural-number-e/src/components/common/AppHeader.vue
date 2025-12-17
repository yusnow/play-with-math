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
        <el-button circle icon="Search" title="搜索" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component
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
    }
  }
}
</style>
