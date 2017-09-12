import React, { Component } from 'react'
import classNames from 'classnames'
import { AppTip } from '@/components'
import { addNewApp, delApp, editApp } from '@/ajax/api'
import http from '@/ajax'
class FeatureBox extends Component {
	static defaultPops = {
		auth: null,
		authInfo: [],
		ico: null,
		id: null,
		mark: null,
		name: null,
		sort: null,
		url: null,
	}
	constructor(props) {
		super(props)
		this.state = {
			openTopBar: false,
			openAppTip: false
		}
	}
	// 调出app应用框
	handelOpenAppTip() {
		this.setState({
			openAppTip: true
		})

	}
	componentDidMount() {

		// if(this.refs.iframe){
		// 	this.refs.iframe.onload()
		// }

	}
	iframeCompalate() {
		console.log('完成了')
	}
	/**
	 * 监听tipApp传回需要操作的 url pgeico mark name 进行操作
	 * @param {string} id 
	 */
	handelChangeApp({ url, pgeico, mark, name }) {
		console.log(url, pgeico, mark, name)
		// 这里要判断 
		// 第一次编辑的时候 使用新增的接口 通过id来判断
		if (!this.props.id) {
			// 如果当前点击的mark 相等 说明是删除
			if (mark == this.props.mark) {


			} else {
				// 如果不相等说明是编辑
				http.post(addNewApp, {
					sort: this.props.index,
					cn: window.CONFIG.cn,
					msId: this.props.msId,
					terminal: 'PC',
					url: 'http://www.baidu.com',
					ico: pgeico,
					name,
					mark,
				}).then(data => {
					this.props.onChangeApp(data)
				})
			}
		} else if (this.props.id) {
			// 非第一次编辑
			if (mark == this.props.mark) {
				http.post(delApp, {
					cn: window.CONFIG.cn,
					terminal: 'PC',
					id: this.props.id
				}).then(data => {
					// 成功后将应用重新赋值
					this.props.onChangeApp(data)
				})
			} else {
				http.post(editApp, {
					sort: this.props.index,
					cn: window.CONFIG.cn,
					msId: this.props.msId,
					terminal: 'PC',
					url: 'http://www.baidu.com',
					ico: pgeico,
					name,
					mark,
					// id: this.props.id
				}).then(data => {
					// 成功后将应用重新赋值
					this.props.onChangeApp(data)
				})
			}
		}

	}
	toggleTopBar() {
		this.setState({
			openTopBar: !this.state.openTopBar
		})
	}
	refreshIframe() {
		// this.refs.iframe.location.src = this.state.url
		if (!this.props.url) return
		this.setState({
			url: `${this.props.url}?` + new Date().getTime()
		})
	}
	render() {
		const classes = classNames({
			'control-bar': true,
			'slide-down': this.state.openTopBar
		})
		const toggleIcon = classNames({
			'iconfont': true,
			'icon-right': true,
			'toggle-bar': true,
			'arrw-rotate': this.state.openTopBar
		})
		return (
			<div className="feature-box">
				<div className={classes} >
					<i className="icon_refresh" onClick={this.refreshIframe.bind(this)}></i>
					<i className="icon_config" onClick={this.handelOpenAppTip.bind(this)}></i>
				</div>
				<i className={toggleIcon} onClick={this.toggleTopBar.bind(this)}></i>
				{
					this.props.url
						? <iframe ref="iframe" src="http://123" onLoad={this.iframeCompalate} scrolling="no"></iframe>
						: <div className="add-new-app">
							<span className="add-new-title" onClick={this.handelOpenAppTip.bind(this)}>点击添加应用</span>
						</div>
				}
				{
					this.state.openAppTip
						? <AppTip
							mark={this.props.mark}
							handelChangeApp={this.handelChangeApp.bind(this)}
							handelClose={() => { this.setState({ openAppTip: false }) }} />
						: null
				}
			</div>
		)
	}
}
export default FeatureBox