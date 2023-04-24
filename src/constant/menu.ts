import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut,
  SwitchFilled,
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
    icon: SwitchFilled,
  },
  {
    path: '/shudu',
    name: 'shudu',
    title: '数独',
    icon: SwitchFilled,
  },
  {
    path: '/wuziqi',
    name: 'wuziqi',
    title: '五子棋',
    icon: SwitchFilled,
  },
  {
    path: '/xiangqi',
    name: 'xiangqi',
    title: '象棋',
    icon: SwitchFilled,
  },
  {
    path: '/yanglegeyang',
    name: 'yanglegeyang',
    title: '羊了个羊',
    icon: SwitchFilled,
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
        icon: Location,
      },
      {
        path: '/juese',
        name: 'juese',
        title: '角色',
        icon: ZoomOut,
      },
      {
        path: '/tujian',
        name: 'tujian',
        title: '图鉴',
        icon: Document,
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