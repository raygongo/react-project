import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom'
import { Home ,HomeWork, Comment , Demo} from './pages'

import RouterConfig from './routes'

import {Button} from 'antd'
import logo from './logo.svg';
import './styles/App.less'

class App extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div> */}
        {/* <HomeWork /> */}
        {/* <Comment /> */}
		   {/* <RouterConfig />	 */}
       <Demo />
      </div>
    );
  }
}

export default App;