import React, { Component } from 'react'

export default class ConfigModal extends Component {

    handelClocesModal() {

    }

    render() {
        return (
            <div className="app-modal-box">
                <div className="app-modal">
                    <div className="app-modal-title">
                        <span>小应用设置</span>
                        <i className="iconfont icon-delete" onClick={this.handelClocesModal.bind(this)}></i>
                    </div>
                    <div className="app-modal-content">
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                        <div className="app-modal-item">
                            <i className="iconfont icon-ziyuan app-modal-select"></i>
                            <span className="app-modal-name">邮件</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
