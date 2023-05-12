//歌手类型
export const singerType = [
  {
    name: '全部',
    value: -1,
  },
  {
    name: '男',
    value: 1,
  },
  {
    name: '女',
    value: 2,
  },
  {
    name: '组合',
    value: 3,
  },
];
//歌手地区
export const singerArea = [
  {
    name: '全部',
    value: -1,
  },
  {
    name: '华语',
    value: 7,
  },
  {
    name: '欧美',
    value: 96,
  },
  {
    name: '日本',
    value: 8,
  },
  {
    name: '韩国',
    value: 16,
  },
  {
    name: '其他',
    value: 0,
  },
];
//歌手顺序
const list='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(e => ({ name: e, value: e.toLowerCase() }));
list.unshift({ name: '热门', value: -1 });
list.push({ name: '#', value: 0 });
export const singerSort = list;