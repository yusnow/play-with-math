# 🚀 项目设置指南

本指南将帮助您在本地Mac上完整搭建"玩转数学 - 自然之数"项目。

---

## 📋 前置准备

### 1. 安装必要软件

#### Node.js 和 npm
```bash
# 检查是否已安装
node -v  # 应该 >= 18.0.0
npm -v   # 应该 >= 9.0.0

# 如果未安装，访问官网下载：
# https://nodejs.org/  （推荐下载LTS版本）

# 或使用 Homebrew 安装（推荐）
brew install node
```

#### Git
```bash
# 检查是否已安装
git --version

# 如果未安装
brew install git

# 配置Git（首次使用）
git config --global user.name "您的名字"
git config --global user.email "guanghua.yu@gmail.com"
```

---

## 🏗️ 项目初始化

### 步骤1：执行初始化脚本

我已经为您准备好了完整的初始化脚本，请按以下步骤操作：

```bash
# 1. 下载初始化脚本
# (脚本已保存在 /tmp/init-project.sh)

# 2. 复制到您的工作目录
cp /tmp/init-project.sh ~/Desktop/

# 3. 添加执行权限
chmod +x ~/Desktop/init-project.sh

# 4. 执行脚本
cd ~/Desktop
./init-project.sh

# 脚本会自动：
# - 创建 /Users/yugh/Dev/playwithmath 目录
# - 初始化Git仓库
# - 创建完整的项目结构
# - 生成package.json等配置文件
```

### 步骤2：复制核心代码文件

```bash
# 进入项目目录
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e

# 复制AI模型注册表
cp /tmp/modelRegistry.ts src/ai-integration/

# 复制路由配置
cp /tmp/router-index.ts src/router/index.ts

# 复制主入口文件
cp /tmp/main.ts src/

# 复制主App组件
cp /tmp/App.vue src/

# 复制README
cd /Users/yugh/Dev/playwithmath
cp /tmp/README.md ./
```

### 步骤3：安装依赖

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e

# 安装所有依赖（这会需要5-10分钟）
npm install

# 如果遇到权限问题
sudo npm install

# 如果npm速度慢，可以使用国内镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### 步骤4：创建必要的组件文件

由于初始化脚本只创建了目录，我们需要创建一些基本组件：

```bash
# 进入src目录
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e/src

# 创建首页组件
cat > views/Home.vue << 'EOF'
<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="title">🎓 玩转数学 - 自然之数</h1>
      <p class="subtitle">探索欧拉常数 e 的奇妙世界</p>
      
      <div class="mascot-intro">
        <img src="@/assets/images/mascot/standard.png" alt="猫老师" class="mascot-img" />
        <p class="mascot-speech">嗨！我是猫老师，让我带你探索数学的美妙~ 😺</p>
      </div>
      
      <div class="chapter-grid">
        <router-link 
          v-for="chapter in chapters" 
          :key="chapter.id"
          :to="chapter.path"
          class="chapter-card"
        >
          <div class="chapter-icon">{{ chapter.icon }}</div>
          <h3>{{ chapter.title }}</h3>
          <p>{{ chapter.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const chapters = [
  { id: 1, path: '/chapter1', icon: '📜', title: '第1章：e的诞生', description: '历史故事' },
  { id: 2, path: '/chapter2', icon: '🏦', title: '第2章：复利魔法', description: '银行计算' },
  { id: 3, path: '/chapter3', icon: '✨', title: '第3章：神奇特性', description: '导数与级数' },
  { id: 4, path: '/chapter4', icon: '💎', title: '第4章：欧拉宝石', description: '欧拉公式' },
  { id: 5, path: '/chapter5', icon: '🌍', title: '第5章：生活应用', description: '实际场景' },
  { id: 6, path: '/chapter6', icon: '🎮', title: '第6章：挑战探索', description: '游戏习题' },
];
</script>

<style scoped lang="scss">
.home {
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  
  .title {
    font-size: 48px;
    color: #2E86DE;
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 20px;
    color: #666;
    margin-bottom: 40px;
  }
}

.mascot-intro {
  margin: 40px 0;
  
  .mascot-img {
    width: 200px;
    height: 200px;
  }
  
  .mascot-speech {
    font-size: 18px;
    color: #333;
    margin-top: 20px;
  }
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.chapter-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
  
  .chapter-icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #2E86DE;
  }
  
  p {
    color: #666;
  }
}
</style>
EOF

# 创建其他基本组件（占位符，后续完善）
for i in {1..6}; do
cat > views/Chapter${i}.vue << EOF
<template>
  <div class="chapter${i}">
    <h1>第${i}章内容</h1>
    <p>正在开发中...</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
// 章节${i}的逻辑
</script>

<style scoped>
.chapter${i} {
  padding: 40px;
}
</style>
EOF
done

# 创建About和Lab页面
cat > views/About.vue << 'EOF'
<template>
  <div class="about">
    <h1>关于项目</h1>
    <p>玩转数学 - 自然之数</p>
  </div>
</template>
EOF

cat > views/Lab.vue << 'EOF'
<template>
  <div class="lab">
    <h1>互动实验室</h1>
    <p>即将推出...</p>
  </div>
</template>
EOF

cat > views/NotFound.vue << 'EOF'
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>
EOF
```

