import React from 'react'
import { BrowserRouter, Route } from 'react-route-dom'

import {
    Home,
    App,
} from '../pages'

export default (
    <BrowserRouter >
    <div>
      <div>
      <Route exact path="/" component={Home} />
      <Route path="/about/:id" render={({history,location,match}) => <h1>{console.log(history,location,match)}
          About
          <span onClick={() => {history.push('/', {name:'mm'})}}>click me</span>
        </h1>} />
      <Route path="/contact" children={({match}) => match && <h1>Contact</h1> } />
      <Route path="/other/:page?/:subpage?" render={({ match }) => (
        <h1>
          PAGE: {match.params.page}<br/>
          SUBPAGE: {match.params.subpage}
        
        </h1>
      )} />
      </div>
      
      <Route path="/another/:a(\d{4}-\d{2}-\d{2}):b(\.[a-z]+)" render={({ match }) => (
        <h1>
          paramA: {match.params.a}<br/>
          paramB: {match.params.b}
        </h1>
      )} />
      <Route path='/query/user' render={({match, location}) => (
        <div>
          <p>query</p>
          <p>match:{JSON.stringify(match)}</p>
          <p>location:{JSON.stringify(location)}</p>
          <p>id:{new URLSearchParams(location.search).get('id')}</p>
          <p>name:{new URLSearchParams(location.search).get('name')}</p>
        </div>
      )} />
    </div>
  </BrowserRouter>
)
