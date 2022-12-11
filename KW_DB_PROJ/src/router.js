import VueRouter from 'vue-router';
import store from '@/store/index.js'

const authFilter = () => (to, from, next) => {
  console.log(to, from, next);
  store.commit('authCheck');

  return next()
}

const adminFilter = () => (to, from, next) => {
    console.log(to, from, next);
    store.commit('adminCheck');

    return next()
}

const route = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    component: () => import('@/components/MainPage'),
    name: 'Main',
  },

  { path: '/stock',
    redirect: '/stock/1',
  },
  { path: '/stock/:page',
    component: () => import('@/components/StockBoard'),
    name: 'stock',
    beforeEnter: authFilter(),
  },

  {
    path:'/board/',
    redirect: '/board/list/',
  },
  {
    path:'/board/list',
    redirect: '/board/list/0/1',
  },
  {
    path: '/board/list/:stock/:page',
    component: () => import('@/components/BoardPage'),
    name: 'board',
    beforeEnter: authFilter(),
  },
  {
    path: '/board/article/editor',
    component: () => import('@/components/ArticleEditorPage'),
    name: 'articleEditor',
    beforeEnter: authFilter(),
  },
  {
    path: '/board/article/viewer/:articleIdx',
    component: () => import('@/components/ArticleViewerPage'),
    name: 'articleViewer',
    beforeEnter: authFilter(),
  },

  {
    path: '/login',
    component: () => import('@/components/LoginPage'),
    name: 'loginPage'
  },
  {
    path: '/signup',
    component: () => import('@/components/SignupPage'),
  },
  {
    path: '/password-find',
    component: () => import('@/components/PasswordFindPage'),
    name: 'passwordFindPage'
  },
  {
    path: '/mypage',
    component: () => import('@/components/MyPage'),
    name: 'mypage',
    beforeEnter: authFilter(),
  },

  {
    path: '/stock/info/:stock_code',
    component: () => import('@/components/StockInfo'),
    name: 'stockInfo',
    beforeEnter: authFilter(),
  },

  {
    path: '/admin',
    component: () => import('@/components/AdminConsole'),
    name: 'adminConsole',
    beforeEnter: adminFilter(),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: route,
});

export default router;
