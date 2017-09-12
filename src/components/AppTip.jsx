import React, { Component } from 'react'
import className from 'classnames'
import { getAppTipList } from '@/ajax/api'
import http from '@/ajax'


export default class ConfigModal extends Component {
	static defaultPops = {
		mark: ''
	}
	constructor() {
		super()
		this.state = {
			tipData: []
		}
	}
	show(){
		console.log(1111)
	}
	componentDidMount() {
		if (!this.state.tipData.length) {
			http.get(getAppTipList, {
				terminal: 'PC',
				cn: window.CONFIG.cn
			})
				.then(data => {
					// window.tipData = data
					this.setState({
						tipData: data || []
					})
				})
		}
	}
	getItems() {
		return this.state.tipData.map(({ id, ico, url, name, mark, pgeico }) => {
			const selectClass = className({
				'app-select-icon': this.props.mark == mark
			})
			return (
				<div className="app-modal-item" key={url}>
					{
						true
							? <i className={selectClass}></i>
							: null
					}
					<img src={ico} alt={name} className="icon-ziyuan " onClick={() => { this.props.handelChangeApp({id,mark, pgeico,url,name}) }} />
					<span className="app-modal-name">{name}</span>
				</div>
			)
		})
	}
	render() {

		return (
			<div className="app-modal-box">
				<div className="app-modal">
					<div className="app-modal-title">
						<span>小应用设置</span>
						<i className="iconfont icon-delete" onClick={this.props.handelClose}></i>
					</div>
					<div className="app-modal-content" >
						{this.getItems()}
					</div>
				</div>
			</div>
		)
	}
}