import axios from "axios"

export const getWeather=()=>{
  return axios({
    method:'get',
    url:'/home/weather'
  })
}