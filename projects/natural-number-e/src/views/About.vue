<template>
  <div class="about">
    <div class="about-header">
      <router-link to="/" class="back-btn">← 返回首页</router-link>
      <h1>关于项目</h1>
    </div>
    <div class="about-content">
      <section>
        <h2>🎓 项目简介</h2>
        <p>"玩转数学 - 自然之数"是一个交互式数学学习平台，专注于探索欧拉常数e的奇妙世界。</p>
      </section>
      
      <section>
        <h2>✨ 核心理念</h2>
        <blockquote>
          让学生"看见"数学、"玩转"数学、"爱上"数学！
        </blockquote>
      </section>
      
      <section>
        <h2>🤖 技术栈</h2>
        <ul>
          <li>Vue 3 + TypeScript</li>
          <li>Element Plus UI</li>
          <li>ECharts + Three.js 可视化</li>
          <li>23+个AI模型集成</li>
        </ul>
      </section>
      
      <section>
        <h2>👨‍💻 开发者</h2>
        <p>Yu Guanghua</p>
        <p>Email: guanghua.yu@gmail.com</p>
      </section>
      
      <section>
        <h2>📄 开源协议</h2>
        <p>MIT License</p>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
  
  .back-btn {
    display: inline-block;
    margin-bottom: 20px;
    color: #2E86DE;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  h1 {
    font-size: 36px;
    color: #2E86DE;
  }
}

.about-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  section {
    margin-bottom: 30px;
    
    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 15px;
    }
    
    p, li {
      font-size: 16px;
      line-height: 1.8;
      color: #666;
    }
    
    ul {
      list-style: none;
      padding-left: 20px;
      
      li::before {
        content: '▸ ';
        color: #2E86DE;
        font-weight: bold;
      }
    }
    
    blockquote {
      border-left: 4px solid #F39C12;
      padding-left: 20px;
      margin: 20px 0;
      font-size: 18px;
      font-style: italic;
      color: #555;
    }
  }
}
</style>
