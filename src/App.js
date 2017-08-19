import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom'
import { Home ,HomeWork } from './pages'
import {Button} from 'antd'
import logo from './logo.svg';
import './App.css';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Button type="primary">我是按钮</Button>
        </p>
        <HomeWork />
        <Router>
          <Route path="/" component={Home}></Route>
        </Router>
      </div>
    );
  }
}

export default App;