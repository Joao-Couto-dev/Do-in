import React, { useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import producer from "immer";

import Lists from '../db';

import Sidebar from "../components/Sidebar";
import List from "../components/List";

import "../styles/pages/Kanban.css"

import {MdPlaylistAdd} from  "react-icons/md";
import Context from '../contexts/toggle';
import InformationsBar from "../components/InformationsBar";

function Kanban(){
    const { isOpen, openBar} = useContext(Context);

    const [projectName, setProjectName] = useState('Project');
    const [data, setData] = useState(Lists);
    const [bar, setBar] = useState({ openBar: openBar, isOpen: isOpen});

    function handleValidateNameProject(){
        if(projectName.length < 0){
            alert('O nome do projeto não pode estar vazio!');
            setProjectName('Project')
        }
    }

    function handlerModalActive(){
        const modal = document.querySelector('.modal-contents');
        modal?.classList.add('modal-active');
    }

    function handlerModalHindden(event: React.MouseEvent<HTMLButtonElement>){
        event?.preventDefault();
        const modal = document.querySelector('.modal-contents');
        modal?.classList.remove('modal-active');  
    }

    function handlerMouseHover(){
        const button = document.querySelector('.text-button');
        button?.classList.remove('text-button');
        button?.classList.add('visible');
    }
    
    function handlerMouseUp(){
        const button = document.querySelector('.visible');
        button?.classList.add('text-button');
        button?.classList.remove('visible');
    }

    function moveCard( index: number, cardListIndex:number, listIndex: number ){
        setData(producer(data, draft => {
            const dragged = draft[cardListIndex].cards[index]

            draft[cardListIndex].cards.splice(index, 1);
            draft[listIndex].cards.push(dragged);
        }))  
    }

    function moveList(listDrag: number, listDrop: number){
        setData(producer(data, draft => {
            const dragged = draft[listDrag];

            draft.splice(listDrag, 1);
            draft.splice(listDrop, 0, dragged);
            console.log(dragged);
        }))
    }


    return(
            <div id="Kanban-page">
                <div className="modal-contents">
                    <div className="modal">
                        <form>
                            <h4 className="create-list-title">Nome da lista</h4>
                            <input type="text" name="list-name" className="create-list-input"></input>
                            <div className="create-list-buttons">
                                <button className="cancel-button" onClick={event => {handlerModalHindden(event)}}>Cancelar</button>
                                <button className="create-list-button">Criar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Sidebar page="Kanban"/>
                <div className="kanban-area">
                    <div className="project-title">
                        <h1 className="title-key">Nome do projeto:</h1>
                        <ContentEditable 
                        className="title" 
                        html={projectName}
                        onChange={event => setProjectName(event.target.value)}
                        onBlur={handleValidateNameProject}
                        />
                    </div>
                    <DndProvider backend={HTML5Backend}> 
                        <div className="kanban">
                            {data.map( (lists, index)  => <List key={index} index={index} data={lists} moveCard={ moveCard } moveList={moveList} setBar={setBar}/>)}
                        </div>
                        <div className="add-list">
                            <button className="create-list" onMouseOver={handlerMouseHover} onMouseLeave={handlerMouseUp} onClick={handlerModalActive}>
                                <h4 className="text-button">Criar nova lista</h4>
                                <MdPlaylistAdd className="list-button" size={26} color="#FFF"/>
                            </button>
                        </div>
                    </DndProvider>
                    {isOpen[0] && bar.openBar.map((element, index) => <InformationsBar key={index} data={element} setBar={setBar}/>)}
                </div>
            </div>
    );
}

export default Kanban;