import React, { Component } from 'react'
import './HomeWork.less'

export default class HomeWork extends Component {

    render() {
        return (
            <div>
                <Computer />
                <LessonsList />
            </div>
        )
    }
}

class Computer extends Component {
    constructor() {
        super()
        this.state = {
            status: false
        }
    }
    changeStatus() {
        this.setState({
            status: !this.state.status
        })
    }
    render() {
        return (
            <div>
                Computer
                <button onClick={this.changeStatus.bind(this)} >
                    {this.state.status ? '关' : '开'}
                </button>
                <Screen status={this.state.status} />
            </div>
        )
    }
}
class Screen extends Component {
    static defaultProps = {
        showContent: '无内容',
        status: false
    }
    render() {
        return (
            <div className="screen">
                <span>{this.props.showContent}</span>
                <div>
                    {
                        this.props.status
                            ? '显示器开了'
                            : '显示器关了'
                    }
                </div>
            </div>
        )
    }
}

const Lesson = (props) => {
    const printInfo = () => {
        console.log(props.num + props.lesson.title)
    }
    return (
        <div onClick={printInfo}>
            <h1>{props.lesson.title}</h1>
            <p>{props.lesson.description}</p>
        </div>
    )
}


class LessonsList extends Component {

    render () {
        const lessons = [
            { title: 'Lesson 1: title', description: 'Lesson 1: description' },
            { title: 'Lesson 2: title', description: 'Lesson 2: description' },
            { title: 'Lesson 3: title', description: 'Lesson 3: description' },
            { title: 'Lesson 4: title', description: 'Lesson 4: description' }
          ]
        return (
            <div>
                {lessons.map((lesson ,i) => <Lesson lesson={lesson} key={i} num={i}/>)}
            </div>
        )
    }
}