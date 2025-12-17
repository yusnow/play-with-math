<template>
  <div class="not-found">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <div class="mascot-sad">😿</div>
      <p class="error-message">哎呀！页面走丢了...</p>
      <p class="error-hint">猫老师也找不到这个页面呢</p>
      <router-link to="/" class="home-btn">返回首页</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  
  .error-code {
    font-size: 120px;
    color: #2E86DE;
    margin: 0;
    font-weight: bold;
  }
  
  .mascot-sad {
    font-size: 80px;
    margin: 20px 0;
    animation: shake 0.5s ease-in-out infinite alternate;
  }
  
  .error-message {
    font-size: 28px;
    color: #333;
    margin: 20px 0;
  }
  
  .error-hint {
    font-size: 18px;
    color: #666;
    margin-bottom: 40px;
  }
  
  .home-btn {
    display: inline-block;
    padding: 15px 40px;
    background: #2E86DE;
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-size: 18px;
    transition: all 0.3s ease;
    
    &:hover {
      background: #1e5ba8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 134, 222, 0.3);
    }
  }
}

@keyframes shake {
  0% { transform: rotate(-5deg); }
  100% { transform: rotate(5deg); }
}
</style>
