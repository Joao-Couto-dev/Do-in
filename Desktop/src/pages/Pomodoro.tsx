import React, { useState, FormEvent, useEffect, useRef } from 'react'
import { ipcRenderer } from 'electron'
import '../styles/pages/Pomodoro.css'

import Sidebar from '../components/Sidebar'
import api from '../db'

import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai'
import { BiAlarm } from 'react-icons/bi'

let Work : NodeJS.Timeout
let Interval : NodeJS.Timeout

function Pomodoro () {
  const [intervalMinutes, setIntervalMinutes] = useState(5)
  const [workMinutes, setWorkMinutes] = useState(25)
  const [workTime, setWorkTime] = useState(25 * 60)
  const [intervalTime, setIntervalTime] = useState(5 * 60)
  const [initialTime, setInitialTime] = useState({ work: 25, interval: 5 })

  const [secondsView, setSecondsView] = useState('00')

  const [isWorkingTime, setIsWorkingTime] = useState(true)
  const [cicleCounter, setCicleCounter] = useState(0)
  const [hasClockStart, setHasClockStart] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTask, setActiveTask] = useState('')

  const select = useRef<HTMLSelectElement>(null)

  let convertSeconds: number

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    if (hasClockStart) {
      if (isWorkingTime) {
        if (cicleCounter !== 4) {
          Work = setTimeout(() => {
            setWorkTime(workTime - 1)

            console.log(workTime)

            convertSeconds = workTime % 60

            if (convertSeconds < 10) {
              setSecondsView('0' + String(Math.floor(convertSeconds)))
            } else {
              setSecondsView(String(Math.floor(convertSeconds)))
            }

            if (convertSeconds === 59) {
              setWorkMinutes(workMinutes - 1)
            }
            if (workMinutes === 0 && convertSeconds === 0) {
              clearTimeout(Work)
              setIsWorkingTime(false)

              resetValues()

              if (Notification.permission === 'granted') {
                new Notification('Hora do intervalo ☕', {
                  body: `Você tem ${intervalMinutes} minutos de intervalo!`,
                  icon: '../../public/favicon.svg'
                })
              }
            }
          }, 1000)
        } else {
          setIsModalOpen(true)
        }
      }
    } else {
      setWorkTime(workMinutes * 60)
      setIntervalTime(intervalMinutes * 60)
    }
  }, [hasClockStart, workMinutes, workTime, isWorkingTime])

  useEffect(() => {
    if (hasClockStart) {
      if (!isWorkingTime) {
        Interval = setTimeout(() => {
          setIntervalTime(intervalTime - 1)

          convertSeconds = intervalTime % 60

          if (convertSeconds < 10) {
            setSecondsView('0' + String(Math.floor(convertSeconds)))
          } else {
            setSecondsView(String(Math.floor(convertSeconds)))
          }

          if (convertSeconds === 59) {
            setIntervalMinutes(intervalMinutes - 1)
          }

          if (intervalMinutes === 0 && convertSeconds === 0) {
            clearTimeout(Interval)
            setIsWorkingTime(true)

            setCicleCounter(cicleCounter + 1)

            resetValues()

            if (Notification.permission === 'granted') {
              new Notification('Hora de voltar ao trabalho 🎯', {
                body: 'Volte e de tudo de si, foco!',
                icon: '../../public/favicon.svg'
              })
            }
          }
        }, 1000)
      }
    }
  }, [hasClockStart, intervalTime, intervalMinutes, isWorkingTime])

  function handleStartClock (event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    const value = select.current?.value

    if (value === 'Escolha a tarefa à ser feita') {
      return
    }

    const form = document.querySelector('.pomodoro-config')
    const controls = document.querySelector('.timer-controls')

        form?.classList.add('invisible-animation')
        setActiveTask(String(value))

        setTimeout(() => {
            form?.classList.add('less-width')
            controls?.classList.remove('invisible')
            controls?.classList.add('visible')
        }, 1000)

        setTimeout(() => {
            form?.classList.add('invisible')
        }, 2000)

        setCicleCounter(0)

        ipcRenderer.send('open-clock-window')

        setHasClockStart(true)
  }

  function resetValues () {
    setWorkMinutes(initialTime.work)
    setWorkTime(initialTime.work * 60)

    setIntervalMinutes(initialTime.interval)
    setIntervalTime(initialTime.interval * 60)
  }

  function handleClockEnd () {
    const form = document.querySelector('.pomodoro-config')
    const controls = document.querySelector('.timer-controls')

    setHasClockStart(false)

    setIsWorkingTime(true)

    if (isWorkingTime) {
      clearTimeout(Work)
    } else {
      clearTimeout(Interval)
    }

    resetValues()
    setSecondsView('00')

        form?.classList.remove('less-width')
        form?.classList.remove('invisible-animation')
        form?.classList.remove('invisible')

        controls?.classList.add('invisible')
        controls?.classList.remove('visible')
  }

  function handleLessWorkTime (event : React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (workMinutes > 1) {
      setWorkMinutes(c => c - 1)
      setInitialTime({ work: initialTime.work - 1, interval: initialTime.interval })
    }
  }

  function handlePlusWorkTime (event : React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (workMinutes < 200) {
      setWorkMinutes(c => c + 1)
      setInitialTime({ work: initialTime.work + 1, interval: initialTime.interval })
    }
  }

  function handleLessIntervalTime (event : React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (intervalMinutes > 2) {
      setIntervalMinutes(c => c - 1)
      setInitialTime({ work: initialTime.work, interval: initialTime.interval - 1 })
    }
  }

  function handlePlusIntervalTime (event : React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (intervalMinutes < 60) {
      setIntervalMinutes(c => c + 1)
      setInitialTime({ work: initialTime.work, interval: initialTime.interval + 1 })
    }
  }

  return (
    <div id="pomodoro-page">
      <div className="modal-contents">
        <div className="modal">
          <div className="alert-text">
            <BiAlarm color="#FF6C01" size={58}/>
            <h1>Pomodoro completo!</h1>
          </div>
          <div className="buttons-area">
            <button className="confirm-button" onClick={() => setIsModalOpen(false)}>OK</button>
          </div>
        </div>
      </div>
      <Sidebar page="Pomodoro"/>
      <div className="pomodoro-area">
        <div className="pomodoro-config">
          <form>
            <select className="select-task" name="tarefas" ref={select}>
              <option disabled selected>Escolha a tarefa à ser feita</option>
              {api.map((item) => item.cards.map((item) => <option key={item.id} value={item.title}>{item.title}</option>))}
            </select>
            <div className="timer-config">
              <div className="timer-options">
                <div className="timer-counter">
                  <h3 className="work-title">Tempo de trabalho</h3>
                  <div className="counter" style={isWorkingTime ? { borderColor: '#FF6C01' } : { borderColor: '#AB4800' }}>
                    <button className="less"
                      onClick={event => handleLessWorkTime(event)}
                    ><AiOutlineLine size={35} color="#FF6C01"/></button>
                    <h3 className="work-time">{workMinutes}</h3>
                    <button className="plus"
                      onClick={event => handlePlusWorkTime(event)}
                    ><AiOutlinePlus size={35} color="#FF6C01"/></button>
                  </div>
                </div>
                <div className="timer-counter">
                  <h3 className="work-title">Intervalo</h3>
                  <div className="counter">
                    <button className="less"
                      onClick={event => handleLessIntervalTime(event)}
                    ><AiOutlineLine size={35} color="#FF6C01"/></button>
                    <h3 className="work-time">{intervalMinutes}</h3>
                    <button className="plus"
                      onClick={event => handlePlusIntervalTime(event)}
                    ><AiOutlinePlus size={35} color="#FF6C01"/></button>
                  </div>
                </div>
              </div>
            </div>
            <button className="start-button" onClick={event => handleStartClock(event)}>Começar</button>
          </form>
        </div>
        <div className="pomodoro-clock">
          <div className="clock" style={isWorkingTime ? { borderColor: '#FF6C01' } : { borderColor: '#AB4800' }}>
            <h3 className="clock-time">{ isWorkingTime ? workMinutes : intervalMinutes}:{secondsView}</h3>
          </div>
          <div className="timer-controls invisible">
            <h2 className="task">{activeTask}</h2>
            <button className="stop" onClick={handleClockEnd}>Parar tarefa</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pomodoro
