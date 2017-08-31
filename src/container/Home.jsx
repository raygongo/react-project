import React, { Component } from 'react'
import { FeatureBox } from '@/components'
import http from '@/ajax'
import '@/styles/home.less'

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		http.get('http://rapapi.org/mockjs/25291/api/getHomeListData')
			.then((data) => {
				this.setState({
					data: data
				})
			})
	}

	render() {
		return (
			<div className="wrap grid-two">
				{
					this.state.data.map((item) => {
						return (
							<FeatureBox
								key={item.id}
								{...item} />
						)
					})
				}
			</div>
		)
	}
}
