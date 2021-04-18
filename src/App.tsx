import React from 'react'
import { render } from 'react-dom'
import './styles/Global.css'
import Routes from './routes'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

function App () {
  return (
    <Routes/>
  )
}

render(<App />, mainElement)
