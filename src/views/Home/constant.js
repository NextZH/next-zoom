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
    }
  ]
};