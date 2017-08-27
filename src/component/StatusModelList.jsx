import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import classNames from 'classnames'

const confirm = Modal.confirm;
// let classnames = require('classnames');

export const ModelBlock = ({ children }, { isEdit }) => {
    ModelBlock.contextTypes = {
        isEdit: PropTypes.bool
    }

    return (
        <div className="model-item-block">
            <span>{children}</span>
            {
                isEdit
                    ? <i className="iconfont icon-delete"></i>
                    : null
            }

        </div>
    )
}
/**
 *  配置列表所有 配置项
 */
export default class StatusModelList extends Component {

    static propTypes = {
        configList: PropTypes.array,
        type:PropTypes.string // 类型 : 单页 列表 网格   根据不同的类型 有不同的展示
    }
    static defaultProps = {
        type : 'pc-list'
    }

    constructor(props) {
        super(props)
        this.state = {
            configList: this.props.configList || [{
                id: '111111',
                url: 'www.baidu.com',
                staff: [{ id: '123456', name: '周杰伦' }]
            }]
        }
    }

    /**
     * 添加新配置项
     */
    handelAddNewStatus() {

    }

    /**
     * 遍历配置项
     */
    getStatusItems() {
        return this.state.configList.map(({ url, staff, id }) => {
            return (<StatusModel url={url} type={this.props.type} staff={staff} key={id} />)
        })
    }

    render() {
        return (
            <div style={{ 
                height: 'calc(100% - 50px)', 
                overflowY: 'auto', 
                padding: this.props.type === 'pc-single' || this.props.type ==='mb-single'
                        ? 0
                        :20}}>

                {/* 单页模式的所有配置*/}
                {/* {this.getStatusItems()}
                <div className="add-status-model" onClick={this.handelAddNewStatus.bind(this)}>
                    <i className="iconfont"></i> 添加
                </div> */}
                {/* pc列表模式 */}
                
                <ListAndGridModel/>
                <ListAndGridModel/>
                <ListAndGridModel/>
                <ListAndGridModel/>
                <ListAndGridModel/>
            </div>
        )
    }
}
/**
 * PC单页模式 配置项
 */
class StatusModel extends Component {
    
    static childContextTypes = {
        isEdit: PropTypes.bool,
    }
    static defaultProps = {
        url: '',
        staff: []
    }  

    getChildContext() {
        return { isEdit: this.state.isEdit };
    }

    constructor(props) {

        super(props)

        this.state = {
            isEdit: false,
            url: this.props.url,
            staff: this.props.staff
        }
    }
    /**
     * 显示添加人员界面ObjSelector
     */
    showAddStaff() {
        alert('添加人员成功')
    }
    /**
     * 删除该条配置
     */
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

    /**
     * 确认当前编辑
     */
    handelEnterStatus() {
        // 退出编辑模式
        this.setState({
            isEdit: false
        })
    }

    /**
     * 获取人员信息
     */
    getStaffItems() {
        return this.state.staff.map(({name,id,})=> {
            return (<ModelBlock key={id}>{name}</ModelBlock>)
        })
    }


    render() {
        // 获取对应类型的背景图片
        let imgClasses = classNames({
            'model-img': true,
            'pc-grid':true,
            'mobile-single':false,

        })


        return (
            <div className="status-model">
                <div className={imgClasses}></div>

                <div className="model-content">
                    <div className="edit-btn-info">
                        {
                            this.state.isEdit
                                ? <span>
                                    <Button
                                        className="edit-btn"
                                        type="primary"
                                        onClick={this.handelEnterStatus.bind(this)}
                                    >确定</Button>
                                    <Button
                                        className="edit-btn"
                                        type="primary" ghost
                                        onClick={() => { this.setState({ isEdit: false }) }}
                                    >取消</Button></span>
                                : <span>
                                    <span className="edit-btn" onClick={() => { this.setState({ isEdit: true }) }}>
                                        <i className="iconfont icon-edit" ></i>
                                        编辑
                                </span>
                                    <span className="edit-btn" onClick={this.showModel.bind(this)}>
                                        <i className="iconfont icon-delete1"></i>
                                        删除
                                </span>
                                </span>
                        }


                    </div>

                    <div className="model-info">
                        <div className="model-info-line">
                            <span className="model-label">链接地址:</span>
                            <div className="model-url">
                                {/* 存储的url */}
                                <input 
                                    type="text" 
                                    value={this.state.url} 
                                    onChange={(e) => { this.setState({ url: e.target.value }) }} 
                                    style={{ width: '100%' }} 
                                    disabled={!this.state.isEdit} />
                            </div>
                        </div>
                        <div className="model-info-line">
                            <span className="model-label">人员:</span>
                            <div className="model-detail" >
                                {/* 遍历所有人员 */}
                                {this.getStaffItems()}
                                {
                                    this.state.isEdit
                                        ? <span className="add-person" onClick={this.showAddStaff.bind(this)}>添加人员</span>
                                        : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
/**
 * 网格和列表模式
 */
class ListAndGridModel extends Component{
    static contextTypes = {
        changeConfigItem:PropTypes.func
    }
    static defaultProps ={
        name:'aaaaaaaa',
        id:'1111',

    }

    render() {

        let typeClass = classNames({
            'list-model-item':true,
            'grid':true,
            'grid2':true
        })

        return (
            <div className={typeClass}>
                <div className="list-item-title">
                    {this.props.name.length
                        ? this.props.name
                        :'小应用名称'
                    }   

                </div>
                <div className="list-item-content">
                    {this.props.name.length
                        ? <span onClick={this.context.changeConfigItem}>更换</span>
                        :<span onClick={()=>{alert('添加')}}>添加</span>    
                    }
                    
                    
                </div>
            </div>
        )
    }
}

