import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FeatureBox } from '@/components/'
import { getHomeListData } from '@/redux/action'
import '@/styles/home.less'

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(getHomeListData('http://rapapi.org/mockjs/25291/api/getHomeListData'))
	}
	getItems() {
		return this.props.data.map(({ title, id, isAdd }) => (
			<FeatureBox key={id} title={title} id={id} isAdd={isAdd} />
		))
	}
	render() {
		return (
			<div className="wrap grid-two">
				{this.getItems()}
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		data:state.Home.data
	}
}
export default  connect(
	mapStateToProps,
	// mapDispatchToProps
)(Home)