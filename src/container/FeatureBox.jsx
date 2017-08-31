import React from 'react'
import { connect } from 'react-redux'
import {TOGGLE_TOP_BAR} from '@/redux/action'
// const TopBar = () =>{
// 	return (

// 	)
// }

const FeatureItem = ({ isAdd, id, openTopBar, onClick }) => {
	const classes = ({
		'control-bar': true,
		'slide-down': openTopBar
	})
	return (
		<div className="feature-box">
			<div className={classes} ></div>
			<i className="iconfont toggle-bar" onClick={onClick}>></i>
			<div className="add-new-app">
				{isAdd ? null : <span>添加</span>}
			</div>
			{/* <iframe  id={id} frameborder="0" src="http://www.baidu.com"></iframe>  */}
		</div>
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps)
	return {
		onClick: () => {
			dispatch({
				type: TOGGLE_TOP_BAR,
				status: !ownProps.openTopBar
			});
		}
	}
}
const FeatureBox = connect(
	mapDispatchToProps,
)(FeatureItem)

export default FeatureBox