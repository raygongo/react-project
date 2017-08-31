import React, { Component } from 'react'
import { FeatureBox, AppTip } from '@/components'
import http from '@/ajax'
import '@/styles/home.less'

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			openAppTip: false,
			tipData: []
		}
	}

	componentDidMount() {
		http.get('/api/getHomeListData')
			.then((data) => {
				this.setState({
					data: data
				})
			})
	}
	/**
	 * 监听子组件 调出 appTip 组件
	 */
	handelOpenAppTip() {
		// 1. 显示tip 
		this.setState({
			openAppTip: true
		})
		// 2. 第一次需要获取数据
		if (!this.state.tipData.length) {
			http.get('/api/getTipList')
				.then(data => {
					console.log(data)
					this.setState({
						tipData: data
					})
				})
		}
	}
	/**
	 * 监听tipApp传回需要操作的id 进行操作
	 * @param {string} id 
	 */
	handelChangeApp(id){
		console.log(id)
		// 发送 请求
			// 操作成功后 修改tipData 对应数据
	}

	render() {
		return (
			<div className="wrap grid-two">
				{
					this.state.data.map((item) => {
						return (
							<FeatureBox
								onChangeApp={this.handelOpenAppTip.bind(this)}
								key={item.id}
								{...item} />
						)
					})
				}
				{
					this.state.openAppTip
						? <AppTip
							tipData={this.state.tipData}
							handelChangeApp={this.handelChangeApp}
							handelClose={() => { this.setState({ openAppTip: false }) }} />
						: null
				}
			</div>
		)
	}
}
