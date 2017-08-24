import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom'
import { AppContainer } from './pages'
import './styles/App.less'
import './styles/AppContainer.less'

class App extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
       <AppContainer />
      </div>
    );
  }
}

export default App;