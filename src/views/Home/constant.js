import { ref, reactive, computed } from 'vue';
export const option = {
  title: {
    text: '未来一周温度范围表'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '最大值',
      type: 'line',
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: '周最高' },
          { type: 'min', name: '周最高温度最低' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: '最小值',
      type: 'line',
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: '周最低温度最高' },
          { type: 'min', name: '周最低' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          // [
          //   {
          //     symbol: 'none',
          //     x: '90%',
          //     yAxis: 'max'
          //   },
          //   {
          //     symbol: 'circle',
          //     label: {
          //       position: 'start',
          //       formatter: 'Max'
          //     },
          //     type: 'max',
          //     name: '最高点'
          //   }
          // ]
        ]
      }
    },
    {
      symbolSize: 20,
      type: 'line',
      data:[],
      markLine: {
        symbol: ['none', 'none'],//去掉箭头
        itemStyle: {
          normal: {
            lineStyle: {
              type: 'solid',
              color: {//设置渐变
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'red '// 0% 处的颜色
                }, {
                  offset: 1, color: 'blue' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            label: {
              show: true,
              position: 'middle'
            }
          }
        },
        data: [{
          // xAxis: 1,//这里设置false是隐藏不了的，可以设置为-1
        },]
      }
    },
  ]
};
//布局样式
export const style = reactive([
  {
    height: '300px',
    left: {
      flex: '1 0',
      show: true,
    },
    center: {
      grow: '2',
      shrink: '0',
      show: true,
    },
    right: {
      flex: '1 0',
      show: true,
    },
  },
  {
    height: '350px',
    left: {
      flex: '1 0',
      show: true,
    },
    center: {
      // flex: '2 0',
      grow: '2',
      shrink: '0',
      show: false,
    },
    right: {
      flex: '1 0',
      show: true,
    },
  },
  {
    height: '350px',
    left: {
      flex: '5 0',
      show: true,
    },
    center: {
      // flex: '2 0',
      grow: '4',
      shrink: '0',
      show: true,
    },
    right: {
      flex: '4 0',
      show: true,
    },
  },
]);
//轮播图
export const list = reactive([
  {
    name: '1.jpg',
  },
  {
    name: '2.jpg',
  },
  {
    name: '3.jpg',
  },
  {
    name: '4.jpg',
  },
  {
    name: '5.jpg',
  },
  {
    name: '6.png',
  },
]);