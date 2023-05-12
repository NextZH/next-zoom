import { defineStore } from 'pinia'
import { getMusic, getTopSong, getLyric } from '@/api/wangyiyun';

export const useMusicStore = defineStore('music', {
  state: () => ({
    musicIndex: 0,//当前播放的音乐对象索引
    ImglistSize: 5,//展示封面页数
    music: {//音乐列表
      list: [] as any[],//总的音乐对象列表
      musicImg: [] as any[],//所有封面链接集合
      currentMusic: {} as any,//当前播放的音乐对象
      lyric: '',//未处理的歌词
    },
    lyricIndex: 0,//歌词索引
    lyricTimer: 0,//歌词定时器
    lyricTotal: 0,//歌词播放时段记录
    autoplay: false,//是否自动播放
    musicAudio: null,//音乐主控制台实例
    duration: 0,//时长
    currentTime: 0,//当前播放位置
    playFlag: false,//播放标志
  }),
  getters: {
    lyric: (state) => state.music.lyric.split('\n').filter((e: any) => e != '').map((e: any) => {//当前播放到的歌词
      const index = e.indexOf(']');
      return e.slice(index + 1);
    })[state.lyricIndex],
    lyricHasTime: (state) => state.music.lyric.split('\n').filter((e: any) => e != '')[state.lyricIndex],//当前播放到的歌词(携带有时间)
    Imglist: (state) => state.music.musicImg.filter((e: any, i: number) => i < state.ImglistSize),//初始只显示ImglistSize=5页，避免一次性请求完卡死
    audioCurrentTime: (state) => (state.currentTime / 100).toFixed(2),
    lyricList: (state) => state.music.lyric.split('\n').filter((e: any) => e != '').map((e: any) => {//歌词列表
      const index = e.indexOf(']');
      return e.slice(index + 1);
    }),
    lyricListHasTime: (state) => state.music.lyric.split('\n').filter((e: any) => e != ''),//歌词列表(携带有时间)
    lyricTimeList: (state) => state.music.lyric.split('\n').filter((e: any) => e != '').map((e: any) => {//歌词的时间列表
      const index1 = e.indexOf('[');
      const index2 = e.indexOf(']');
      return e.slice(index1 + 1, index2);
    }),
    lyricTimeStampList: (state) => state.music.lyric.split('\n').filter((e: any) => e != '').map((e: any) => {//歌词的时间戳列表
      const index1 = e.indexOf('[');
      const index2 = e.indexOf(']');
      const time = e.slice(index1 + 1, index2);
      const arr1 = time.split(':');
      const arr2 = arr1[1].split('.');
      const m = Number(arr1[0]);
      const s = Number(arr2[0]);
      const ms = Number(arr2[1].slice(0, 2));
      return m * 6000 + s * 100 + ms;
    }),
  },
  actions: {
    getMusicAsync: async function () {//从后端获取音乐
      const res = await getTopSong();
      this.music.list = res.data;
      this.music.musicImg = res.data.map((e: any) => e.album.blurPicUrl);
      this.musicChange(0);
    },
    playLyric() {//播放歌词
      this.lyricTimer = setInterval(() => {
        let m = Math.floor(this.lyricTotal / 6000);
        let s = Math.floor(this.lyricTotal / 100) - m * 60;
        let ms = this.lyricTotal % 100;
        const arr = this.music.lyric.split('\n').map((e: any) => e.slice(1, 9));
        const time = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}.${ms < 10 ? '0' + ms : ms}`;
        // console.log(time);
        const index = arr.indexOf(time);
        if (index != -1) {
          if (index != this.lyricIndex) {
            this.lyricIndex = index;
          }
        }
        this.lyricTotal++;
        this.currentTime = this.lyricTotal;
        if (this.lyricIndex == arr.length - 1) {
          this.lyricTotal = 0;
          clearInterval(this.lyricTimer);
        }
      }, 10);
    },
    PauseLyric() {//暂停歌词
      clearInterval(this.lyricTimer);
    },
    musicChange: async function (index: number) {//切歌
      this.musicIndex = index;
      this.ImglistSize - index < 2 && this.ImglistSize++;
      // console.log(index,Imglist);
      const res = await getMusic({id:this.music.list[index].id});
      this.music.currentMusic = res.data[0];
      const res2 = await getLyric({id:this.music.list[index].id});
      this.music.lyric = res2.lrc.lyric;
      // this.duration=0;
      this.autoplay = true;
    },
    audioPlay() {//播放
      this.playFlag = true;
      this.playLyric();
    },
    audioPause() {//暂停
      this.playFlag = false;
      this.PauseLyric();
    },
    audioEnded() {//结束
      this.lyricTotal = 0;
      this.lyricIndex = 0;
      this.PauseLyric();
      this.musicChange(this.musicIndex+1);
    },
    loadstart() {//开始加载新资源
      this.lyricTotal = 0;
      this.lyricIndex = 0;
      this.PauseLyric();
    },
    loadedmetadata(e: any) {//加载新资源已完成
      // console.log(e,e.target,e.target.duration);
      this.duration = e.target.duration * 100;
      // this.audioPlay();
    },
    autoSeeked(e: any) {//跳转到指定时间点位置播放
      this.lyricTotal = e.target.currentTime.toFixed(2) * 100;
      this.currentTime = e.target.currentTime.toFixed(2) * 100;
      // console.log(this.lyricTimeStampList,this.lyricTimeList);
      for (let i = 0; i < this.lyricTimeStampList.length; i++) {
        if (this.lyricTotal < this.lyricTimeStampList[i]) {
          this.lyricIndex = i - 1;
          break;
        }
      }
    },
  }
})