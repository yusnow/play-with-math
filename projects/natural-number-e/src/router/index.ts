/**
 * 路由配置
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页 - 玩转数学·自然之数',
      description: '探索欧拉常数e的交互式学习平台'
    }
  },
  {
    path: '/chapter1',
    name: 'Chapter1',
    component: () => import('@/views/Chapter1.vue'),
    meta: {
      title: '第1章：e的诞生故事',
      chapter: 1,
      description: '了解自然常数e的发现历史'
    }
  },
  {
    path: '/chapter2',
    name: 'Chapter2',
    component: () => import('@/views/Chapter2.vue'),
    meta: {
      title: '第2章：银行里的数学魔法',
      chapter: 2,
      description: '通过复利计算理解e的极限定义'
    }
  },
  {
    path: '/chapter3',
    name: 'Chapter3',
    component: () => import('@/views/Chapter3.vue'),
    meta: {
      title: '第3章：e的神奇特性',
      chapter: 3,
      description: '探索e的导数、泰勒级数、连分数'
    }
  },
  {
    path: '/chapter4',
    name: 'Chapter4',
    component: () => import('@/views/Chapter4.vue'),
    meta: {
      title: '第4章：欧拉的宝石',
      chapter: 4,
      description: '欧拉公式和欧拉恒等式的美妙'
    }
  },
  {
    path: '/chapter5',
    name: 'Chapter5',
    component: () => import('@/views/Chapter5.vue'),
    meta: {
      title: '第5章：e在生活中的应用',
      chapter: 5,
      description: '放射性衰变、人口增长等实际应用'
    }
  },
  {
    path: '/chapter6',
    name: 'Chapter6',
    component: () => import('@/views/Chapter6.vue'),
    meta: {
      title: '第6章：挑战与探索',
      chapter: 6,
      description: '游戏化习题，巩固所学知识'
    }
  },
  {
    path: '/lab',
    name: 'Lab',
    component: () => import('@/views/Lab.vue'),
    meta: {
      title: '互动实验室',
      description: '自由探索数学之美'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于项目',
      description: '了解玩转数学项目'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  
  // 设置meta描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string);
    }
  }
  
  next();
});

// 路由后置守卫
router.afterEach((to, from) => {
  // 页面访问统计（可选）
  if (import.meta.env.PROD) {
    // 集成统计服务，如 Google Analytics
  }
});

export default router;
