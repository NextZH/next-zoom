import { createRouter, createWebHistory } from 'vue-router'
import Saolei from '../views/Saolei.vue';
import Wuziqi from '../views/Wuziqi/index.vue';
import Xiangqi from '../views/Xiangqi/index.vue';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home',
      name: 'saolei',
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/saolei',
      name: 'saolei',
      component: Saolei
    },
    {
      path: '/wuziqi',
      name: 'wuziqi',
      component: Wuziqi
    },
    {
      path: '/xiangqi',
      name: 'xiangqi',
      component: Xiangqi
    },
  ]
})

export default router
