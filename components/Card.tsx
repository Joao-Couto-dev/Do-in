import React, { useContext, useState } from "react";
import {useDrag} from "react-dnd";

import { BsInfoSquare } from "react-icons/bs";

import "../styles/components/Card.css";

import Context from '../contexts/toggle';

interface Props{
    index: number,
    listIndex: number,
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

function Card(props: Props){

    const { isOpen, openBar, visibleChange } = useContext(Context);

    function handleOpenBar(){
        visibleChange(isOpen, openBar, props.data);
        props.setBar({openBar: openBar, isOpen: isOpen});
    }

    const [{ isDragging }, dragRef] = useDrag({
        item: { 
            type: 'CARD',
            listIndex: props.listIndex,
            index: props.index,

        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    return(
        <div 
        className="card" 
        ref={dragRef}
        style={isDragging ? {opacity: 0} : {opacity: 1}}>
            <div className="task-title-information">
            <h2 className="card-task-title">{props.data.title}</h2>
            </div>
            <div className="informations">
                <BsInfoSquare size={20} color=" #FF6C01" onClick={handleOpenBar}/>
            </div>
        </div>
    );
}

export default Card;