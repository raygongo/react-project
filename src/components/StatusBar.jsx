import React, { Component } from 'react';
import { Button } from 'antd';

export default class StatusBar extends Component {

    constructor (props){
        super(props)
        this.state = {
            checked:this.props.checked || 1
        }
    }
    changeStatus(e) {
        this.setState({
            checked:e.target.value
        })
    }

    render() {
        return (
            <div className="status-bar">
                状态:
                    <label >
                    <input type="radio" name="check" value="1" onChange={this.changeStatus.bind(this)} checked={this.state.checked === 1}/>
                    启用
                    </label>
                <label >
                    <input type="radio" name="check" value="0" onChange={this.changeStatus.bind(this)} checked={this.state.checked === 0}/>
                    禁用
                    </label>
                <Button type="primary" style={{ float: 'right', top: '10px' }}>
                    保存
                    </Button>

            </div>
        )
    }
}
