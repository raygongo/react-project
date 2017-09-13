import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, notification } from 'antd';
import classNames from 'classnames'
import http from '@/ajax'
import { saveModifyPage, delSingleItem, editListItem, addListItem, delGirdItem, changeFrameNum } from '@/ajax/api'
import { AppTip, NumberInput } from '@/components';
import { message } from 'antd';

const confirm = Modal.confirm;



export default class ConfigList extends Component {

    getConfigItems() {
        //  根据类型调用 单页 或者 网格的组件(列表也属于网格模式 只是样式不同)
        switch (this.props.listData.type) {
            case 'pc_page':
                return <ConfigSingleList listData={this.props.listData} />
            case 'mob_page':
                return <ConfigSingleList listData={this.props.listData} />
            default:
                return <ConfigGridList listData={this.props.listData} />
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
            name: props.name,
            mark: props.mark,
            url: props.url,
            showAppTip: false,
            id: props.id
        }
    }

    addNewConfig() {
        alert('添加或者更换应用')
    }
    /**
     * 更换 应用
     * @param {} param0 
     */
    handelChangeApp({ url, pgeico, name, mark }) {
        // 判断是 新增还是修改 还是删除  如果有url且mark一致说明是删除 
        // 删除
        if (this.state.url && (this.state.mark == mark)) {
            http.post(delGirdItem, {
                id: this.state.id,
            }).then(data => {
                // 成功后 初始化 数据
                this.setState({
                    id: null,
                    url: null,
                    ico: null,
                    name: null,
                    mark: null,
                })
            })
        } else if (this.state.url) {
            // 修改
            http.post(editListItem, {
                id: this.state.id,
                url,
                ico: pgeico,
                name,
                mark
            }).then(data => {
                // 成功后 修改 mark
                this.setState({
                    mark,
                    name
                })
            })

        } else {
            // 新增
            http.post(addListItem, {
                uid: this.props.uid,
                sort: this.props.sort,
                url,
                ico: pgeico,
                name,
                mark,
                frameNum: this.props.frameNum
            }).then(data => {

                this.setState({
                    mark,
                    name,
                    id: data,
                    url
                })
            })
        }

    }

    render() {
        return (
            <div className="config-grid-item">
                <div className="config-grid-title">
                    {this.state.name || '小应用名称'}
                </div>
                <div className="config-grid-content" onClick={() => { this.setState({ showAppTip: true }) }}>
                    {
                        this.state.mark
                            ? <span className="config-grid-change">更换</span>
                            : <span className="config-grid-add">添加</span>
                    }
                </div>
                {
                    this.state.showAppTip
                        ? <AppTip
                            tipData={this.state.tipData}
                            mark={this.state.mark}
                            id={this.state.id}
                            handelChangeApp={this.handelChangeApp.bind(this)}
                            handelClose={() => { this.setState({ showAppTip: false }) }} />
                        : null
                }
            </div>
        )
    }
}

