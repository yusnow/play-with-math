# 🚀 部署指南

本文档详细说明如何将"玩转数学"项目从沙箱环境同步到本地,并部署到生产环境。

## 📥 从沙箱下载项目

### 方式 1: 使用 computer:// 协议下载(推荐)

项目文件已经准备好,可以直接下载:

1. **下载整个项目为 ZIP**:
   
   由于项目较大,建议分批下载关键文件夹:

2. **核心源代码**:
   - [src 目录](computer:///home/user/playwithmath/projects/natural-number-e/src)
   - [public 目录](computer:///home/user/playwithmath/projects/natural-number-e/public)

3. **配置文件**:
   - [package.json](computer:///home/user/playwithmath/projects/natural-number-e/package.json)
   - [vite.config.ts](computer:///home/user/playwithmath/projects/natural-number-e/vite.config.ts)
   - [tsconfig.json](computer:///home/user/playwithmath/projects/natural-number-e/tsconfig.json)
   - [index.html](computer:///home/user/playwithmath/projects/natural-number-e/index.html)

4. **文档**:
   - [README.md](computer:///home/user/playwithmath/README.md)
   - [项目 README](computer:///home/user/playwithmath/projects/natural-number-e/README.md)

### 方式 2: 使用 rsync 同步

如果你已经创建了符号链接,可以直接使用 rsync:

```bash
# 从沙箱同步到本地
rsync -av --delete /tmp/playwithmath/ /Users/yugh/Dev/playwithmath/
```

### 方式 3: 直接访问沙箱路径

如果你有沙箱访问权限:

```bash
# 进入沙箱项目目录
cd /home/user/playwithmath/projects/natural-number-e

# 压缩项目
tar -czf /tmp/playwithmath.tar.gz /home/user/playwithmath

# 下载压缩文件
# (使用你的沙箱文件下载工具)
```

## 🏠 本地环境设置

### 1. 创建本地项目目录

```bash
# 在你的 Mac 上
mkdir -p /Users/yugh/Dev/playwithmath
cd /Users/yugh/Dev/playwithmath
```

### 2. 解压并安装依赖

```bash
# 进入项目目录
cd projects/natural-number-e

# 安装依赖
npm install

# 或使用 pnpm (更快)
pnpm install
```

### 3. 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env.local

# 编辑环境变量 (可选)
# AI 模型的 API Key 将由用户在前端配置
vim .env.local
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问: http://localhost:3000

## 🔌 连接 GitHub

### 1. 创建 GitHub 仓库

访问: https://github.com/new

- **仓库名**: `play-with-math`
- **描述**: 玩转数学 - 交互式数学学习平台
- **可见性**: Public
- **不要初始化** README, .gitignore, LICENSE (我们已经有了)

### 2. 连接本地仓库到 GitHub

```bash
cd /Users/yugh/Dev/playwithmath

# 如果还没有初始化 Git
git init
git config user.email "guanghua.yu@gmail.com"
git config user.name "Yu Guanghua"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/play-with-math.git

# 或使用 SSH (推荐)
git remote add origin git@github.com:YOUR_USERNAME/play-with-math.git

# 推送代码
git branch -M main
git add -A
git commit -m "🎉 Initial commit: 玩转数学项目初始化"
git push -u origin main
```

### 3. 配置 GitHub Pages (可选 - 用于演示)

1. 进入仓库 Settings > Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (需要先构建并推送)

```bash
# 安装 gh-pages
npm install -D gh-pages

# package.json 添加 scripts
"deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

## 🌐 部署到生产环境

### 选项 1: Vercel (推荐 - 最简单)

1. **安装 Vercel CLI**:
```bash
npm install -g vercel
```

2. **登录并部署**:
```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
vercel login
vercel
```

3. **配置自定义域名**:
   - 在 Vercel 控制台添加 `playwithmath.xyz`
   - 在域名注册商添加 DNS 记录:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### 选项 2: Netlify

1. **安装 Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **登录并部署**:
```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
netlify login
netlify init
netlify deploy --prod
```

3. **配置域名**: 在 Netlify 控制台设置

### 选项 3: Cloudflare Pages

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 构建设置:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `projects/natural-number-e`
3. 添加自定义域名

### 选项 4: 阿里云 OSS / 腾讯云 COS (国内用户)

1. **构建静态文件**:
```bash
npm run build
```

2. **上传到 OSS**:
```bash
# 安装 ossutil
brew install ossutil

# 配置
ossutil config

# 上传
ossutil cp -r dist/ oss://your-bucket/
```

3. **配置 CDN 和域名**

## 🔐 域名配置

### 购买域名: playwithmath.xyz

推荐注册商:
- **Namecheap**: https://www.namecheap.com
- **GoDaddy**: https://www.godaddy.com
- **阿里云(万网)**: https://wanwang.aliyun.com (国内)

### DNS 配置示例 (Vercel)

| Type  | Name | Value               | TTL  |
|-------|------|---------------------|------|
| A     | @    | 76.76.21.21         | Auto |
| CNAME | www  | cname.vercel-dns.com| Auto |
| CNAME | e    | cname.vercel-dns.com| Auto |

### 子域名规划

- `playwithmath.xyz` - 主站/首页
- `e.playwithmath.xyz` - 自然常数 e 项目
- `pi.playwithmath.xyz` - 圆周率 π 项目 (未来)
- `phi.playwithmath.xyz` - 黄金分割 φ 项目 (未来)
- `api.playwithmath.xyz` - API 服务 (如需要)

## 🎨 生成吉祥物图片

使用 AI 生成吉祥物图片素材:

### 使用 DALL-E 3 / Midjourney

**Prompt**:
```
A cute anthropomorphic kitten mascot character for a math education platform. 
The kitten is wearing a blue scholar's robe, holding a math book with "e≈2.718..." 
written on it. Cartoon style, bright pastel colors, white background. 
Generate 5 different emotions: happy, thinking, excited, curious, and studying.
Each emotion should be a separate image with the same character design.
Style: hand-drawn, playful, suitable for high school students.
```

**保存路径**:
```
public/assets/images/mascot/
  ├── cat-happy.png
  ├── cat-thinking.png
  ├── cat-excited.png
  ├── cat-curious.png
  └── cat-studying.png
```

### 使用 Stable Diffusion (本地生成)

如果你有 GPU:

```bash
# 安装 Stable Diffusion WebUI
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui
./webui.sh

# 访问 http://localhost:7860
# 使用上述 prompt 生成
```

## 📊 性能优化

### 1. 构建优化

```bash
# 分析构建包大小
npm run build -- --report

# 启用 gzip 压缩
# vite.config.ts 中已配置
```

### 2. 图片优化

```bash
# 安装图片优化工具
npm install -D vite-plugin-imagemin

# 压缩 public 目录下的图片
npm run optimize-images
```

### 3. CDN 配置

在 `vite.config.ts` 中配置 CDN:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        paths: {
          vue: 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js',
          'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4/dist/vue-router.esm-browser.js'
        }
      }
    }
  }
})
```

## 🔄 持续集成/部署 (CI/CD)

### GitHub Actions 配置

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd projects/natural-number-e
          npm install
          
      - name: Build
        run: |
          cd projects/natural-number-e
          npm run build
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: projects/natural-number-e
```

## 📧 需要帮助?

遇到问题请:
1. 查看项目 README
2. 搜索 GitHub Issues
3. 发邮件到: guanghua.yu@gmail.com

---

祝部署顺利! 🎉
