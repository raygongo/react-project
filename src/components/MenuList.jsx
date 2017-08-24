import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'


export const Menu = ( props ) => {
    return (
        <li className="menu-item"></li>
    )
}

export default class MenuList extends Component {
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

            const names = classNames({
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

