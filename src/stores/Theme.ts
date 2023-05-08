import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state:()=>({
    buttonType:'primary',
    buttonColor:'#409EFF',
  }),
  getters:{

  },
  actions:{
    setButtonType(value:any){
      // console.log(value);
      this.buttonType=value.label;
      this.buttonColor=value.color;
    },
  }
})