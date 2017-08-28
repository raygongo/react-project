import React, { Component } from 'react';
import { Button,Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames'





export default class PC extends Component {
    static propTypes = {
        num: PropTypes.any
    }

    /**
     * 监听menuList change事件
     * @param {String} index 
     */
    handelMenuChange(index) {

    }

    render() {
        return (
                <div style={{height:'100%'}}>
                    

                    <StateContent />

                </div>  
                    
            
        );
    }
}








const StateContent = ( props ) => {
    
    return (
        <div style={{overflow:'hidden',height:'100%'}}>
            <StatusBar />
            <StatusModelList />
        </div>
        
    )
}


