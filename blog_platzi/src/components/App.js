import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './Menu'
import Users from './users/index'
import Tasks from './tasks/index'
import Publicaciones from './Publicaciones'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component = {Users} />
        <Route exact path="/tasks" component = {Tasks} />
        <Route exact path="/publicaciones/:key" component = {Publicaciones} />
      </div>
    </Switch>
  </BrowserRouter>
)

export default App