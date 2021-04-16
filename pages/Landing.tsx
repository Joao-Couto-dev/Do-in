import React from 'react';
import { Link } from "react-router-dom";

import { SiFacebook, SiInstagram } from "react-icons/si";

import '../styles/pages/Landing.css';
import Logo from '../images/Logo.svg';
import Graphic from "../images/Landing-graphic.svg";



function Landing(){
return(    
    <div className="landing-page">
        <div className="landing-contents">
            <div className="container">
                <div className="logo-contents">
                    <img className="logo" src={Logo} alt="logo"/>
                    <h4 className="logo-text">Do <span className="span-logo-text">In</span></h4>
                </div> 
                <div className="presentation">
                    <h1 className="presentation-frist-text">Do it in your time!</h1>
                    <h4 className="presentation-second-text">Alavanque os seus projetos em equipe</h4>
                    <div className="presentation-buttons">
                        <Link to="/Login" className="button-login">Login</Link> 
                        <Link to="/Cadastro" className="button-criar-conta">Criar conta</Link>    
                    </div>
                </div>
            </div>
            <div className="landing-contents-graphic">
                <img className="graphic" src={Graphic} alt="grafic image"/>
            </div>
        </div>
                <div className="topic-contents">    
                    <div className="topic-video">
                        <div className="topic">
                            <h2 className="topic-number">01</h2>
                            <h4 className="topic-name">Metodologias</h4>
                            <p className="topic-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit voluptates quisquam obcaecati ipsa perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consequatur aliquid repellat voluptas itaque eum, quis, quia a laudantium minu</p>
                        </div>
                    <video />
                    </div>
                    <div className="topic-rigth"> 
                        <div className="topic" id="rigth"> 
                            <h2 className="topic-number">02</h2>
                            <h4 className="topic-name">Flexibilidade</h4>
                            <p className="topic-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit voluptates quisquam obcaecati ipsa perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consequatur aliquid repellat voluptas itaque eum, quis, quia a laudantium minu</p>
                        </div>
                    </div>
                    <div className="topic">  
                        <h2 className="topic-number">03</h2>
                        <h4 className="topic-name">produtividade</h4>
                        <p className="topic-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit voluptates quisquam obcaecati ipsa perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consequatur aliquid repellat voluptas itaque eum, quis, quia a laudantium minu</p>
                    </div>
                </div>
                <footer>
                    <div className="footer-title">
                        <h4 className="footer-logo"><span>Do</span>In</h4>
                    </div>
                    <div className="social-medias">
                        <SiFacebook size={34} color="white" className="icon"/>
                        <SiInstagram size={34} color="white" className="icon"/>
                        <h6 className="copyrigth">| Todos os direitos reservados Do In</h6>
                    </div>
                </footer>
    </div> 
)     
}

export default Landing;