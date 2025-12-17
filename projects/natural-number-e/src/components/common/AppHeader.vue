<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="logo">
        <span class="logo-icon">🎓</span>
        <span class="logo-text">玩转数学</span>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/lab" class="nav-link">实验室</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  
  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    .logo-icon {
      font-size: 32px;
    }
    
    .logo-text {
      font-size: 24px;
      font-weight: bold;
      background: linear-gradient(135deg, #2E86DE 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .nav {
    display: flex;
    gap: 30px;
    
    .nav-link {
      text-decoration: none;
      color: #333;
      font-size: 16px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f0f7ff;
        color: #2E86DE;
      }
      
      &.router-link-active {
        color: #2E86DE;
        background: #f0f7ff;
        font-weight: bold;
      }
    }
  }
  
  @media (max-width: 768px) {
    .logo-text {
      display: none;
    }
    
    .nav {
      gap: 10px;
      
      .nav-link {
        font-size: 14px;
        padding: 6px 12px;
      }
    }
  }
}
</style>
