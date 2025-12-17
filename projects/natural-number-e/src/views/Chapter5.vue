<template>
  <div class="chapter">
    <div class="chapter-header">
      <router-link to="/" class="back-btn">← 返回首页</router-link>
      <h1>第${i}章</h1>
      <p class="dev-notice">🚧 正在开发中...</p>
    </div>
    <div class="chapter-content">
      <p>精彩内容即将呈现！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 章节${i}的逻辑将在这里实现
</script>

<style scoped lang="scss">
.chapter {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.chapter-header {
  text-align: center;
  margin-bottom: 40px;
  
  .back-btn {
    display: inline-block;
    margin-bottom: 20px;
    color: #2E86DE;
    text-decoration: none;
    font-size: 16px;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  h1 {
    font-size: 36px;
    color: #2E86DE;
    margin-bottom: 10px;
  }
  
  .dev-notice {
    color: #F39C12;
    font-size: 18px;
  }
}

.chapter-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>
