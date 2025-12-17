# ⚡ 快速开始指南

这是一个3步快速启动"玩转数学 - 自然之数"项目的简化指南。

---

## 🎯 3步走

### 步骤 1：下载并执行初始化脚本

```bash
# 在终端执行以下命令（复制整段）
curl -o ~/Desktop/init-project.sh https://YOUR_URL/init-project.sh && \
chmod +x ~/Desktop/init-project.sh && \
~/Desktop/init-project.sh
```

**或者手动操作：**
```bash
# 1. 下载init-project.sh到桌面
# 2. 打开终端
cd ~/Desktop
chmod +x init-project.sh
./init-project.sh
```

### 步骤 2：安装依赖并启动

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
npm install
npm run dev
```

### 步骤 3：打开浏览器

访问：**http://localhost:3000**

---

## 📦 需要的文件清单

请确保您有以下文件（我已为您准备好）：

- ✅ `/tmp/init-project.sh` - 初始化脚本
- ✅ `/tmp/modelRegistry.ts` - AI模型配置
- ✅ `/tmp/router-index.ts` - 路由配置
- ✅ `/tmp/main.ts` - 入口文件
- ✅ `/tmp/App.vue` - 主组件
- ✅ `/tmp/README.md` - 项目说明
- ✅ `/tmp/SETUP_GUIDE.md` - 详细设置指南

---

## 🔧 全自动设置（推荐）

如果您想一键完成所有设置，执行以下脚本：

```bash
#!/bin/bash
# 全自动安装脚本

echo "🚀 开始自动安装【玩转数学 - 自然之数】"

# 1. 执行初始化
/tmp/init-project.sh

# 2. 复制核心文件
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
cp /tmp/modelRegistry.ts src/ai-integration/
cp /tmp/router-index.ts src/router/index.ts
cp /tmp/main.ts src/
cp /tmp/App.vue src/

# 3. 复制README
cd /Users/yugh/Dev/playwithmath
cp /tmp/README.md ./

# 4. 安装依赖
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
npm install

echo "✅ 安装完成！"
echo "请执行: cd /Users/yugh/Dev/playwithmath/projects/natural-number-e && npm run dev"
```

保存以上内容为 `auto-install.sh`，然后：
```bash
chmod +x auto-install.sh
./auto-install.sh
```

---

## 🆘 遇到问题？

1. **npm install失败？**
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

2. **权限问题？**
   ```bash
   sudo chown -R $(whoami) /Users/yugh/Dev/playwithmath
   ```

3. **端口被占用？**
   ```bash
   # 修改 vite.config.ts 中的端口号
   # 或者杀掉占用3000端口的进程
   lsof -ti:3000 | xargs kill -9
   ```

---

## 📞 获取帮助

- 查看详细文档：`/tmp/SETUP_GUIDE.md`
- 项目README：`/Users/yugh/Dev/playwithmath/README.md`
- 联系邮箱：guanghua.yu@gmail.com

---

**现在就开始您的数学之旅吧！** 🎓✨
