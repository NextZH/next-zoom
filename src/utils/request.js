import router from "@/router";
import axios from "axios";
// import { MessageBox } from "element-plus";

axios.defaults.baseURL = "http://127.0.0.1:9527"

axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.token;
    return config;
},err=>{
    console.log(err);
})

axios.interceptors.response.use(res => res.data, err => {
    // if (err && err.response && err.response.status) {
    //     if (err.response.status === 401) {
    //         MessageBox.alert('登录已过期，请重新登录', '登录过期', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //                 localStorage.removeItem('token');
    //                 router.replace('/login');
    //             }
    //         });
    //     }
    // }
    return Promise.reject(err.message);
});