import {http} from "../utils/request"

export const getWeather = () => {
  return http({
    method: 'get',
    url: '/home/weather'
  })
}
export const getWeekWeather = () => {
  return http({
    method: 'get',
    url: '/home/weekWeather'
  })
}
export const getAllAnime = () => {
  return http({
    method: 'get',
    url: '/home/allAnime'
  })
}
export const getAnime = (data = { index: 0 }) => {
  return http({
    method: 'post',
    url: '/home/anime',
    data
  })
}
export const getAnimeTag = () => {
  return http({
    method: 'get',
    url: '/home/animeTag'
  })
}
export const getOMMusic = () => {
  return http({
    method: 'get',
    url: '/home/OMMusic'
  })
}
