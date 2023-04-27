import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut,
  SwitchFilled,
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
    },
  },
  {
    path: '/saolei',
    name: 'saolei',
    title: '扫雷',
    iconPath: 'saolei.svg',
    meta:{
      important:true,
    },
  },
  {
    path: '/shudu',
    name: 'shudu',
    title: '数独',
    iconPath: 'shudu.svg',
    meta:{
      important:true,
    },
  },
  {
    path: '/wuziqi',
    name: 'wuziqi',
    title: '五子棋',
    iconPath: 'wuziqi.svg',
    meta:{
      important:true,
    },
  },
  {
    path: '/xiangqi',
    name: 'xiangqi',
    title: '象棋',
    iconPath: 'xiangqi.svg',
    meta:{
      important:true,
    },
  },
  {
    path: '/yanglegeyang',
    name: 'yanglegeyang',
    title: '羊了个羊',
    iconPath: 'yanglegeyang.svg',
    meta:{
      important:true,
    },
  },
  {
    path: '/gongneng',
    name: 'gongneng',
    title: '功能',
    icon: Setting,
    meta:{
      important:true,
    },
    children: [
      {
        path: '/beibao',
        name: 'beibao',
        title: '背包',
        icon: Location,
        meta:{
          important:false,
        },
      },
      {
        path: '/juese',
        name: 'juese',
        title: '角色',
        icon: ZoomOut,
        meta:{
          important:false,
        },
      },
      {
        path: '/tujian',
        name: 'tujian',
        title: '图鉴',
        icon: Document,
        meta:{
          important:false,
        },
      },
      {
        path: '/qianghua',
        name: 'qianghua',
        title: '强化',
        icon: Setting,
        meta:{
          important:false,
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
    },
    children: [
      {
        path: '/menu',
        name: 'menu',
        title: '菜单设置',
        icon: Location,
        meta:{
          important:true,
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