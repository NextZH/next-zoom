import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut,
  SwitchFilled,
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
    path: '/shudu',
    name: 'shudu',
    title: '数独',
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
        path: 'beibao',
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