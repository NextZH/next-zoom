/**
 * 菜单配置规则
 * 
 * 1.只有一级的菜单的path前面要加斜杠
 * 2.只有两级的菜单的path，一级前面加斜杠，二级不加
 * 3.有三级以上菜单时，在最里面这层菜单之外的所有父菜单都写上完整path(避免多次点击菜单，重复添加中间path)
 * 
 * exp:   
 *      只有一级：
 *          一级：主页 /home
 *      只有两级：
 *          一级：功能 /gongneng
 *          二级：音乐 music
 *      三级以上：
 *        一级：功能 /gongneng
 *        二级：背包 /gongneng/beibao
 *        三级：测试 test
 * 
 */

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut,
  Headset,
} from '@element-plus/icons-vue'

const basePath = '/src/assets/menuIcon/';

const menu = [
  {
    path: '/home',
    name: 'home',
    title: '主页',
    icon: IconMenu,
    meta:{
      important:true,
      isGame:false,
      isShow:true,
    },
  },
  {
    path: '/saolei',
    name: 'saolei',
    title: '扫雷',
    iconPath: 'saolei.svg',
    meta:{
      important:true,
      isGame:true,
      isShow:true,
    },
  },
  {
    path: '/craft',
    name: 'craft',
    title: '1024',
    iconPath: 'shudu.svg',
    meta:{
      important:true,
      isGame:true,
      isShow:true,
    },
  },
  {
    path: '/wuziqi',
    name: 'wuziqi',
    title: '五子棋',
    iconPath: 'wuziqi.svg',
    meta:{
      important:true,
      isGame:true,
      isShow:true,
    },
  },
  {
    path: '/xiangqi',
    name: 'xiangqi',
    title: '象棋',
    iconPath: 'xiangqi.svg',
    meta:{
      important:true,
      isGame:true,
      isShow:true,
    },
  },
  {
    path: '/yanglegeyang',
    name: 'yanglegeyang',
    title: '羊了个羊',
    iconPath: 'yanglegeyang.svg',
    meta:{
      important:true,
      isGame:true,
      isShow:true,
    },
  },
  {
    path: '/gongneng',
    name: 'gongneng',
    title: '功能',
    icon: Setting,
    meta:{
      important:true,
      isGame:false,
      isShow:true,
    },
    children: [
      {
        path: 'music',
        name: 'music',
        title: '音乐',
        icon: Headset,
        meta:{
          important:true,
          isGame:false,
          isShow:true,
        },
        children:[
          {
            path: 'singerDetail',
            name: 'singerDetail',
            title: '歌手详情',
            icon: Location,
            meta:{
              important:true,
              isGame:false,
              isShow:false,
            },
          },
        ]
      },
      {
        path: '/gongneng/beibao',//有三级以上菜单时，尽量在最里面这层菜单之外的所有父菜单都写上完整path
        name: 'beibao',
        title: '背包',
        icon: Location,
        meta:{
          important:false,
          isGame:false,
          isShow:true,
        },
        children:[
          {
            path: 'test',
            name: 'test',
            title: '测试',
            icon: Location,
            meta:{
              important:true,
              isGame:false,
              isShow:true,
            },
          },
        ]
      },
      {
        path: 'juese',
        name: 'juese',
        title: '角色',
        icon: ZoomOut,
        meta:{
          important:false,
          isGame:false,
          isShow:true,
        },
      },
      {
        path: 'tujian',
        name: 'tujian',
        title: '图鉴',
        icon: Document,
        meta:{
          important:false,
          isGame:false,
          isShow:true,
        },
      },
      {
        path: 'qianghua',
        name: 'qianghua',
        title: '强化',
        icon: Setting,
        meta:{
          important:false,
          isGame:false,
          isShow:true,
        },
      },
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    title: '设置',
    icon: Setting,
    meta:{
      important:true,
      isGame:false,
      isShow:true,
    },
    children: [
      {
        path: 'menu',
        name: 'menu',
        title: '菜单设置',
        icon: Location,
        meta:{
          important:true,
          isGame:false,
          isShow:true,
        },
      },
      {
        path: 'theme',
        name: 'theme',
        title: '主题设置',
        icon: Location,
        meta:{
          important:true,
          isGame:false,
          isShow:true,
        },
      },
    ]
  },
]
const formatMenu = (arr: any) => {
  arr.forEach((e: any) => {
    if (e.iconPath) {
      e.iconPath = basePath + e.iconPath;
    }
    if (e.children) {
      formatMenu(e.children);
    }
  });
}
formatMenu(menu);

export default menu;