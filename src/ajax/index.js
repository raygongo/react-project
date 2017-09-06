import axios from 'axios';
import Qs from 'qs' 
import { message } from 'antd';

const Mock = require('mockjs');

// const config = {
// 	//请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
// 	// url: '/user',

// 	// 请求方法同上
// 	method: 'get', // default
// 	// 基础url前缀
// 	// baseURL: 'http://rapapi.org/mockjs/25291',
// 	baseURL: 'http://localhost:8080/plugin-workbench/',
// 	　　　　　　
// 	transformRequest: [(data) => {
// 		// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
// 		　　
// 		// data = Qs.stringify({});
// 		return data;
// 	}],

// 	transformResponse: [(data) => {
// 		// 这里提前处理返回的数据

// 		return data;
// 	}],

// 	// 请求头信息
// 	headers: {
// 		'Content-Type': 'application/json;charset=UTF-8'
// 	},

// 	//parameter参数
// 	params: {

// 	},

// 	//post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
// 	data: {
// 		// firstName: 'Fred'
// 	},

// 	//设置超时时间
// 	timeout: 1000,
// 	//返回数据类型
// 	responseType: 'json', // default
// 	proxy: {
// 		host: '127.0.0.1',
// 		port: 8080,
// 	},

// }

const fetchAjax = options => {
	return new Promise((resolve, reject) => {

		const instance = axios.create({
			// baseURL: 'http://rapapi.org/mockjs/25291',
			baseURL: 'http://localhost:8080/plugin-workbench/',
		})

		// instance.defaults.headers['Content-Type'] = 'application/json'

		/**
		 * 请求拦截
		 */
		instance.interceptors.request.use(config => {
			document.getElementById("loading-box").style.display = 'block'
			// config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			if (config.method === 'post') {
				config.data = Qs.stringify({
					...config.data
				})
				// config.data = JSON.stringify(config.data)
			}
			return config
		}, err => {
			return Promise.reject(err)
		})

		/**
		 * 响应拦截
		 */
		instance.interceptors.response.use(res => {
			document.getElementById("loading-box").style.display = 'none'
			// 接口测试mock假数据
			// return Mock.mock(res.data)
			if (res.status == 200 ){
				if(res.data.state == "CO2000"){
					return res.data
				}
			}
			message.error(res.data.message || '网络错误!,请重试');
			
		}, err => {
			return Promise.reject(err)
		})
		/**
		 *  处理请求结果
		 */
		instance(options)
			.then(response => {
				const res = response.data

				resolve(res)
			})
			.catch(err => {
				// 同一错误处理

			})
	})
}

export default {
	get(url, params = {}) {
		return fetchAjax({
			method: 'GET',
			url,
			params
		})
	},

	post(url, data = {}) {
		return fetchAjax({
			method: 'POST',
			url,
			data
		})
	}
}

// export default {
// 	get(url, params = {}) {
// 		return axios.get(url, params, config)
// 	},

// 	post(url, data = {}) {
// 		return axios.post(url, data, config)
// 	}
// }