import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'antd';

const confirm = Modal.confirm;
// let classnames = require('classnames');

export const ModelBlock = ({ children }) => {

    return (
        <div className="model-item-block">
            <span>{children}</span>
            <i className="iconfont icon-delete"></i>
        </div>
    )
}

export default class StatusModelList extends Component {
    render() {
        return (
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <StatusModel />
                <div className="add-status-model">
                    <i className="iconfont"></i> 添加
                </div>
            </div>
        )
    }
}

class StatusModel extends Component {

    showModel() {
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'this.context.color',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        return (
            <div className="status-model">
                <div className="model-img"></div>

                <div className="model-content">
                    <div className="edit-btn-info">
                        <span><i className="iconfont icon-edit"></i>编辑</span>
                        <span onClick={this.showModel.bind(this)}><i className="iconfont icon-delete1"></i>删除</span>
                    </div>

                    <div className="model-info">
                        <div className="model-info-line">
                            <span className="model-label">链接地址:</span>
                            <div className="model-url">
                                <input type="text" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className="model-info-line">
                            <span className="model-label">人员:</span>
                            <div className="model-detail" >
                                <ModelBlock>张彬</ModelBlock>
                                <ModelBlock>张彬</ModelBlock>
                                <span className="add-person">添加人员</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

