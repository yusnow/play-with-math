<template>
  <div class="lab">
    <div class="lab-header">
      <router-link to="/" class="back-btn">← 返回首页</router-link>
      <h1>🧪 互动实验室</h1>
      <p>自由探索数学之美</p>
    </div>
    <div class="lab-content">
      <p class="coming-soon">即将推出...</p>
      <p class="description">在这里您将能够：</p>
      <ul class="features">
        <li>📊 绘制任意数学函数</li>
        <li>🔢 调节参数观察变化</li>
        <li>🧮 进行数学计算</li>
        <li>🎨 创造您自己的可视化</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lab {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.lab-header {
  text-align: center;
  margin-bottom: 40px;
  
  .back-btn {
    display: inline-block;
    margin-bottom: 20px;
    color: #27AE60;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  h1 {
    font-size: 42px;
    color: #27AE60;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 18px;
    color: #666;
  }
}

.lab-content {
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  
  .coming-soon {
    font-size: 24px;
    color: #F39C12;
    margin-bottom: 30px;
  }
  
  .description {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin: 30px auto 0;
    max-width: 500px;
    
    li {
      font-size: 18px;
      padding: 15px;
      margin: 10px 0;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: left;
    }
  }
}
</style>
