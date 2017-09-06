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



export default class AppContainer extends Component {

    static childContextTypes = {
        handelOpenAppTip: PropTypes.func,
        handelUpdateModeData: PropTypes.func,       // 更新数据
    }


    constructor(props) {
        super(props)
        this.state = {
            pcModelType: '',
            pcData: {
                list: []
            },
            mbData: {
                list: []
            },
            // pcSingle: [{ url: 'www.baidu', id: '1', staff: [{ id: 1, name: '刘德华' }, { id: 2, name: '张学友' }] }],
            pcSingle: { list: [] },      // pc 端 单页 配置数据
            pcList: { list: [] },        // pc 端 列表 配置数据
            pcGridOne: { list: [] },     // pc 端 网格模式1 配置数据
            pcGridTwo: { list: [] },     // pc 端 网格模式2 配置数据
            mbSingle: { list: [] },      // 移动端 单页模式 配置
            mbList: { list: [] },        // 移动端 网格模式 配置
            mbModelType: '',
            pcSelected: 'pc_single',
            mbSelected: '',
            openAppTip: false,
            tipData: []
        }
    }
    // 利用context 分发 打开appTip的方法
    getChildContext() {
        return {
            handelOpenAppTip: () => {
                this.setState({
                    openAppTip: true
                })
                // 注入数据
                // if (!this.state.tipData.length) {
                    
                // }
            },
            // 修改成功后 重新获取对应的数据
            handelUpdateModeData: (cid, type) => {
                http.post(getModeByCid, {
                    cid: parseInt(cid)
                })
                    .then(data => {
                        switch (type) {
                            case 'pc_single':
                                this.setState({
                                    pcSingle: Object.assign({},this.state.pcSingle,{list: data})
                                })
                                break;
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
                        case 'pc_page':
                            this.setState({
                                pcSingle: { ...item },
                                pcData: { ...item }
                            })
                            break;
                        case 'pc_list':
                            this.setState({
                                pcList: { ...item }
                            })
                            break;
                        case 'pc_grid_one':
                            this.setState({
                                pcGridOne: { ...item }
                            })
                            break;
                        case 'pc_grid_two':
                            this.setState({
                                pcGridTwo: { ...item }
                            })
                            break;

                    }
                })
            })

        http.post(findTerminalAll, {
            orgId: '200196',
            terminal: 'MOBILE'
        })
            .then(data => {
                data.forEach(item => {
                    switch (item.type) {
                        case 'mob_page':
                            this.setState({
                                mbSingle: {
                                    ...item
                                },
                                mbData: {
                                    ...item
                                }
                            })
                            break
                        case 'mob_list':
                            this.setState({
                                mbList: {
                                    ...item
                                }
                            })
                    }
                })
            })
    }

    /**
     * 获取content内容
     */
    getContentList() {
        switch (this.state.pcSelected) {
            case 'pc_single':
                return <div style={{ height: '100%', overflow: 'hidden' }}>
                    <StatusBar key={1} checked={this.state.pcSingle.state} cid={this.state.pcSingle.cid} onChange={this.changeModeStatus.bind(this)} />
                    <ConfigList key={this.state.pcSingle.cid} listData={this.state.pcSingle} />
                </div>
            case 'pc_list':
                return <div style={{ height: '100%', overflow: 'hidden' }}>
                    <StatusBar key={2}  checked={this.state.pcList.state} cid={this.state.pcList.cid} onChange={this.changeModeStatus.bind(this)} />
                    <ConfigList key={this.state.pcList.cid} listData={this.state.pcList} />
                </div>
            case 'pc_grid1':
                return <div style={{ height: '100%', overflow: 'hidden' }}>
                    <StatusBar key={5}  checked={this.state.pcGridOne.state} cid={this.state.pcGridOne.cid} onChange={this.changeModeStatus.bind(this)} />
                    <ConfigList key={this.state.pcGridOne.cid} listData={this.state.pcGridOne} />
                </div>
            case 'pc_grid2':
                return <div style={{ height: '100%', overflow: 'hidden' }}>
                    <StatusBar key={4} checked={this.state.pcGridTwo.state} cid={this.state.pcGridTwo.cid} onChange={this.changeModeStatus.bind(this)} />
                    <ConfigList key={this.state.pcGridTwo.cid} listData={this.state.pcGridTwo} />
                </div>
        }
    }

    /**
     * menuList change事件
     * @param {string} 当前活动的tag 
     */
    handelMenuChange({ activeIndex, prevIndex }) {
        this.setState({
            pcSelected: activeIndex
        })
    }
    /**
     * 监听切换移动端menuList 更改数据
     * @param {} param0 
     */
    handelMobileMenuChange({ activeIndex, prevIndex }) {
        switch (activeIndex) {
            case 'mb_single':
                this.setState({
                    mbData: {
                        ...this.state.mbSingle
                    }
                })
                break
            case 'mb_list':
                this.setState({
                    mbData: {
                        ...this.state.mbList
                    }
                })
        }
    }

    /**
     * 更换app
     */
    handelChangeApp(id, title) {
        // 接受到要被更改的app的id 和名字 
        // 从数组中找出来 进行更改

    }

    /**
     * 状态的 启用与禁用
     */
    changeModeStatus(state, cid) {
        debugger
        // 1.发送请求
        http.post(changeStateAPI, {
            state: parseInt(state),
            id: parseInt(cid)
        }).then(data => {
            message.success('修改成功')

            // 2. 当设置启用模式成功后 需要将其他模式的 状态改为停用
            if (state == 1) {
                this.setState({
                    pcSingle: {
                        ...this.state.pcSingle,
                        state: this.state.pcSingle.cid == cid ? 1 : 0
                    },
                    pcList: {
                        ...this.state.pcList,
                        state: this.state.pcList.cid == cid ? 1 : 0
                    },
                    pcGridOne: {
                        ...this.state.pcGridOne,
                        state: this.state.pcGridOne.cid == cid ? 1 : 0
                    },
                    pcGridTwo: {
                        ...this.state.pcGridTwo,
                        state: this.state.pcGridTwo.cid == cid ? 1 : 0
                    },
                })
            }

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
                            activeIndex="pc_single"
                            onChange={this.handelMenuChange.bind(this)}
                            checked="pc_single">
                            <Menu text="单页模式" index="pc_single" />
                            <Menu text="列表模式" index="pc_list" />
                            <Menu text="网格模式一" index="pc_grid1" />
                            <Menu text="网格模式二" index="pc_grid2" />
                        </MenuList>
                        {this.getContentList()}
                        {/* <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar checked={this.state.pcData.state} cid={this.state.pcData.cid} onChange={this.changeModeStatus.bind(this)} />
                            <ConfigList key="456" listData={this.state.pcData} />
                        </div> */}
                    </TabPane>

                    <TabPane
                        order={1}
                        tab={<span>移动端</span>}>

                        <MenuList
                            activeIndex="mb_single"
                            onChange={this.handelMobileMenuChange.bind(this)}
                            checked="mb_single">

                            <Menu text="单页模式" index="mb_single" />
                            <Menu text="列表模式" index="mb_list" />
                        </MenuList>

                        {/* <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar checked={this.state.checked} />
                            <ConfigList key="123" listData={this.state.mbData} />
                        </div> */}
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





