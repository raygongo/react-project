import React, { Component } from 'react';
import PropTypes from 'prop-types'
import http from '@/ajax'
import { message } from 'antd';
import { findTerminalAll, changeStateAPI, getModeByCid } from '@/ajax/api'
import {
    ConfigList,
    MenuList,
    Menu,
    Tabs,
    TabPane,
    StatusBar,
    // ConfigModal
    // AppTip
} from '@/components'

/**
 * 对应的几种模式 以服务器返回的数据为准
 */
const PC = {
    single: 'pc_page',
    list: 'pc_list',
    grid1: 'pc_grid_one',
    grid2: 'pc_grid_two'
}
const MOBILE = {
    single: 'mob_page',
    list: 'mob_list'
}

export default class AppContainer extends Component {

    static childContextTypes = {
        handelOpenAppTip: PropTypes.func,
        handelUpdateataByCid: PropTypes.func,       // 更新数据
    }


    constructor(props) {
        super(props)
        this.state = {
            pcData: {
                list: []
            },
            mbData: {
                list: []
            },
            openAppTip: false,
            tipData: [],
            pcCheckedMode: '',    // pc 端 启用的模式
            mbCheckedMode: '',    // 移动 端 启用的模式
            backPcData: [],                // 备份pc端数据
            backMbData: [],                // 备份mobile数据
        }
    }
    // 利用context 分发 打开appTip的方法
    getChildContext() {
        return {
            handelUpdateataByCid: ({ cid, mode = 'pc' }) => {
                http.post(getModeByCid, { cid: cid })
                    .then(data => {
                        if (mode == 'pc') {
                            this.setState({
                                pcData: data
                            })
                        } else if (mode == 'mobile') {
                            this.setState({
                                mbData: data
                            })
                        }

                    })
            }
        }
    }

    componentDidMount() {
        // 发送请求获取数据
        this.getTerminalMode()
    }

    // 获取终端模式
    getTerminalMode() {

        // 获取pc端的 数据 并挂载到state上
        http.post(findTerminalAll, {
            orgId: '200196',
            terminal: 'PC'
        })
            .then(data => {
                // 找出对应的数据 单页 列表网格
                data.forEach(item => {
                    switch (item.type) {
                        case PC.single:
                            this.setState({
                                pcData: { ...item }
                            })
                            break;
                    }
                    // 找出选中模式
                    if (item.state === 1) {

                        this.setState({
                            pcCheckedMode: item.type
                        })
                    }
                })
                // 备份数据
                this.setState({
                    backPcData: data
                })
            })

        // 获取移动端初始数据
        http.post(findTerminalAll, {
            orgId: '200196',
            terminal: 'MOBILE'
        })
            .then(data => {
                data.forEach(item => {
                    switch (item.type) {
                        case MOBILE.single:
                            this.setState({
                                mbData: {
                                    ...item
                                }
                            })
                            break
                    }
                    // 找出移动端选中的模式
                    if (item.state === 1) {
                        this.setState({
                            mbCheckedMode: item.type
                        })
                    }
                })
                // 备份移动端数据
                this.setState({
                    backMbData: data
                })
            })
    }

    /**
     * menuList change事件
     * @param {string} 当前活动的tag 
     */
    handelMenuChange({ activeIndex, prevIndex }) {
        // 1.获取最新数据
        this.state.backPcData.some(item => {
            if (item.type === activeIndex) {

                http.post(getModeByCid, { cid: item.cid })
                    .then(data => {
                        this.setState({
                            pcData: data
                        })
                    })
                return true
            }
            return false
        })


    }
    /**
     * 监听切换移动端menuList 更改数据
     * @param {} param0 
     */
    handelMobileMenuChange({ activeIndex, prevIndex }) {
        this.state.backMbData.some(item => {
            if (item.type === activeIndex) {
                http.post(getModeByCid, { cid: item.cid })
                    .then(data => {
                        this.setState({
                            mbData: data
                        })
                    })
                return true
            }
            return false
        })
    }

    /**
     * 更换app
     */
    handelChangeApp(id, title) {
        // 接受到要被更改的app的id 和名字 
        // 从数组中找出来 进行更改

    }

