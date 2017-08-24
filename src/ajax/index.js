import axios from 'axios'

const fetch = options => {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			// baseUrl
		})

		// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

		/**
		 * 请求拦截
		 */
		instance.interceptors.request.use(req => {
			// store.commit('SHOW_LOADING')

			// let token = store.state.user.token
			// if (token) req.headers.token = token

			return req
		}, err => {
			return Promise.reject(err)
		})

		/**
		 * 响应拦截
		 * 关闭loading动画
		 */
		instance.interceptors.response.use(res => {

			return res
		}, err => {
			return Promise.reject(err)
		})
        /**
         *  处理请求结果
         */
		instance(options)
			.then(response => {
				const res = response.data

				if (res.status !== 1) {
					// if (res.status === 0) {
					// 	Message.warning({message: res.errmsg})

					// 	if (res.errno === '10002') {
					// 		store.commit('LOGOUT')
					// 		router.push({name: 'login'})
					// 	}
					// } else {
					// 	Message.warning({message: '出错啦！请刷新重试或联系系统管理员'})
					// }
				} else {
					resolve(res)
				}
			})
			.catch(err => {
                // 同一错误处理
				
			})
	})
}

export default {
	get(url, params = {}) {
		return fetch({method: 'get', url, params})
	},

	post(url, data = {}) {
		return fetch({method: 'post', url, data})
	}
}