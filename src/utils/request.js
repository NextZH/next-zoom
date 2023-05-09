import router from "@/router";
import axios from "axios";
// import { MessageBox } from "element-plus";

// axios.defaults.baseURL = "http://127.0.0.1:9527"

axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.token;
    return config;
}, err => {
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

export const http = (param) => {
    return new Promise((resolve, reject) => {
        const baseIP = 'http://127.0.0.1';
        const config = {
            baseURL: 'http://127.0.0.1:9527',
            url: param.url,
            method: param.method,
            headers: { ...param.headers },
        };
        if (param.method.toLowerCase() == 'get') {
            config.params = param.data;
        } else {
            config.data = param.data;
        }
        if (param.port) {
            config.baseURL = baseIP + ':' + param.port;
        }
        axios(config).then(res =>resolve(res)).catch(err=>reject(err))
    })
}