import router from "@/router";
import axios from "axios";
import { useMusicStore } from '@/stores/Music';
import { storeToRefs } from 'pinia';


// axios.defaults.baseURL = "http://127.0.0.1:9527"

axios.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.token;
	return config;
}, err => {
	console.log(err);
})

axios.interceptors.response.use(res => {
	// console.log(res);
	const musicStore = useMusicStore();
	const { musicPlugin } = storeToRefs(musicStore);
	if (res && res.config) {
		if (res.config.baseURL == 'http://127.0.0.1:3000' || res.config.baseURL == 'http://localhost:3000') {
			if (res.status == 200) {
				if (musicPlugin.value===false) {
					musicPlugin.value = true;
				}
			}
		}
	}
	return res.data;
}, err => {
	// console.log(err);
	const musicStore = useMusicStore();
	const { musicPlugin } = storeToRefs(musicStore);
	if (err && err.config) {
		if (err.config.baseURL == 'http://127.0.0.1:3000' || err.config.baseURL == 'http://localhost:3000') {
			if (err.code == 'ERR_NETWORK') {
				if (musicPlugin.value) {
					musicPlugin.value = false;
				}
			}
		}
	}
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
		if (param.query) {
			let i = 0;
			for (const key in param.query) {
				if (i == 0) {
					config.url += `?${key}=${param.query[key]}`;
				} else {
					config.url += `&${key}=${param.query[key]}`;
				}
				i++;
			}
		}
		if (param.port) {
			config.baseURL = baseIP + ':' + param.port;
		}
		axios(config).then(res => resolve(res)).catch(err => reject(err));
	})
}