import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state:()=>({
    pageName:'',
    pageObj:{},
  }),
  getters:{

  },
  actions:{
    setPageName(value:string){
      this.pageName=value;
    },
    setPageObj(value:{}){
      this.pageObj=value;
    },
  }
})
