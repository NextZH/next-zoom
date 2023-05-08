import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType } = storeToRefs(themeStore);
export const setList = [
  {
    title: '颜色',
    value:'button',
    radio: [
      {
        label: 'primary',
        color: '#409EFF'
      },
      {
        label: 'success',
        color: '#67C23A'
      },
      {
        label: 'warning',
        color: '#E6A23C'
      },
      {
        label: 'danger',
        color: '#F56C6C'
      },
      {
        label: 'info',
        color: '#909399'
      },
    ],
    current: buttonType
  }
];
export const treeData = [
  {
    label: '所有设置',
    value: 'all',
  },
  {
    label: '按钮设置',
    value: 'button',
  },
  {
    label: '主题设置',
    value: 'theme',
    children: [
      {
        label: '菜单栏',
        value: 'menu',
      },
      {
        label: '主体',
        value: 'body',
      },
      {
        label: '头部导航栏',
        value: 'header',
      },
    ],
  },
  {
    label: '动画设置',
    value: 'theme',
    children: [
      {
        label: '鼠标跟踪动画',
        value: 'track',
      },
      {
        label: '鼠标点击动画',
        value: 'click',
      },
      {
        label: '背景动画',
        value: 'background',
      },
    ],
  },
]