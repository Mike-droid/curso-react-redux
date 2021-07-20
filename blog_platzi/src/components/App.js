import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './Menu'
import Users from './users/index'
import Tasks from './tasks/index'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component = {Users} />
        <Route exact path="/tasks" component = {Tasks} />
      </div>
    </Switch>
  </BrowserRouter>
)

export default App