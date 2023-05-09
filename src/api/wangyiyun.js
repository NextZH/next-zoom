import {http} from "../utils/request"
const musicPort='3000';

export const getTopSong = (type=0) => {
  return http({
    method: 'get',
    url: `/top/song?type=${type}`,
    port:musicPort
  })
}
export const getMusic = (id=0) => {
  return http({
    method: 'get',
    url: `/song/url?id=${id}`,
    port:musicPort
  })
}