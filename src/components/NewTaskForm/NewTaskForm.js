import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = ({ onAddTask }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLableChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label !== '') {
      onAddTask(label, transformTime())
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  const transformTime = () => {
    let minute = min === '' ? '0' : min
    let second = sec === '' ? '0' : sec
    let time = (parseInt(minute) * 60 + parseInt(second)) * 1000
    return time
  }

  const getTaskMin = (e) => {
    setMin(e.target.value)
  }

  const getTaskSec = (e) => {
    setSec(e.target.value)
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder="Task" value={label} autoFocus onChange={onLableChange} />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        autoFocus=""
        onChange={getTaskMin}
        value={min}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        autoFocus=""
        onChange={getTaskSec}
        value={sec}
      />
      <button type="submit hidden"></button>
    </form>
  )
}

export default NewTaskForm

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
}
