import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames'
const confirm = Modal.confirm;



export default class ConfigList extends Component {

    getConfigItems() {
        switch (this.props.modelType) {
            case 'pc_single':
                return <ConfigSingleList listData={this.props.listData} />
            case 'mb_single':
                return <ConfigSingleList listData={this.props.listData} />     
            default:
                return <ConfigGridList listData={this.props.listData} type={this.props.modelType} />
            // case 'pc_grid1':
            //     return <ConfigGridList listData={this.props.listData} type={this.props.modelType} />
            // case 'pc_grid2':
            //     return <ConfigGridList listData={this.props.listData} type={this.props.modelType} />
        }

    }

    render() {
        return (
            <div style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
                {this.getConfigItems()}
            </div>
        )
    }
}

class ConfigGridItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:this.props.tilte ||'小应用名称',
            id: this.props.id || 0
        }
    }

    addNewConfig(){
        alert('添加或者更换应用')
    }

    render() {
        return (
            <div className="config-grid-item">
                <div className="config-grid-title">
                    {this.state.name}
                </div>
                <div className="config-grid-content" onClick={this.addNewConfig.bind(this)}>
                    {
                        this.state.id
                        ? <span>更换</span>
                        : <span>添加</span>
                    }
                </div>
            </div>
        )
    }
}

class ConfigGridList extends Component {
    render() {
        const typeClass = classNames({
            'grid-model-1': this.props.type === 'pc_grid1',
            'grid-model-2': this.props.type === 'pc_grid2',
        })
        return (
            <div className={typeClass} style={{ height: '100%', padding: 20 }}>
                {this.props.listData.map(({id,title,})=><ConfigGridItem key={id} id={id} tilte={title} /> )}
            </div>
        )
    }
}

class ConfigSingleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: this.props.listData
        }
    }

    getItems() {
        return this.state.listData.map(({ url, id, staff }) => {

            return (<ConfigSingleItem url={url} id={id} staff={staff} key={id} />)
        })
    }

    addNewConfig(){
        this.setState({
            listData:[
                ...this.state.listData,
                {url:'',id:'0',staff:[]}
            ]
        })
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                {this.getItems()}
                <div className="add-status-model" onClick={this.addNewConfig.bind(this)}>
                    <i className="iconfont"></i> 添加
                </div>
            </div>
        )
    }
}

class ConfigSingleItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            url: this.props.url,
            id: this.props.id,
            staff: this.props.staff
        }
    }

    showModel() {
        confirm({
            title: '确定要删除该条配置吗',
            content: 'this.context.color',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    deletePerson(id) {
        console.log('删除人员' + 'id')
    }

    render() {
        return (
            <div className="status-model">
                <div className="model-img"></div>

                <div className="model-content">
                    <div className="edit-btn-info">
                        {
                            this.state.isEdit
                                ? <span>
                                    <Button className="edit-text" type="primary">确定</Button>
                                    <Button onClick={() => { this.setState({ isEdit: false }) }} className="edit-text" type="primary" ghost>取消</Button>
                                </span>
                                : <span>
                                    <span onClick={() => { this.setState({ isEdit: true }) }} className="edit-text"><i className="iconfont icon-edit"></i>编辑</span>
                                    <span onClick={this.showModel.bind(this)} className="edit-text"><i className="iconfont icon-delete1"></i>删除</span>
                                </span>
                        }
                    </div>

                    <div className="model-info">
                        <div className="model-info-line">
                            <span className="model-label">链接地址:</span>
                            <div className="model-url">
                                <input type="text" disabled={!this.state.isEdit} style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className="model-info-line">
                            <span className="model-label">人员:</span>
                            <div className="model-detail" >
                                {this.state.staff.map(({name='',id='0'})=><ModelBlock deletePerson={this.deletePerson.bind(this)} isEdit={this.state.isEdit} key={id} id={id}>{name}</ModelBlock> )}
                                <span className="add-person">添加人员</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const ModelBlock = ({ children, id, isEdit, deletePerson }) => {

    return (
        <div className="model-item-block">
            <span>{children}</span>
            {
                isEdit
                    ? <i className="iconfont icon-delete" onClick={deletePerson}></i>
                    : null
            }
        </div>
    )
}