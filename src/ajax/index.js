import axios from 'axios'
const Mock = require('mockjs')

const fetchAjax = options => {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			baseUrl:'http://rapapi.org/mockjs/25291'
		})

		// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

		/**
		 * 请求拦截
		 */
		instance.interceptors.request.use(req => {
			return req
		}, err => {
			return Promise.reject(err)
		})

		/**
		 * 响应拦截
		 */
		instance.interceptors.response.use(res => {
			return Mock.mock(res.data)
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
		return fetchAjax({method: 'get', url, params})
	},

	post(url, data = {}) {
		return fetchAjax({method: 'post', url, data})
	}
}