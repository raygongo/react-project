import React, { Component } from 'react'
import classNames from 'classnames'

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
			id: this.props.id || '',
			url: this.props.url,
			mark: props.mark
		}
	}
	toggleTopBar() {
		this.setState({
			openTopBar: !this.state.openTopBar
		})
	}
	refreshIframe() {
		// this.refs.iframe.location.src = this.state.url
		if (!this.state.url) return
		this.setState({
			url: `${this.state.url}?` + new Date().getTime()
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
					<i className="icon_config" onClick={this.props.onChangeApp}></i>
				</div>
				<i className={toggleIcon} onClick={this.toggleTopBar.bind(this)}></i>
				{
					this.state.url
						? <iframe ref="iframe" src={this.state.url}></iframe>
						: <div className="add-new-app">
							<span className="add-new-title" onClick={this.props.onChangeApp}>点击添加应用</span>
						</div>
				}
			</div>
		)
	}
}
export default FeatureBox