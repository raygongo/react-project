import React, { Component } from 'react'
import {
    Tabs,
    TabPane,
    MenuList,
    Menu,
    StatusBar,
    StatusModelList,
} from '@/components/'

// import {default as http} from '../ajax'
// let classnames = require('classnames')
export default class AppContainer extends Component {

    componentDidMount() {
        // 发送请求获取数据
    }
    /**
     * 监听menuList change事件
     * @param {String} index 
     */
    handelMenuChange(index) {

    }

    render() {
        return (
            <Tabs
                classPrefix={'tabs'}
                activeIndex={0}
                iconClass={'iconfont icon-config1'}
                title="界面设置">
                {/* PC端 */}
                <TabPane
                    order="0"
                    tab={<span>PC</span>}>
                    <MenuList
                        activeIndex="single"
                        onChange={this.handelMenuChange}
                        checked="single">
                        <Menu text="单页模式" index="single" />
                        <Menu text="列表模式" index="list" />
                        <Menu text="网格模式一" index="grid1" />
                        <Menu text="网格模式二" index="grid2" />

                    </MenuList>
                    <StatusBar />

                    <StatusModelList />
                </TabPane>
                {/* 移动端 */}
                <TabPane
                    order="1"
                    tab={<span>移动端</span>}>
                    <MenuList
                        activeIndex="single"
                        onChange={this.handelMenuChange}
                        checked="single">
                        <Menu text="单页模式" index="single" />
                        <Menu text="列表模式" index="list" />
                    </MenuList>

                    <StatusBar />
                    <StatusModelList />
                </TabPane>

            </Tabs>
        )
    }
};