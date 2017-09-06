import React, { Component } from 'react';
import { AppContainer } from './pages'
import '@/styles/App.less'
import '@/styles/AppContainer.less'
import '@/styles/objSelector-background.css'

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