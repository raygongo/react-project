import React, { Component } from 'react'
import './HomeWork.less'
import {Button} from 'antd'

export default class Comment extends Component {
    
    constructor () {
        super()
        this.state = {
            propData :[]
        }
    }
    handelSubmit ( comment = {} ) {
        this.state.propData.push(comment)
        this.setState({
            propData: this.state.propData
        })
    }
    render() {
        return (
            <div className="wapper">
                <CommentInput onSubmit={ this.handelSubmit.bind(this) }/>
                <CommentList commentData={ this.state.propData }/>
            </div>
        )
    }

}

class CommentInput extends Component {
    constructor () {
        super()
        this.state = {
            userName :'',
            content :'',
        }
    }
    handelChangeContent (event) {
        this.setState({
            content: event.target.value
        })
    }
    handelChangeUserName (event) {
        this.setState({
            userName: event.target.value
        })
    }
    handelSubmit () {
        this.props.onSubmit({
            userName: this.state.userName,
            content: this.state.content
        })
    }   
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input 
                            onChange={ this.handelChangeUserName.bind(this) }
                            value={ this.state.userName }/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea 
                            value={ this.state.content } 
                            onChange={ this.handelChangeContent.bind(this) }/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <Button type="primary" onClick={this.handelSubmit.bind(this)}>发布</Button>
                </div>
            </div>
        )
    }
}

class CommentList extends Component {
    static defaultProps ={
        commentData :[]
    }
    render() {
        return (
            <div>
                { this.props.commentData.map((comment , i) => <CommentItem key={i} comment={ comment } />) }
            </div>
        )
    }
}

class CommentItem extends Component {

    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                <span>{this.props.comment.userName} </span>：
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        )
    }
}