import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus';

export const useMapStore = defineStore('map', {
  state:()=>({
    mapFlag:true,
  }),
  getters:{

  },
  actions:{
    setmapFlag(value?:boolean){
      if (value!==undefined&&typeof value=='boolean') {
        this.mapFlag=value;
      } else {
        this.mapFlag=!this.mapFlag;
      }
      ElMessage({
        type:'success',
        message:'地图插件已'+(this.mapFlag?'开启！':'关闭！'),
      })
      localStorage.setItem('mapFlag',JSON.stringify(this.mapFlag));
    },
    initMapFlag(){
      const target=localStorage.getItem('mapFlag');
      if (target) {
        this.mapFlag=JSON.parse(target);
      } else {
        localStorage.setItem('mapFlag',JSON.stringify(this.mapFlag));
      }
    }
  }
})