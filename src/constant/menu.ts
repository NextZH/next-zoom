import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut
} from '@element-plus/icons-vue'

export default [
  {
    path: '/home',
    name: 'home',
    title: '主页',
    icon: IconMenu,
  },
  {
    path: '/saolei',
    name: 'saolei',
    title: '扫雷',
    icon: ZoomOut,
  },
  {
    path: '/shudu',
    name: 'shudu',
    title: '数独',
    icon: Document,
  },
  {
    path: '/wuziqi',
    name: 'wuziqi',
    title: '五子棋',
    icon: Location,
  },
  {
    path: '/xiangqi',
    name: 'xiangqi',
    title: '象棋',
    icon: Setting,
  },
  {
    path: '/yanglegeyang',
    name: 'yanglegeyang',
    title: '羊了个羊',
    icon: Setting,
  },
  {
    path: '/gongneng',
    name: 'gongneng',
    title: '功能',
    icon: Setting,
    children: [
      {
        path: '/beibao',
        name: 'beibao',
        title: '背包',
        icon: Setting,
      },
      {
        path: '/juese',
        name: 'juese',
        title: '角色',
        icon: Setting,
      },
      {
        path: '/tujian',
        name: 'tujian',
        title: '图鉴',
        icon: Setting,
      },
      {
        path: '/qianghua',
        name: 'qianghua',
        title: '强化',
        icon: Setting,
      },
    ]
  },
]