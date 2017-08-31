import React, { Component } from 'react'
import className from 'classnames'

export default class ConfigModal extends Component {

    // handelClocesModal() {
    //     this.props.close
    // }
    getItems(selectClass) {
        return this.props.tipData.map(({ id, imgUrl, title }) => {
            return (
                <div className="app-modal-item" key={id}>
                    {
                        true
                       ?<i className={selectClass}></i>
                       :null
                    }
                    <img src={imgUrl} className="icon-ziyuan " onClick={()=>{this.props.handelChangeApp(id)}}/>
                    <span className="app-modal-name">{title}</span>
                </div>
            )
        })
    }
    render() {
        const selectClass = className({
            'app-select-icon':true,
            'app-select-remove':false
        })
        return (
            <div className="app-modal-box">
                <div className="app-modal">
                    <div className="app-modal-title">
                        <span>小应用设置</span>
                        <i className="iconfont icon-delete" onClick={this.props.handelClose}></i>
                    </div>
                    <div className="app-modal-content" >
                        {this.getItems(selectClass)}
                    </div>

                </div>
            </div>
        )
    }
}