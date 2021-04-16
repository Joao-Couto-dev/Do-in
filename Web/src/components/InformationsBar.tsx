import React, { useContext } from 'react';

import '../styles/components/InformationsBar.css'

import {AiOutlineCloseSquare} from 'react-icons/ai';
import {FiCalendar} from 'react-icons/fi';

import ToggleContext from '../contexts/toggle';

interface Props{
    data: {
    id: number,
    title: string,
    date: string,
    description: string
    },
    setBar: React.Dispatch<React.SetStateAction<{
        openBar: {
            id: number,
            title: string,
            date: string,
            description: string
            }[];
        isOpen: boolean[];
    }>>
}

function InformationsBar(props: Props){

    const { isOpen, openBar } = useContext(ToggleContext)

    function handleCloseBar(){

        isOpen.splice(0, 1, false);
        openBar.pop()

        props.setBar({ isOpen: isOpen, openBar: openBar})
    }

    return(
        <div className="informationsBar">
            <div className="close">
                <AiOutlineCloseSquare className="button-close" color="FF6C01" size={30} onClick={handleCloseBar}/>
            </div>
            <h1 className="task-name">{props.data.title}</h1>
            <div className="outputs">
                <div className="output-date">
                    <h2>Data de conclusão</h2>
                    <div className="date">
                        <FiCalendar color='#fff' size={26}/>
                        <h4>{props.data.date}</h4>
                    </div>
                </div>
                <div className="output-description">
                    <h2>Descrisão</h2>
                    <div className="description">
                        <h4>{props.data.description}</h4>
                    </div>
                </div>
                <div className="output-files">
                    <h2>Arquivos</h2>
                    <div className="files">
                    </div>
                </div>
                <button className="delete-task-button">Exluir tarefa</button>
            </div>
        </div>
    );
}

export default InformationsBar;