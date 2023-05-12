import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    buttonType: 'primary',
    buttonColor: '#409EFF',
    fontType: 'primary',
    fontColor: '#409EFF',
    fontBtnSync: '1',//按钮字体颜色同步修改
  }),
  getters: {

  },
  actions: {
    initColor(){
      // localStorage.setItem('theme',JSON.stringify(this.$state));
      const themeStr=localStorage.getItem('theme')
      if (themeStr) {
        const newState=JSON.parse(themeStr);
        for (const key in newState) {
          (this.$state as any)[key]=newState[key];
        }
      } else {
        this.setTheme();
      }
    },
    setTheme(){
      localStorage.setItem('theme',JSON.stringify(this.$state));
    },
    setButtonType(value: any) {
      // console.log(value);
      this.buttonType = value.label;
      this.buttonColor = value.value;
      if (this.fontBtnSync=='1') {
        this.fontType = value.label;
        this.fontColor = value.value;
      }
      this.setTheme();
    },
    setFontType(value: any) {
      // console.log(value);
      this.fontType = value.label;
      this.fontColor = value.value;
      if (this.fontBtnSync=='1') {
        this.buttonType = value.label;
        this.buttonColor = value.value;
      }
      this.setTheme();
    },
    setFontBtnSync(value:string){
      this.fontBtnSync=value;
      this.setTheme();
    },
  }
})