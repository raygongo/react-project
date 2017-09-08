import React, { Component } from 'react'
import className from 'classnames'

export default class ConfigModal extends Component {
    static defaultPops = {
    }

    // handelClocesModal() {
    //     this.props.close
    // }
    getItems(selectClass) {
        return this.props.tipData.map(({ id, ico,url, name ,mark,pgeico}) => {
            return (
                <div className="app-modal-item" key={url}>
                    {
                        true
                            ? <i className={selectClass}></i>
                            : null
                    }
                    <img src={ico} alt={name} className="icon-ziyuan " onClick={() => { this.props.handelChangeApp(mark,pgeico) }} />
                    <span className="app-modal-name">{name}</span>
                </div>
            )
        })
    }
    render() {
        const selectClass = className({
            'app-select-icon': true,
            'app-select-remove': false
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