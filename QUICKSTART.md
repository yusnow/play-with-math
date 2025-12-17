# ⚡ 快速启动指南

5分钟内让项目在你的 Mac 上运行起来!

---

## 🎯 目标

完成以下步骤后,你将:
- ✅ 在本地运行项目
- ✅ 看到交互式的第1章: e的发现之旅
- ✅ 使用AI助手进行数学问答

---

## 📦 前置要求

确保你的Mac已安装:

```bash
# 检查 Node.js 版本 (需要 >= 18.0.0)
node --version

# 检查 npm 版本 (需要 >= 9.0.0)
npm --version

# 如果未安装,使用 Homebrew 安装
brew install node
```

---

## 🚀 5步启动

### 步骤 1: 下载项目到本地

**方法 A: 从沙箱下载**

项目文件位于沙箱路径: `/home/user/playwithmath`

你可以通过以下computer://链接访问主要文件和文件夹:

- [📂 整个项目根目录](computer:///home/user/playwithmath)
- [📂 src 源代码目录](computer:///home/user/playwithmath/projects/natural-number-e/src)  
- [📄 package.json](computer:///home/user/playwithmath/projects/natural-number-e/package.json)
- [📄 项目 README](computer:///home/user/playwithmath/projects/natural-number-e/README.md)

请将下载的文件解压到: `/Users/yugh/Dev/playwithmath/`

**方法 B: 如果有Git仓库访问权限**

```bash
git clone YOUR_REPO_URL
cd playwithmath
```

### 步骤 2: 进入项目目录

```bash
cd /Users/yugh/Dev/playwithmath/projects/natural-number-e
```

### 步骤 3: 安装依赖

```bash
npm install
```

⏱️ 预计耗时: 1-2分钟

### 步骤 4: 启动开发服务器

```bash
npm run dev
```

你应该看到:

```
  VITE v5.4.21  ready in 524 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

### 步骤 5: 在浏览器中打开

访问: **http://localhost:3000**

🎉 **恭喜!项目已成功运行!**

---

## 🎮 体验核心功能

### 1. 探索首页

- 查看 3D 对数螺旋动画
- 浏览 6 个学习章节卡片
- 了解特色功能

### 2. 进入第1章

点击 "开始探索" 或直接访问: http://localhost:3000/chapter1

**试试这些交互**:
- 📊 拖动 "计息次数" 滑块到 10000,观察数值接近 e
- 📜 点击历史时间线上的事件,查看详情
- 🤔 选择不同的 "e命名理论",查看可信度评分

### 3. 使用 AI 助手

1. 点击右下角的 **AI 助手悬浮按钮** (蓝色圆形)
2. 点击 **设置图标** ⚙️
3. 选择一个 AI 模型 (推荐: DeepSeek 或 GLM-4)
4. 输入你的 API Key
5. 点击 "关闭",回到聊天界面
6. 试试问: "e等于多少?" 或 "欧拉公式是什么?"

### 4. 与吉祥物互动

- 小猫吉祥物会在特定场景出现
- 点击小猫可以看到消息气泡
- 不同场景下小猫有不同情绪

---

## 🛠️ 常见问题

### Q1: npm install 报错?

**问题**: `EACCES: permission denied`

**解决**:
```bash
sudo chown -R $USER ~/.npm
npm install
```

### Q2: 端口 3000 被占用?

**问题**: `Port 3000 is in use`

**解决**:
```bash
# 方法1: 杀掉占用端口的进程
lsof -ti:3000 | xargs kill -9

# 方法2: 使用其他端口
npm run dev -- --port 3001
```

### Q3: 页面空白或报错?

**检查浏览器控制台**:
1. 右键 > 检查元素
2. 查看 Console 标签页
3. 查找红色错误信息

**常见原因**:
- 依赖未完全安装: 重新 `npm install`
- 浏览器缓存: Ctrl+Shift+R 强制刷新
- Node版本过低: 升级到 18.0+

### Q4: AI 助手无法使用?

**确保**:
1. ✅ 已选择 AI 模型
2. ✅ 已输入正确的 API Key
3. ✅ 网络连接正常
4. ✅ API Key 有足够的配额

**获取 API Key**:
- DeepSeek: https://platform.deepseek.com
- 智谱 GLM: https://open.bigmodel.cn
- 百度文心: https://console.bce.baidu.com/qianfan

### Q5: 样式显示异常?

**可能原因**:
- 字体未加载: 检查网络连接
- CSS未编译: 重启开发服务器

---

## 📚 下一步

### 探索更多
- 📖 阅读 [项目 README](./projects/natural-number-e/README.md)
- 📊 查看 [项目状态报告](./PROJECT_STATUS.md)
- 🚀 学习 [部署指南](./DEPLOYMENT_GUIDE.md)

### 开发
- 修改 `src/views/Chapter1.vue` 看看效果
- 添加新的交互动画
- 集成更多 AI 模型

### 贡献
- 提出Issue: 报告 bug 或建议新功能
- 提交PR: 贡献代码或文档
- 分享: 告诉更多人这个项目

---

## 🎨 视觉素材生成 (可选)

如果你想生成吉祥物图片:

### 使用 DALL-E 3

1. 访问: https://chatgpt.com (需要 ChatGPT Plus)
2. 输入 Prompt:
```
A cute anthropomorphic kitten mascot wearing a blue scholar's robe, 
holding a math book with "e≈2.718..." written on it. 
Cartoon style, bright pastel colors, white background.
Generate with happy emotion.
```
3. 下载生成的图片
4. 保存到: `public/assets/images/mascot/cat-happy.png`
5. 重复生成其他情绪 (thinking, excited, curious, studying)

### 使用 Midjourney

1. 加入 Midjourney Discord
2. 使用命令:
```
/imagine a cute anthropomorphic kitten mascot, blue scholar's robe, 
math book with "e≈2.718", cartoon style, pastel colors, white background --v 6
```
3. 选择最佳结果并下载

---

## 💡 快速提示

### 开发服务器
```bash
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 预览生产构建
```

### 热更新
修改代码后,页面会自动刷新,无需手动刷新浏览器

### 推荐编辑器
- **VS Code** + Vue Language Features (Volar) 插件
- **WebStorm** (内置Vue支持)

### 调试技巧
- 使用 Vue DevTools 浏览器扩展
- 在代码中添加 `console.log()` 或 `debugger`
- 查看 Network 标签监控 API 请求

---

## 🆘 获取帮助

### 文档资源
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vite 文档](https://cn.vitejs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/)

### 联系方式
- 📧 Email: guanghua.yu@gmail.com
- 🐙 GitHub Issues: (创建仓库后)
- 💬 Discord: (可选 - 未来建立社区)

---

## ✅ 检查清单

启动前确认:
- [ ] Node.js >= 18.0.0
- [ ] npm >= 9.0.0
- [ ] 项目文件已下载到 `/Users/yugh/Dev/playwithmath/`
- [ ] 端口 3000 未被占用

运行后确认:
- [ ] 首页正常显示
- [ ] 第1章可以访问
- [ ] 参数滑块可以拖动
- [ ] 图表正常显示
- [ ] AI 助手按钮可见

---

**准备好了吗?开始你的数学探索之旅!** 🚀

有任何问题,随时查阅文档或联系开发者。

**祝你探索愉快!** 🎉
