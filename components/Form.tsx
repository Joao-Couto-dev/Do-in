import React, { useState } from 'react';

import Logo from "../images/Logo.svg";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';

import "../styles/components/Form.css"

interface Props{
    title: String
    formName: String 
}

function Form(props: Props){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');

    return(
        <div id="Login-page">
            <div className="form-description">
                <div className="logo-login">
                    <img src={Logo} alt="Logo"/>
                    <h1 className="logo-text"><span>Do</span>In</h1>
                </div>
                <h2 className="form-title">{props.title}</h2>
            </div>
            <div className="form">

                   {props.formName === "Login" ?
                        (
                            <form className="autentic-form">  
                                <label className="input">
                                    <AiOutlineMail size={28} color="#fff"/>
                                    <input 
                                    type="email" 
                                    name="e-mail" 
                                    placeholder="Digite seu e-mail"
                                    onChange={event => {setName(event.target.value)}}/>
                                </label>
                                <label className="input">
                                    <AiOutlineLock size={28} color="#fff"/>
                                    <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Digite sua senha"
                                    onChange={event => {setPassword(event.target.value)}}/>
                                </label>
                                <h4 className="link">Ainda não tem uma conta?<Link to="Cadastro">Cadastre-se</Link></h4>
                                <Link to="/Kanban" className="button">Entrar</Link>
                            </form>
                        )  :
                        (
                            <form className="autentic-form">  
                                <label className="input">
                                    <AiOutlineUser size={28} color="#fff"/>
                                    <input 
                                    type="text" 
                                    name="nome" 
                                    placeholder="Digite seu nome"
                                    onChange={event => {setName(event.target.value)}}/>
                                </label>
                                <label className="input">
                                    <AiOutlineMail size={28} color="#fff"/>
                                    <input 
                                    type="email" 
                                    name="e-mail"
                                    placeholder="Digite seu e-mail"
                                    onChange={event => {setEmail(event.target.value)}}/>
                                </label>
                                <label className="input">
                                    <AiOutlineLock size={28} color="#fff"/>
                                    <input 
                                    type="password" 
                                    name="password"
                                    placeholder="Digite sua senha"
                                    onChange={event => {setPassword(event.target.value)}}/>
                                </label>
                                <label className="input">
                                    <AiOutlineLock size={28} color="#fff"/>
                                    <input 
                                    type="password" 
                                    name="comfirm-password" 
                                    placeholder="Comfirme sua senha"
                                    onChange={event => {SetConfirmPassword(event.target.value)}}/>
                                </label>
                                <h4 className="link">Já tem uma conta?<Link to="Login">Faça login</Link></h4>
                                    <Link to="/" className="button">Cadastrar</Link>
                            </form>
                        )
                    }
            </div>
        </div>
    )
}

export default Form;