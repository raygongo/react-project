import axios from 'axios'
const Mock = require('mockjs')

const config = {
	//请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
	url: '/user',

	// 请求方法同上
	method: 'get', // default
	// 基础url前缀
	baseURL: 'http://rapapi.org/mockjs/25291',
	　　　　　　
	transformRequest: [(data) => {
		// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
		　　
		// data = Qs.stringify({});
		return data;
	}],

	transformResponse: [(data) => {
		// 这里提前处理返回的数据

		return data;
	}],

	// 请求头信息
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},

	//parameter参数
	params: {

	},

	//post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
	data: {
		// firstName: 'Fred'
	},
	//返回数据类型
	responseType: 'json', // default

}

const fetchAjax = options => {
	return new Promise((resolve, reject) => {

		const instance = axios.create({
			baseURL: 'http://localhost:8080/plugin-workbench/',
			//设置超时时间
			timeout: 10000,
		})

		// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

		/**
		 * 请求拦截
		 */
		instance.interceptors.request.use(req => {
			document.querySelector("#loading-box").style.display = "block"
			return req
		}, err => {
			return Promise.reject(err)
		})

		/**
		 * 响应拦截
		 */
		instance.interceptors.response.use(res => {
			document.querySelector("#loading-box").style.display = "none"
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
				document.querySelector("#loading-box").style.display = "none"
				// 同一错误处理

			})
	})
}

export default {
	get(url, params = {}) {
		return fetchAjax({
			method: 'get',
			url,
			params
		})
	},

	post(url, data = {}) {
		return fetchAjax({
			method: 'post',
			url,
			data
		})
	}
}