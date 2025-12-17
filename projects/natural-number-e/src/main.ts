/**
 * 玩转数学 - 自然之数
 * 主入口文件
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';

// 全局样式
import './styles/variables.scss';
import './styles/hand-drawn.scss';
import './styles/animations.scss';

// 创建应用实例
const app = createApp(App);

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 使用插件
app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  // Element Plus 全局配置
  size: 'default',
  zIndex: 3000,
});

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err);
  console.error('错误信息:', info);
  // 可以集成错误上报服务
};

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('全局警告:', msg);
  console.warn('警告追踪:', trace);
};

// 挂载应用
app.mount('#app');

// 开发环境提示
if (import.meta.env.DEV) {
  console.log(`
  🎓 玩转数学 - 自然之数
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📚 探索欧拉常数 e 的奇妙世界
  🤖 支持23+个AI模型智能辅导
  🎨 精美手绘风格交互式学习
  
  开发模式已启动 🚀
  访问: http://localhost:3000
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

// 性能监控（生产环境）
if (import.meta.env.PROD) {
  // 可集成性能监控服务，如 Google Analytics, Sentry等
}
