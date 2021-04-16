import React from "react";

import { BsKanban } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import Logo from "../images/Logo.svg";

import "../styles/components/Sidebar.css"
import { Link } from "react-router-dom";

interface Props{
    page: string;
}

function Sidebar(props: Props){
    return(
        <div className="sidebar-contents">
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="Logo"/>
                </div>
                {props.page === "Kanban" ? (
                    <div className="options-icons">
                    <Link to="/Kanban"><BsKanban color="#FF6C01" size={38}/></Link>
                    <Link to="/Pomodoro"><IoIosTimer color="#FFF" size={38}/></Link>
                    <Link to="/Grafico"><VscGraph color="#FFF" size={38}/></Link>
                    </div> 
                ) : (props.page === "Pomodoro" ? (
                        <div className="options-icons">
                        <Link to="/Kanban"><BsKanban color="#FFF" size={38}/></Link>
                        <Link to="/Pomodoro"><IoIosTimer color="#FF6C01" size={38}/></Link>
                        <Link to="/Grafico"><VscGraph color="#FFF" size={38}/></Link>
                        </div>
                ) : (
                    <div className="options-icons">
                        <Link to="/Kanban"><BsKanban color="#FFF" size={38}/></Link>
                        <Link to="/Pomodoro"><IoIosTimer color="#FFF" size={38}/></Link>
                        <Link to="/Grafico"><VscGraph color="#FF6C01" size={38}/></Link>
                    </div>
                ))}
                   
        </div>
        </div>
    );
}

export default Sidebar;