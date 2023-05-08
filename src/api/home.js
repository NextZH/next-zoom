import axios from "axios"

export const getWeather=()=>{
  return axios({
    method:'get',
    url:'/home/weather'
  })
}
export const getWeekWeather=()=>{
  return axios({
    method:'get',
    url:'/home/weekWeather'
  })
}