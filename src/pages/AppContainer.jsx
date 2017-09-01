import React, { Component } from 'react';
import PropTypes from 'prop-types'
import http from '@/ajax'
import {
    ConfigList,
    MenuList,
    Menu,
    Tabs,
    TabPane,
    StatusBar,
    // ConfigModal
    AppTip
} from '@/components'



export default class AppContainer extends Component {

    static childContextTypes = {
        handelOpenAppTip: PropTypes.func
    }


    constructor(props) {
        super(props)
        this.state = {
            pcModelType: '',
            pcData: [],
            mbData: [],
            singlePC: [{ url: 'www.baidu', id: '1', staff: [{ id: 1, name: '刘德华' }, { id: 2, name: '张学友' }] }],
            singleMB: [{ url: 'www.baidu', id: '1', staff: [{ id: 1, name: '刘德华' }, { id: 2, name: '张学友' }] }],
            gridData: [{ id: '22' }, { title: '组件', id: '11' }, { title: '组件', id: '33' }, { title: '组件', id: '44' }],
            gridDataMB: [{ id: '22' }, { title: '组件', id: '11' }, { title: '组件', id: '33' }, { title: '组件', id: '44' }],
            mbModelType: '',
            checked: '0',
            openAppTip: false,
            tipData:[]
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
                if(!this.tipData.length){
                    
                }
            },
        }
    }

    componentDidMount() {
        // 发送请求获取数据
        this.setState((prevState) => {
            return {
                pcModelType: 'pc_single',
                pcData: [{ url: 'www.baidu', id: '1', staff: [{ id: 1, name: '刘德华' }, { id: 2, name: '张学友' }] }],
                mbModelType: 'mb_single',
                mbData: [{ url: 'www.baidu', id: '1', staff: [{ id: 1, name: '刘德华' }, { id: 2, name: '张学友' }] }],
                tipData: []
            }
        })
    }

    /**
     * menuList change事件
     * @param {string} 当前活动的tag 
     */
    handelMenuChange({ activeIndex, prevIndex }) {
        switch (activeIndex) {
            case 'pc_single':
                this.setState({
                    pcModelType: activeIndex,
                    pcData: [
                        ...this.state.singleMB
                    ]
                })
                break
            default:
                this.setState({
                    pcModelType: activeIndex,
                    pcData: [
                        ...this.state.gridDataMB
                    ]
                })
        }

    }

    handelMobileMenuChange({ activeIndex, prevIndex }) {
        switch (activeIndex) {
            case 'mb_single':
                this.setState({
                    mbModelType: activeIndex,
                    mbData: [
                        ...this.state.singlePC
                    ]
                })
                break
            default:
                this.setState({
                    mbModelType: activeIndex,
                    mbData: [
                        ...this.state.gridData
                    ]
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

                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar checked={this.state.checked} />
                            <ConfigList key="456" modelType={this.state.pcModelType} listData={this.state.pcData} />
                        </div>
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

                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <StatusBar />
                            <ConfigList key="123" modelType={this.state.mbModelType} listData={this.state.mbData} />
                        </div>
                    </TabPane>
                </Tabs>
                {
                    this.state.openAppTip
                        ? <AppTip
                            tipData={this.state.tipData}
                            handelChangeApp={this.handelChangeApp}
                            handelClose={() => { this.setState({ openAppTip: false }) }} />
                        : null
                }
            </div>
        )
    }

}





