import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDrop, useDrag } from 'react-dnd'

import { AiOutlinePlus } from 'react-icons/ai'
import { GrDrag } from 'react-icons/gr'

import Card from '../components/Card'

import '../styles/components/List.css'

interface Ref {
    reference: React.MutableRefObject<undefined>
}

interface Cards {
       id: number,
       title: string,
       date: string,
       description: string
}

interface Props{
    data: {
        title: string,
        index: number,
        cards: Cards[]
    },
    index: number,
    moveCard: (a: number, b: number, c:number) => void,
    moveList: (a:number, b:number) => void,
    setBar: React.Dispatch<React.SetStateAction<{
        openBar: Cards[];
        isOpen: boolean[];
    }>>
}

function List (props: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const [, dragRef] = useDrag({
    item: {
      type: 'LIST',
      listIndex: 0,
      index: props.index

    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: ['CARD', 'LIST'],
    drop (item) {
      if (item.listIndex !== props.index && item.type === 'CARD') {
        props.moveCard(item.index, item.listIndex, props.index)
      }

      if (item.type === 'LIST') {
        props.moveList(item.index, props.index)
      }
    }
  })

  dragRef(dropRef(ref))

  return (
    <div className="list" ref={ref}>
      <div className="list-header">
        <h4 className="title">{props.data.title}</h4>
        <GrDrag className="drag-lists" size={30} color="rgba(255,255,255,0.5)"/>
        { props.index === 0 &&
                    <Link to="/Create-Card" className="addCard"><AiOutlinePlus size={22} color="#FFF"/></Link>
        }
      </div>
      {props.data.cards.map((card, index) => <Card key={index} index={index} listIndex={props.index} data={card} setBar={props.setBar}/>)}
    </div>
  )
}

export default List
