import { createRouter, createWebHistory } from 'vue-router';
import menu from '../constant/menu.ts';
import NotFound from '../views/NotFound.vue';

const routerComponent = {
  Home: () => import('../views/Home.vue'),
  Saolei: () => import('../views/Saolei/index.vue'),
  Shudu: () => import('../views/Shudu.vue'),
  Wuziqi: () => import('../views/Wuziqi/index.vue'),
  Xiangqi: () => import('../views/Xiangqi/index.vue'),
  Yanglegeyang: () => import('../views/Yanglegeyang/index.vue'),
  Menu: () => import('../views/Setting/Menu/index.vue'),
  Theme: () => import('../views/Setting/Theme/index.vue'),
  BlankPage: () => import('../views/BlankPage.vue'),
}

const addComponent = (menu) => {
  for (const key in routerComponent) {
    menu.forEach(e => {
      if (e.name.toLowerCase() == key.toLowerCase()) {
        e.component = routerComponent[key];
      }
      if (e.children) {
        addComponent(e.children);
      }
    })
    if (key == 'BlankPage') {
      menu.forEach(e => {
        if (!e.component&&!e.children) {
          e.component = routerComponent[key];
        }
      })
    }
  }
}
addComponent(menu);

// const redirectIndex = 2;//重定向菜单下标
const redirectPath = localStorage.getItem('defaultPath');//重定向到上一次打开的菜单项

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // redirect:menu[redirectIndex].path,
      redirect: redirectPath,
    },
    ...menu,
    {
      path: '/:catchAll(.*)',
      name:'notFound',
      component:NotFound,
    },
  ]
})

export default router
