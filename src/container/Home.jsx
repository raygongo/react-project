import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FeatureBox } from '@/container'
import { getHomeListData ,toggleTopBar} from '@/redux/action'
import '@/styles/home.less'

class Home extends Component {

	componentDidMount() {
		this.props.getHomeListData()
	}
	render() {
		return (
			<div className="wrap grid-two">
				{
					this.props.data.map((feature) => (
						<FeatureBox 
						key={feature.id} 
						{...feature} />
					))
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.Home.data
	}
}
const mapDispatchToProps = ( dispatch ,ownProp) => {
	return{
		toggleTabBar:(id)=>{
			dispatch(toggleTopBar(id))
		},
		getHomeListData:()=>{
			dispatch(getHomeListData('http://rapapi.org/mockjs/25291/api/getHomeListData'))
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)