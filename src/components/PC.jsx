import React, { Component } from 'react';
import { Button,Modal } from 'antd';
import PropTypes from 'prop-types';
// import { EventEmitter } from 'events'

const confirm = Modal.confirm;
let classnames = require('classnames');

export default class PC extends Component {
    static propTypes = {
        num: PropTypes.any
    }

    /**
     * 监听menuList change事件
     * @param {String} index 
     */
    handelMenuChange(index) {

    }

    render() {
        return (
                <div style={{height:'100%'}}>
                    <MenuList 
                        activeIndex="single" 
                        onChange={ this.handelMenuChange} 
                        checked="single">
                        <Menu text="单页模式" index="single"/>
                        <Menu text="列表模式" index="list"/>
                        <Menu text="网格模式一" index="grid1"/>
                        <Menu text="网格模式二" index="grid2"/>
                    </MenuList>

                    <StateContent />

                </div>  
                    
            
        );
    }
}


class MenuList extends Component {
    static propTypes = {
        height:PropTypes.string,
        width:PropTypes.string
    }
    static defaultProps = {
        height:'100%',
        width:'270px'
    }

    constructor (props) {
        super(props)

        let activeIndex = ''//this.props.children[0].index
        let checked = ''

        if ('activeIndex' in this.props) {
            activeIndex = this.props.activeIndex
        }
        ('checked' in this.props) && (checked = this.props.checked)

        this.state = {
            activeIndex,    // 菜单的选中id
            prevIndex: activeIndex,
            checked,
        }

    }

    handelMenuChange (activeIndex) {

        // 存储原始值
        const prevIndex = this.state.activeIndex
        // 确保有更改 才更新
        if( this.state.activeIndex !== activeIndex){
            this.setState({
                activeIndex,
                prevIndex,
            })
        }
        // 通知外界
        this.props.onChange({ activeIndex, prevIndex})
    }

    getMenuItem() {

        const { children } = this.props

        return React.Children.map(children , child => {
            if (!child) return

            const names = classnames({
                'menu-item':true,
                'menu-checked':child.props.index === this.state.checked,
                'menu-active': child.props.index === this.state.activeIndex
            })
            
            return (
                    <li 
                        className={names}
                        onClick={this.handelMenuChange.bind(this, child.props.index)}>
                        { child.props.text }
                        { child.props.index === this.state.checked 
                           ? <i className="iconfont icon-selected"></i>
                           : null
                        }
                    </li>
                )    
        })


    }

    render () {
        return (
            <div style={{width:`${this.props.width}`,height:`${this.props.height}`,float:'left'}}>
                <ul className="menu-list">
                    {this.getMenuItem()}
                </ul>
            </div>
        )
    }
}


const Menu = ( props ) => {
    return (
        <li className="menu-item"></li>
    )
}


const StateContent = ( props ) => {
    
    return (
        <div style={{overflow:'hidden',height:'100%'}}>
            <StatusBar />
            <StatusModelList />
        </div>
        
    )
}

class StatusBar extends Component {

    render () {
        return (
            <div className="status-bar">
                状态:
                <label >
                    <input type="radio" value={true} name="status"/>
                    启用
                </label>
                <label >
                    <input type="radio" value={false} name="status" />
                    禁用
                </label>
                <Button type="primary" style={{float:'right',top:'10px'}}>
                    保存
                </Button>
                
            </div>
        )
    }
}
class StatusModelList extends Component {
    // static ChildContextTypes = {
    //     color:PropTypes.string
    // }
    // getChildContext () {
    //     return {
    //         color:'red'
    //     }
    // }

    render () {
        return (
            <div style={{height:'100%',overflowY:'auto'}}>
                <StatusModel />
                <div className="add-status-model">
                    <i className="iconfont"></i> 添加
                </div>
            </div>
        )
    }
}

class StatusModel extends Component {
    // static contextTypes = {
    //     color:PropTypes.string
    // }
    
    showModel () {
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

    render () {
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
                                <input type="text" style={{width:'100%'}}/>
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

const ModelBlock = ( {children} ) => {

    return (
        <div className="model-item-block">
            <span>{children}</span>
            <i className="iconfont icon-delete"></i>
        </div>
    )
}