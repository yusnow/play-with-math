<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-info">
        <p class="copyright">© 2025 玩转数学 | 让数学变得有趣</p>
        <p class="author">Created by Yu Guanghua</p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/yughua/play-with-math" target="_blank" rel="noopener">
          GitHub
        </a>
        <span class="separator">|</span>
        <a href="mailto:guanghua.yu@gmail.com">联系我们</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  background: linear-gradient(135deg, #2E86DE 0%, #764ba2 100%);
  color: white;
  padding: 30px 20px;
  margin-top: 60px;
  
  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .footer-info {
    p {
      margin: 5px 0;
      font-size: 14px;
      opacity: 0.9;
    }
    
    .copyright {
      font-size: 16px;
      font-weight: bold;
    }
  }
  
  .footer-links {
    display: flex;
    align-items: center;
    gap: 15px;
    
    a {
      color: white;
      text-decoration: none;
      font-size: 14px;
      transition: opacity 0.3s ease;
      
      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }
    
    .separator {
      opacity: 0.5;
    }
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
