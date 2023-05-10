import {http} from "../utils/request"
const musicPort='3000';

//获取新歌速递
export const getTopSong = (type=0) => {
  return http({
    method: 'get',
    url: `/top/song?type=${type}`,
    port:musicPort
  })
}
//获取音乐播放url
export const getMusic = (id=0) => {
  return http({
    method: 'get',
    url: `/song/url?id=${id}`,
    port:musicPort
  })
}
//获取音乐歌词
export const getLyric = (id=0) => {
  return http({
    method: 'get',
    url: `/lyric?id=${id}`,
    port:musicPort
  })
}