### 步骤5：创建基础组件

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e/src/components

# AppHeader组件
cat > common/AppHeader.vue << 'EOF'
<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="logo">
        🎓 玩转数学
      </router-link>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/lab">实验室</router-link>
        <router-link to="/about">关于</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 15px 20px;
  
  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: #2E86DE;
  }
  
  .nav {
    display: flex;
    gap: 20px;
    
    a {
      text-decoration: none;
      color: #333;
      
      &:hover {
        color: #2E86DE;
      }
      
      &.router-link-active {
        color: #2E86DE;
        font-weight: bold;
      }
    }
  }
}
</style>
EOF

# AppFooter组件
cat > common/AppFooter.vue << 'EOF'
<template>
  <footer class="app-footer">
    <p>© 2025 玩转数学 | 让数学变得有趣</p>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #2E86DE;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}
</style>
EOF

# 创建占位符组件（后续完善）
touch ai/AIChatButton.vue
touch ai/AIChatPanel.vue
touch common/MascotCat.vue
touch common/GlobalLoading.vue

echo "export default {};" > ai/AIChatButton.vue
echo "export default {};" > ai/AIChatPanel.vue
echo "export default {};" > common/MascotCat.vue
echo "export default {};" > common/GlobalLoading.vue
```

---

## ▶️ 启动项目

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e

# 启动开发服务器
npm run dev

# 您会看到类似输出：
# VITE v5.0.11  ready in 1234 ms
# ➜  Local:   http://localhost:3000/
# ➜  Network: use --host to expose

# 在浏览器打开：http://localhost:3000
```

---

## 🔗 连接到GitHub

```bash
cd /Users/yugh/Dev/playwithmath

# 1. 在GitHub创建新仓库（通过网页操作）
# 访问：https://github.com/new
# 仓库名：play-with-math
# 设为Public或Private
# 不要初始化README（我们已经有了）

# 2. 关联远程仓库（替换为您实际的用户名）
git remote add origin https://github.com/您的用户名/play-with-math.git

# 3. 首次提交
git add .
git commit -m "🎉 项目初始化：玩转数学-自然之数"

# 4. 推送到GitHub
git branch -M main
git push -u origin main

# 如果遇到认证问题，使用Personal Access Token
# 访问：https://github.com/settings/tokens
# 生成token后，使用token代替密码
```

---

## 🤖 配置AI模型

### 方式1：界面配置（推荐）

1. 启动项目后，点击右下角AI助手按钮
2. 选择您想用的模型
3. 输入API Key
4. 点击保存

### 方式2：环境变量配置

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e

# 创建.env文件
cp .env.example .env

# 编辑.env文件，填入您的API Keys
nano .env

# 或使用VS Code编辑
code .env
```

---

## 🎨 生成吉祥物（小猫形象）

我们将使用AI生成吉祥物图像：

```bash
# 安装图像生成需要的工具（如果要在本地生成）
# 或者直接使用在线AI图像生成服务：
# - DALL-E 3 (OpenAI)
# - Midjourney
# - Stable Diffusion
# - 文心一格（百度）

# 提示词参考：
"A cute anthropomorphic cat mascot wearing a scholar's robe, 
friendly smile, big expressive eyes, holding a book about mathematics, 
cartoon style, kawaii, pastel colors, white background, 
full body character design, multiple emotions"
```

生成后保存到：
```
public/assets/images/mascot/
├── standard.png      # 标准形象
├── happy.png         # 开心表情
├── thinking.png      # 思考表情
├── excited.png       # 兴奋表情
└── confused.png      # 困惑表情
```

---

## 📝 开发建议

### 推荐的开发工具

1. **VS Code**（代码编辑器）
   ```bash
   brew install --cask visual-studio-code
   ```
   
   推荐扩展：
   - Vue Language Features (Volar)
   - TypeScript Vue Plugin (Volar)
   - ESLint
   - Prettier

2. **浏览器开发者工具**
   - Chrome DevTools
   - Vue.js devtools扩展

### 目录打开方式

```bash
# 用VS Code打开项目
cd /Users/yugh/Dev/playwithmath
code .

# 或在项目目录右键 -> 使用VS Code打开
```

---

## ❓ 常见问题

### Q1: npm install 很慢怎么办？
```bash
# 使用国内镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### Q2: 端口3000被占用？
```bash
# 修改端口（编辑vite.config.ts）
server: {
  port: 3001,  # 改为其他端口
}
```

### Q3: 找不到某个模块？
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
```

### Q4: Git推送失败？
```bash
# 使用SSH方式（推荐）
# 1. 生成SSH密钥
ssh-keygen -t ed25519 -C "guanghua.yu@gmail.com"

# 2. 添加到GitHub
# 复制 ~/.ssh/id_ed25519.pub 内容
# 到 https://github.com/settings/keys 添加

# 3. 修改远程地址
git remote set-url origin git@github.com:您的用户名/play-with-math.git
```

---

## 🎉 完成！

如果一切顺利，您现在应该能够：
- ✅ 在浏览器访问 http://localhost:3000
- ✅ 看到项目首页
- ✅ 导航到各个章节（虽然内容还在开发中）
- ✅ 代码已推送到GitHub

**下一步：开始开发具体章节内容！** 🚀

---

有任何问题随时询问我！😊
