import React, { Component } from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

const TopBar = ({isOpen}) => {

    const classes = ({
        'control-bar':true,
        'slide-down':isOpen
    })

    return (
        <div className="control-bar"></div>
    )
}

const mapStateToProps =( state )=>{
    return {
        isOpen: state.topBar.isOpen
    }
}

export default connect(
    mapStateToProps
)(TopBar)