class ConfigGridList extends Component {
    static contextTypes = {
        handelUpdateataByCid: PropTypes.func
    }
    /**
     * 修改移动端列表模式个数限制
     * @param {num} number 
     */
    handelChangeNumber(number) {
        http.post(changeFrameNum, {
            cid: this.props.listData.cid,
            frameNum: number
        }).then(data => {
            // 成功后需要刷新数据
            this.context.handelUpdateataByCid({
                cid: this.props.listData.cid,
                mode: 'mobile'
            })
        })
    }
    render() {
        // 模式是list样式 判断是否为网格模式 添加不同的样式
        const typeClass = classNames({
            'grid-model-1': this.props.listData.type === 'pc_grid_one',
            'grid-model-2': this.props.listData.type === 'pc_grid_two',
        })
        return (
            <div className={typeClass} style={{ height: '100%', padding: 20 }}>
                {
                    this.props.listData.type === 'mob_list'
                        ? <NumberInput number={this.props.listData.frameNum} handleBlurChange={this.handelChangeNumber.bind(this)} />
                        : null
                }

                {this.props.listData.list.map((itemConfig, index) => <ConfigGridItem
                    key={index}
                    {...itemConfig}
                    sort={index}
                    frameNum={this.props.listData.frameNum}
                    uid={this.props.listData.uid} />)}
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
        return this.state.listData.list.map((itemData, index) => {
            let staff = []
            // 把服务器 返回的 key:value 形式的值 转为两个对象 name和 cn 放入数组
            if (itemData.authInfo) {
                staff = itemData.authInfo.map(obj => {
                    const key = Object.keys(obj)[0]
                    return {
                        name: obj[key],
                        cn: key
                    }
                })
            }
            itemData.staff && (staff = itemData.staff)

            return (<ConfigSingleItem
                deleteConfigItem={this.deleteConfigItem.bind(this)}
                {...itemData} staff={staff}
                cid={this.props.listData.cid}
                index={index}
                saveConfig={this.handelSaveConfigItem.bind(this)}
                uid={this.props.listData.uid}
                key={index} />)
        })
    }
    /**
     * 添加新的单页配置
     */
    addNewConfig() {
        this.setState({
            listData: {
                ...this.state.listData,
                list: [
                    ...this.state.listData.list,
                    { url: '', uid: this.state.listData.uid, cid: this.state.listData.cid, id: '', staff: [], isEdit: true } //增加的一条新数据 绑定改模式的uid 
                ]
            }
        })
    }
    /**
     * 保存配置项
     */
    handelSaveConfigItem({ state, props }) {
        if (!state.staff.length || !state.url.length) {
            notification.warning({
                message: state.url.length ? '请选择人员!' : '请填写链接地址!',
                // description: '链接地址或人员不能为空!',
            });
            return
        }


        http.post(saveModifyPage, {
            id: state.id,
            uid: this.state.listData.uid,
            url: state.url,
            auth: JSON.stringify((state.staff.map(({ cn }) => cn)))
        })
            .then(data => {
                // 提示
                message.success('编辑成功')
                // 修改数据
                let list = this.state.listData.list
                list.splice(props.index, 1, Object.assign({}, list[props.index],
                    { isEdit: false, url: state.url, id: data, staff: state.staff, authInfo: '' }))

                this.setState({
                    listData: {
                        ...this.state.listData,
                        list: list
                    }
                })

            })
    }
    /**
     *  删除单页配置项
     */
    deleteConfigItem(uid, index, id) {
        console.log(index)

        confirm({
            title: '确定要删除该条规则吗',
            onOk: () => {
                // 分为两种情况删除 1. 本地删除 (添加配置未上传服务器)  2. 远程删除 已经保存 到服务器中
                // 1. 本地删除 (添加配置未上传服务器) 如果判断没有id
                // 2. 远程删除 

                if (id) {
                    // 如果该条配置有id 那对不起 说明 你是服务器上保存的 必须发请求删除
                    http.post(delSingleItem, { id: id })
                        .then(data => {
                            // 成功后刷新数据
                            let list = this.state.listData.list

                            list.splice(index, 1)
                            this.setState({
                                listData: {
                                    ...this.state.listData,
                                    list: list,
                                }
                            })
                        })
                } else {
                    // 成功后刷新数据
                    let list = this.state.listData.list
                    list.splice(index, 1)
                    this.setState({
                        listData: {
                            ...this.state.listData,
                            list: list,
                        }
                    })
                }

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const typeClass = classNames({
            'mobile-single': this.props.listData.type === 'mob_page',
        })
        return (
            <div style={{ height: '100%' }} className={typeClass}>
                {this.getItems()}
                <div className="add-status-model" onClick={this.addNewConfig.bind(this)}>
                    <i className="iconfont"></i> 添加
                </div>
            </div>
        )
    }
}

/**
 *  单页模式下的 item
 */
class ConfigSingleItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: props.isEdit,
            url: props.url,
            staff: props.staff,
            id: props.id,

        }
    }
    componentWillReceiveProps({ isEdit, url, staff, uid, id }) {
        this.setState({
            isEdit,
            url,
            staff,
            uid,
            id
        })
    }


    /**
     *  删除配置人员
     * @param {string} cn 
     */
    deletePerson(delCn) {
        // 找到 想通的cn 将其删除
        this.setState({
            staff: this.state.staff.filter(({ cn }) => delCn !== cn)
        })
    }

    /**
     * 取消编辑 恢复数据
     */
    cancelEdit() {
        this.setState({
            ...this.props,
            isEdit: false
        })
    }

    /**
     * 保存配置
     */
    handleSaveConfig() {

        http.post(saveModifyPage, {
            id: this.state.id,
            uid: this.props.uid,
            url: this.state.url,
            auth: JSON.stringify((this.state.staff.map(({ cn }) => cn)))
        })
            .then(data => {
                // 提示
                message.success('编辑成功')
                // 退出编辑模式
                this.setState({
                    isEdit: false,
                    id: data
                })
            })
    }
    /**
     * 调用组织架构选择器
     */
    handelOpenObjSelector() {
        window.$.objSelector({
            companyId: 200215,//当前企业ID，必填
            type: "background",
            imgBasePath: "",//图片相对于当前项目到objselector目录的相对路径地址
            // picAddr:/*picAddr*/ + "http://192.168.1.14:55123/IMFileServer/ftp/file",
            personId: "20058",//当前人员ID，必填
            token: 11111,//token，必填
            selectDept: false,//是否可以选择整个部门，默认true
            selectGroup: false,//是否可以选择整个工作组，默认true
            //            selectDeptWay:"user",//无用
            //            selectGroupWay:"group",//无用
            needLayer: true,//是否需要遮罩层，默认false
            linkMan: false,//是否显示联系人，默认true
            workGroup: false,//是否显示工作组，默认true
            organize: true,//是否显示组织架构，默认true
            dealDeptName: true,//是否处理组织架构的名称，截取
            dealJid: true,//是否处理jid，如果这样该值为true，则返回的数据会将jid的@部分去掉，原jid会保存为exJid
            //initData:initData,//已选择的数据，该数据要严格按照上面的格式书写，如果dealJid为true，则users中的jid须去掉@后面的部分
            // alert: $.alert,//你自己想要的弹出框的方法，该方法要求只传一条信息，如：alert("sfr234")，默认为alert
            maxSelect: { num: 5, unit: "人", msg: "不能选择超过5人的项目" },//最大选择数的限制，num为最大数量，如果该值为0或maxSelect为空或空对象，将不限制最大选择数量,unit，为单位，msg为超过最大选择限制的提示信息
            dataUrl: "http://localhost:8080/plugin-workbench/rest/redirect?url=pweb",//数据源的服务器地址以及项目地址，例：http://192.168.1.12:7001/ServerConsole/service/IMPortalService    ps：最后不要"/"
            callback: (res) => {//点击确定的回调函数，res为返回的结果
                console.log(this, res)
                // 取出数据
                const selectData = []
                res.users.forEach(({ jid, name, }) => {
                    // 去重
                    if (!this.state.staff.some(({ cn }) => cn === jid)) {
                        selectData.push({
                            cn: jid,
                            name,
                        })
                    }
                })
                this.setState({
                    staff: this.state.staff.concat(selectData)
                })

            },
            btns: [
                { title: "确定" },
                { title: "关闭" }
            ],
            afterConstruct: function () {//在构造完成窗体后执行的方法，一般用于修改窗体样式

            },
            afterClose: function (res) {//窗口关闭过后执行的方法,res为选中的数据
                //注：所有的关闭动作都将执行这个方法，请慎用
            }
        });
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
                                    <Button type="primary" onClick={() => { this.props.saveConfig(this) }}>确定</Button>
                                    <Button className="edit-cancel-btn" onClick={this.cancelEdit.bind(this)} type="primary" ghost>取消</Button>
                                </span>
                                : <span>
                                    <span className="edit-edit-btn" onClick={() => { this.setState({ isEdit: true }) }} >编辑</span>
                                    <span className="edit-del-btn" onClick={() => { this.props.deleteConfigItem(this.props.uid, this.props.index, this.state.id) }} >
                                        删除</span>
                                </span>
                        }
                    </div>

                    <div className="model-info">
                        <div className="model-info-line">
                            <span className="model-label">链接地址:</span>
                            <div className="model-url">
                                <input type="text" disabled={!this.state.isEdit} value={this.state.url} onChange={(e) => { this.setState({ url: e.target.value }) }} style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className="model-info-line">
                            <span className="model-label">人员:</span>
                            <div className="model-detail" >
                                {this.state.staff.map(({ name, cn }, index) => <ModelBlock
                                    deletePerson={this.deletePerson.bind(this)}
                                    isEdit={this.state.isEdit}
                                    key={index}
                                    cn={cn}>{name}</ModelBlock>)}
                                {
                                    this.state.isEdit
                                        ? <span className="add-person" onClick={this.handelOpenObjSelector.bind(this)}>添加人员</span>
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

const ModelBlock = ({ children, cn, isEdit, deletePerson }) => {

    return (
        <div className="model-item-block">
            <span>{children}</span>
            {
                isEdit
                    ? <i className="iconfont icon-delete" onClick={() => { deletePerson(cn) }}></i>
                    : null
            }
        </div>
    )
}