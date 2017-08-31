import React, { Component } from 'react'
import classNames from 'classnames'

class FeatureBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			openTopBar: false,
			isAdd: this.props.isAdd || false,
			id: this.props.id || '',
			url: 'http://www.ray33.com'
		}
	}
	toggleTopBar() {
		this.setState({
			openTopBar: !this.state.openTopBar
		})
	}
	refreshIframe() {
		// this.refs.iframe.location.src = this.state.url
		if(!this.state.url) return
		this.setState({
			url:'http://www.ray33.com?'+new Date().getTime()
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
					<i className="icon_config"></i>
				</div>
				<i className={toggleIcon} onClick={this.toggleTopBar.bind(this)}></i>
				{
					this.state.isAdd
						? <iframe ref="iframe"  src={this.state.url}></iframe>
						: <div className="add-new-app">
							{this.state.isAdd ? null : <span>添加</span>}
						</div>
				}
			</div>
		)
	}
}
export default FeatureBox