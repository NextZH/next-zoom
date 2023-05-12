import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType,fontBtnSync,fontType } = storeToRefs(themeStore);
export const setList = [
  {
    value:'button',
    label: '按钮设置',
    options:[
      {
        title: '颜色',
        value:'color',
        radio: [
          {
            label: 'primary',
            value: '#409EFF'
          },
          {
            label: 'success',
            value: '#67C23A'
          },
          {
            label: 'warning',
            value: '#E6A23C'
          },
          {
            label: 'danger',
            value: '#F56C6C'
          },
          {
            label: 'info',
            value: '#909399'
          },
        ],
        current: buttonType
      },
      {
        title: '是否同时改变字体颜色',
        value:'sync',
        radio: [
          {
            label: '是',
            value:'1',
          },
          {
            label: '否',
            value:'0',
          },
        ],
        current: fontBtnSync
      },
    ],
  },
  {
    value:'font',
    label: '字体设置',
    options:[
      {
        title: '颜色',
        value: 'color',
        radio: [
          {
            label: 'primary',
            value: '#409EFF'
          },
          {
            label: 'success',
            value: '#67C23A'
          },
          {
            label: 'warning',
            value: '#E6A23C'
          },
          {
            label: 'danger',
            value: '#F56C6C'
          },
          {
            label: 'info',
            value: '#909399'
          },
        ],
        current: fontType
      },
    ]
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
    label: '字体设置',
    value: 'font',
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