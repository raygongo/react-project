import React, { Component } from 'react';


class Dog extends Component {

	static defaultProps = {
		onClick (){
			console.log('我是默认的点击事件')
		}
	}
	constructor() {
		super()
		/* TODO */
		this.state = {
			running: false
		}
	}

	bark() {
		/* TODO */
		this.setState({
			running: false
		})
	}

	run() {
		this.setState({
			running: true
		})
	}

	handelClickDog() {
		if (!this.state.running) {
			this.run()
			setTimeout(() => {
				this.bark()
			}, 1000)
		}
		if (this.props.onClick) {
			this.props.onClick()
		}
	}

	render() {
		return (
			<div> 
				<span onClick={this.handelClickDog.bind(this)} > Dog</span>   
				{this.state.running ? 'running~~~' : null}
				我是父组件传进来的属性{this.props.text}
			</div>
		)
	}
}


class Home extends Component {
	constructor() {
		super()
		this.state = {
			isLike: false,
			text:'你好'
		}
	}
	// 标签就是字符串
	showDom(dom) {
		return dom
	}
	handelClick() {
		this.setState((pre) => {
			return { isLike: !pre.isLike }
		})
	}
	changeState () {
		this.setState({
			text: new Date().getTime()
		})
	}
	render() {
		const msg = true
		return (
			<div>
				<div onClick={this.handelClick.bind(this)}>点我</div>
				{this.state.isLike ? '对' : '错'}
				<div>{this.showDom(<span>我是饶了一圈的span标签</span>)}</div>
				<Dog text={this.state.text} />
				<button onClick={this.changeState.bind(this)}>点我更改状态</button>
			</div>
		)
	}
}

export default Home