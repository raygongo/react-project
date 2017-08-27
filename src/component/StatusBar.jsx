import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class StatusBar extends Component {

    static propTypes = {
        isOpen: PropTypes.string
    }

    static defaultProps = {
        isOpen: '1'
    }

    constructor (props) {
        super(props)
        this.handleOpenChange = this.handleOpenChange.bind(this)
        this.state = {
            isOpen: this.props.isOpen
        }
    }

    handleOpenChange(e) {
        this.setState(
            {
                isOpen: e.target.value
            }
        )
    }

    render() {
        return (
            <div className="status-bar">
                状态:
                <label >
                    <input type="radio" value="1" checked={this.state.isOpen==='1'} onChange={this.handleOpenChange}/>
                    启用
                </label>
                <label >
                <input type="radio" value="0" checked={this.state.isOpen==='0'} onChange={this.handleOpenChange}/>
                    禁用
                </label>
                <Button type="primary" style={{ float: 'right', top: '10px' }}>
                    保存
                 </Button>

            </div>
        )
    }

}
