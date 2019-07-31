import axios from 'axios';
import router from '../router';
	
require('es6-promise').polyfill();


axios.defaults.timeout = 180000;
axios.defaults.baseURL = '';
//http request 拦截器
axios.interceptors.request.use(
	config => {
		const token = sessionStorage.Token
		const accountid = sessionStorage.AccountID
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			'Token':token,
			'Accountid':accountid
		}
		if(!token) {
			router.push({
				path: "/",
			})
		}
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

//http response 拦截器
axios.interceptors.response.use(
	response => {
		if(response.data.msg== "非法请求" || response.data.msg== "Token失效"|| response.data.msg== "登录超时"){
			router.push({
				path: '/'
			})
		}
		return response;
	},
	error => {
		var originalRequest = error.config;
		if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
				originalRequest._retry = true
				return axios.request(originalRequest);
		}
		return Promise.reject(error)
	}
)

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err)
			})
	})
}