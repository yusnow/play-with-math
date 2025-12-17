<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>玩转数学</h3>
        <p>让学生看到数学、玩到数学、爱上数学</p>
      </div>
      
      <div class="footer-section">
        <h4>快速链接</h4>
        <router-link to="/">首页</router-link>
        <router-link to="/chapter1">开始学习</router-link>
        <router-link to="/lab">交互实验室</router-link>
      </div>
      
      <div class="footer-section">
        <h4>关于项目</h4>
        <a href="https://github.com/YOUR_USERNAME/play-with-math" target="_blank">GitHub</a>
        <a href="mailto:guanghua.yu@gmail.com">联系我们</a>
      </div>
      
      <div class="footer-section">
        <h4>技术支持</h4>
        <p>Vue 3 + TypeScript</p>
        <p>23+ AI 模型集成</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 玩转数学. MIT License</p>
      <p>作者: Yu Guanghua</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped lang="scss">
.app-footer {
  background: #f5f5f5;
  border-top: 3px solid #5470c6;
  margin-top: 4rem;
  
  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    
    .footer-section {
      h3 {
        font-size: 1.5rem;
        color: #5470c6;
        margin-bottom: 1rem;
        font-family: 'Ma Shan Zheng', cursive;
      }
      
      h4 {
        font-size: 1.1rem;
        color: #333;
        margin-bottom: 0.8rem;
      }
      
      p {
        color: #666;
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 0.5rem;
      }
      
      a {
        display: block;
        color: #5470c6;
        text-decoration: none;
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
        
        &:hover {
          color: #91cc75;
          text-decoration: underline;
        }
      }
    }
  }
  
  .footer-bottom {
    border-top: 1px solid #e0e0e0;
    padding: 1.5rem 2rem;
    text-align: center;
    color: #999;
    font-size: 0.85rem;
    
    p {
      margin: 0.3rem 0;
    }
  }
}

@media (max-width: 768px) {
  .app-footer .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
