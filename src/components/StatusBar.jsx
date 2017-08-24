import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class StatusBar extends Component {
    render() {
        return (
            <div className="status-bar">
                状态:
                <label >
                    <input type="radio" value={true} name="status" />
                    启用
                </label>
                <label >
                <input type="radio" value={false} name="status" />
                    禁用
                </label>
                <Button type="primary" style={{ float: 'right', top: '10px' }}>
                    保存
                 </Button>

            </div>
        )
    }

}
