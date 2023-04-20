import { createRouter, createWebHistory } from 'vue-router'
import menu from '../constant/menu.ts'
import Saolei from '../views/Saolei.vue';
import Shudu from '../views/Shudu.vue';
import Wuziqi from '../views/Wuziqi/index.vue';
import Xiangqi from '../views/Xiangqi/index.vue';
import Home from '../views/Home.vue';

const routerComponent={
  Home:()=>import('../views/Home.vue'),
  Saolei:()=>import('../views/Saolei.vue'),
  Shudu:()=>import('../views/Shudu.vue'),
  Wuziqi:()=>import('../views/Wuziqi/index.vue'),
  Xiangqi:()=>import('../views/Xiangqi/index.vue'),
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/saolei',
      name: 'saolei',
    },
    ...menu
  ]
})

export default router