    /**
     *  pc端状态的 启用与禁用
     */
    changeModeStatus(state, cid, mode) {
        // 1.发送请求
        http.post(changeStateAPI, {
            state: parseInt(state),
            id: parseInt(cid)
        }).then(data => {
            message.success('修改成功')
            // 修改当前 显示数据 的状态
            this.setState({
                pcData: {

                    ...this.state.pcData,
                    state: state
                },
                pcCheckedMode: parseInt(state) ? mode : '',
            })
            // // 如果是启用 需要 更改其他模式为停用
            // let pc = this.state.backPcData
            // if (state == 1) {
            //     // 修改menuList 的check属性
            //     this.setState({
            //         pcCheckedMode: mode
            //     })
            //     pc.forEach(data => {
            //         if (data.cid == cid) {
            //             data.state = 1
            //         } else {
            //             data.state = 0
            //         }
            //     })
            // } else {
            //     // 修改menuList 的check属性
            //     this.setState({
            //         pcCheckedMode: ''
            //     })
            //     pc.some(data => {
            //         if (data.cid == cid) {
            //             data.state = 0
            //             return true
            //         }
            //         return false
            //     })
            // }
            // // 修改当前 显示数据 的状态
            // this.setState({
            //     backPcData: pc,
            //     pcData: {
            //         ...this.state.pcData,
            //         state: state
            //     }
            // })
        })
    }
    /**
     * 移动端 状态的启用与停用
     */
    changeMobileStatus(state, cid, mode) {
        // 发送请求 修改状态
        http.post(changeStateAPI, {
            state: parseInt(state),
            id: parseInt(cid)
        }).then(data => {
            message.success('修改成功')
            // 修改menuList 的check属性
            this.setState({
                mbData: {
                    ...this.state.mbData,
                    state: state
                },
                mbCheckedMode: parseInt(state) ? mode : '',
            })
            // // 如果是启用 需要 更改其他模式为停用
            // let mb = this.state.backMbData
            // if (state == 1) {
            //     // 修改menuList 的check属性
            //     this.setState({
            //         mbCheckedMode: mode
            //     })
            //     mb.forEach(data => {
            //         if (data.cid == cid) {
            //             data.state = 1
            //         } else {
            //             data.state = 0
            //         }
            //     })
            // } else {
            //     // 修改menuList 的check属性
            //     this.setState({
            //         mbCheckedMode: ''
            //     })
            //     mb.some(data => {
            //         if (data.cid == cid) {
            //             data.state = 0
            //             return true
            //         }
            //         return false
            //     })
            // }
            // this.setState({
            //     backMbData: mb,
            //     mbData: {
            //         ...this.state.mbData,
            //         state: state
            //     }
            // })
        })
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Tabs classPrefix={'tabs'} iconClass={'iconfont icon-config1'} title="界面设置">
                    <TabPane
                        order={0}
                        tab={<span>PC</span>}>

                        <MenuList
                            activeIndex={PC.single}
                            onChange={this.handelMenuChange.bind(this)}
                            checked={this.state.pcCheckedMode}>
                            <Menu text="单页模式" index={PC.single} />
                            <Menu text="列表模式" index={PC.list} />
                            <Menu text="网格模式一" index={PC.grid1} />
                            <Menu text="网格模式二" index={PC.grid2} />
                        </MenuList>
                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar
                                checked={this.state.pcData.state}
                                cid={this.state.pcData.cid}
                                mode={this.state.pcData.type}
                                onChange={this.changeModeStatus.bind(this)} />
                            <ConfigList key="456" listData={this.state.pcData} />
                        </div>
                    </TabPane>

                    <TabPane
                        order={1}
                        tab={<span>移动端</span>}>

                        <MenuList
                            activeIndex={MOBILE.single}
                            onChange={this.handelMobileMenuChange.bind(this)}
                            checked={this.state.mbCheckedMode}>
                            <Menu text="单页模式" index={MOBILE.single} />
                            <Menu text="列表模式" index={MOBILE.list} />
                        </MenuList>

                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar
                                mode={this.state.mbData.type}
                                checked={this.state.mbData.state}
                                cid={this.state.mbData.cid}
                                onChange={this.changeMobileStatus.bind(this)} />
                            <ConfigList key="123" listData={this.state.mbData} />
                        </div>
                    </TabPane>
                </Tabs>
                {/* {
                    this.state.openAppTip
                        ? <AppTip
                            tipData={this.state.tipData}
                            handelChangeApp={this.handelChangeApp}
                            handelClose={() => { this.setState({ openAppTip: false }) }} />
                        : null
                } */}
            </div>
        )
    }

}