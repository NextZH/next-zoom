import { http } from "../utils/request"
const musicPort = '3000';

//获取新歌速递
export const getTopSong = (query = { type: 0 }) => {
  return http({
    method: 'get',
    url: '/top/song',
    port: musicPort,
    query,
  })
}
//获取音乐播放url
export const getMusic = (query = { id: 0 }) => {
  return http({
    method: 'get',
    url: '/song/url',
    port: musicPort,
    query,
  })
}
//获取音乐歌词
export const getLyric = (query = { id: 0 }) => {
  return http({
    method: 'get',
    url: '/lyric',
    port: musicPort,
    query,
  })
}
//获取歌手分类列表
export const getArtist = (query = { 
  limit: 30,//一次回传数量
  offset:0,//第几页
  initial:-1,//字母顺序  可以传26个字母和-1,0  -1:热门  0:#
  type:-1,//类型  -1:全部  1:男歌手  2:女歌手  3:乐队
  area:-1,//地区  -1:全部  7华语  96欧美  8:日本  16韩国  0:其他
}) => {
  return http({
    method: 'get',
    url: '/artist/list',
    port: musicPort,
    query:{ 
      limit: 30,
      offset:0,
      initial:-1,
      type:-1,
      area:-1,
      ...query
    },
  })
}
//获取歌手热门50首歌曲
export const getArtistTopSong = (query = { 
  id:0
}) => {
  return http({
    method: 'get',
    url: '/artist/top/song',
    port: musicPort,
    query,
  })
}
//获取歌手所有歌曲
export const getArtistSongs = (query = { 
  id:0,
  order:'hot',//hot ,time 按照热门或者时间排序
  limit:50, // 取出歌单数量 , 默认为 50
  offset:1,// 偏移数量 , 用于分页 , 如 😦 评论页数 -1)*50, 其中 50 为 limit 的值
}) => {
  return http({
    method: 'get',
    url: '/artist/songs',
    port: musicPort,
    query:{ 
      id:0,
      order:'hot',
      limit:50,
      offset:1,
      ...query
    },
  })
}
//获取歌手描述
export const getArtistDesc = (query = { 
  id:0,
}) => {
  return http({
    method: 'get',
    url: '/artist/desc',
    port: musicPort,
    query,
  })
}
//获取歌手详情
export const getArtistDetail = (query = { 
  id:0,
}) => {
  return http({
    method: 'get',
    url: '/artist/detail',
    port: musicPort,
    query,
  })
}