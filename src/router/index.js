import { createRouter, createWebHistory } from 'vue-router'
import menu from '../constant/menu.ts'

const routerComponent={
  Home:()=>import('../views/Home.vue'),
  Saolei:()=>import('../views/Saolei.vue'),
  Shudu:()=>import('../views/Shudu.vue'),
  Wuziqi:()=>import('../views/Wuziqi/index.vue'),
  Xiangqi:()=>import('../views/Xiangqi/index.vue'),
  Yanglegeyang:()=>import('../views/Yanglegeyang/index.vue'),
}

const addComponent=(menu)=>{
  for (const key in routerComponent) {
    menu.forEach(e=>{
      if(e.name.toLowerCase()==key.toLowerCase()){
        e.component=routerComponent[key];
      }
      if (e.children) {
        addComponent(e.children);
      }
    })
  }
}
addComponent(menu);

const redirectIndex = 2;//重定向菜单下标

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:menu[redirectIndex].path,
      name: menu[redirectIndex].name,
    },
    ...menu
  ]
})

export default router
