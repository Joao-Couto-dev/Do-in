import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Kanban from './pages/Kanban'
import Pomodoro from './pages/Pomodoro'
import Grafic from './pages/Grafic'
import CreateCard from './pages/CreateCard'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/Kanban" component={Kanban}/>
        <Route path="/Pomodoro" component={Pomodoro}/>
        <Route path="/Create-Card" component={CreateCard}/>
        <Route path="/Grafico" component={Grafic}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
