import React, { useState } from 'react'

import Logo from '../images/Logo.svg'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import '../styles/pages/Login.css'

import { shell } from 'electron'

function Login () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')

  function handleGoToWeb () {
    shell.openExternal('http://localhost:3000/Cadastro')
  }

  return (
    <div id="Login-page">
      <div className="form-description">
        <div className="logo-login">
          <img src={Logo} alt="Logo"/>
          <h1 className="logo-text"><span>Do</span>In</h1>
        </div>
      </div>
      <div className="form">
        <form className="autentic-form">
          <label className="input">
            <AiOutlineMail size={28} color="#fff"/>
            <input
              type="email"
              name="e-mail"
              placeholder="Digite seu e-mail"
              onChange={event => { setName(event.target.value) }}/>
          </label>
          <label className="input">
            <AiOutlineLock size={28} color="#fff"/>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={event => { setPassword(event.target.value) }}/>
          </label>
          <h4 className="link">Ainda não tem uma conta?<a href="#" onClick={handleGoToWeb}>Cadastre-se</a></h4>
          <Link to="/Kanban" className="button">Entrar</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
