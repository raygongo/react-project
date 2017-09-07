import React, { Component } from 'react';
import { Button } from 'antd';

export default class StatusBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.checked,
        }
    }
    changeStatus(e) {
        if (e.target.value === this.state.checked) return
        this.setState({
            checked: e.target.value
        })
        
    }
    /**
     * 提交修改状态的值
     */
    handleChangeStatus(){
        // 判断值是更改的才发送
        if(this.state.checked === this.props.checked) return
        this.props.onChange(this.state.checked,this.props.cid, this.props.mode)
    }
    componentWillReceiveProps = ({checked}) => {
      this.setState({
        checked:checked
      })
    }
    
    render() {
        return (
            <div className="status-bar">
                状态:
                    <label >
                    <input type="radio" value={1} onChange={this.changeStatus.bind(this)} checked={this.state.checked == 1} />
                    启用
                    </label>
                <label >
                    <input type="radio" value={0} onChange={this.changeStatus.bind(this)} checked={this.state.checked == 0} />
                    停用
                    </label>
                <Button type="primary" onClick={this.handleChangeStatus.bind(this)} style={{ float: 'right', top: '10px' }}>
                    保存
                    </Button>

            </div>
        )
    }
}