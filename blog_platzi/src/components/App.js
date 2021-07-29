import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './Menu'
import Users from './users/index'
import Tareas from './Tareas/index'
import Publicaciones from './Publicaciones'
import Guardar from './Tareas/Guardar'

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <div className="margen">
        <Route exact path="/" component = {Users} />
        <Route exact path="/tareas" component = {Tareas} />
        <Route exact path="/publicaciones/:key" component = {Publicaciones} />
        <Route exact path="/tareas/guardar" component = {Guardar} />
        <Route exact path="/tareas/guardar/usuario:id/tarea:id" component = {Guardar} />
      </div>
    </Switch>
  </BrowserRouter>
)

export default App