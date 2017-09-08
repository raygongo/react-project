import React, { Component } from 'react'
import { FeatureBox, AppTip } from '@/components'
import { Button } from 'antd';
import http from '@/ajax'
import classNames from 'classnames'
import { getHomeList, getModeList, changeMode, getAppTipList } from '@/ajax/api'
import '@/styles/home.less'


const MODE = {
	list:'pc_list',
	grid1:'pc_grid_one',
	grid2:'pc_grid_two',

}

export default class Home extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			listData: {
				list: []
			},        // 首页 当前模式下对应的数据
			openAppTip: false,
			tipData: [],
			showModeSelect: false,
			modeData: []       // 所有模式数据
		}
	}

	componentDidMount() {
		http.get(getHomeList, {
			cn: '20066',
			terminal: 'PC'
		})
			.then((data) => {
				this.setState({
					listData: data
				})
			})
	}
	/**
	 * 监听子组件 调出 appTip 组件
	 */
	handelOpenAppTip() {

		// 2. 第一次需要获取数据
		if (!this.state.tipData.length) {
			http.get(getAppTipList, {
				terminal: 'PC',
				cn: '20066'
			})
				.then(data => {
					this.setState({
						tipData: data || [],
						openAppTip: true
					})
				})
		} else {
			// 1. 显示tip 
			this.setState({
				openAppTip: true
			})
		}

	}
	/**
	 * 监听tipApp传回需要操作的id 进行操作
	 * @param {string} id 
	 */
	handelChangeApp(id) {
		alert(id)
		// 发送 请求
		// 操作成功后 修改tipData 对应数据
	}

	/**
	 * 打开模式设置
	 */
	handelOpenModeList() {
		// 发送请求 获取模式id
		http.get(getModeList, {
			terminal: 'PC'
		}).then(data => {
			this.setState({
				modeData: data,
				showModeSelect: true
			})
		})
	}
	/**
	 * 更换模式
	 */
	handelChangeMode(id, type) {
		http.get(changeMode, {
			cn: '20066',
			msId: id
		}).then(({ msid }) => {

			// 取出msId 覆盖
			this.setState({
				listData: {
					...this.state.listData,
					msid,
					type,
				},
				showModeSelect: false
			})
		})
	}
	render() {
		// 确定对应模式class
		const modeClass = classNames({
			'wrap':true,
			'grid-two':this.state.listData.type == MODE.grid1,
			'grid-one':this.state.listData.type == MODE.grid2,
		})
		return (
			<div className={modeClass}>
				{
					this.state.listData.list.map((item, index) => {
						return (
							<FeatureBox
								onChangeApp={this.handelOpenAppTip.bind(this)}
								key={`${this.state.type}${index}`}
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
				<div className="mode-setting-btn" onClick={this.handelOpenModeList.bind(this)}></div>
				{
					this.state.showModeSelect
						? <ModeChange
							modeData={this.state.modeData}
							type={this.state.listData.type}
							handelSubmitMode={this.handelChangeMode.bind(this)}
							handelClose={() => { this.setState({ showModeSelect: false }) }} />
						: null
				}

			</div>
		)
	}
}

class ModeChange extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: props.type,
			id: props.id
		}
	}
	changeMode(type, id) {
		this.setState({
			type,
			id
		})
	}
	handelSubmitMode() {
		if (this.props.type === this.state.type) {
			this.props.handelClose()
		}else{
			this.props.handelSubmitMode(this.state.id, this.state.type)
		}
		
	}
	render() {
		return (
			<div className="mode-select-tip">
				<div className="mode-select-content">
					<div className="mode-select-title">
						<i onClick={this.props.handelClose} className="iconfont icon-delete"></i>
						模式设置
					</div>
					<ul className="mode-select-list">
						{
							this.props.modeData.map(data => (
								<li className="mode-select-item" key={data.type} onClick={this.changeMode.bind(this, data.type, data.id)}>

									<i className={data.type == MODE.list ? 'mode-item-list' : 'mode-item-grid'}></i>
									{
										data.type === this.state.type
											? <i className="mode-checked"></i>
											: null
									}

									<p>{data.name}</p>
								</li>
							))
						}
					</ul>
					<div className="mode-select-bottom">
						<Button className="mode-selet-btn" onClick={this.handelSubmitMode.bind(this)}>确定</Button>
						<Button className="mode-selet-btn" onClick={this.props.handelClose}>取消</Button>
					</div>
				</div>
			</div>
		)
	}

}