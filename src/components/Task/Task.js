import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

import './Task.css'

const Task = ({ onDeleted, onToggleCompleted, completed, time, date, label, onEditedLabel, stopTimer, startTimer }) => {
  const [changedLabel, setChangedLabel] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setChangedLabel(label)
  }, [])

  const handleEditingDone = (e) => {
    if (e.keyCode === 13) {
      onEditedLabel(e.target.value)
      setEditing(false)
    }
  }

  const onEdited = () => {
    setEditing(!editing)
    setChangedLabel(label)
  }

  let classNames = 'task'

  if (completed) {
    classNames += ' completed'
  }

  let viewStyle = {}
  let editStyle = {}

  if (editing) {
    classNames += ' editing'
    viewStyle.display = 'none'
  } else {
    editStyle.display = 'none'
  }

  return (
    <li className={classNames}>
      <div className="view" style={viewStyle}>
        <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onToggleCompleted} />
        <label>
          <span className="title">{changedLabel}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            <p className="time">{format(time, 'mm:ss')}</p>
          </span>
          <span className="created">
            created
            {formatDistanceToNow(date, { includeSeconds: true })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onEdited}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>

      <input
        type="text"
        style={editStyle}
        className="edit"
        value={changedLabel}
        autoFocus
        onChange={(e) => {
          setChangedLabel(e.target.value)
        }}
        onKeyDown={(e) => handleEditingDone(e)}
      />
    </li>
  )
}
export default Task

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  label: PropTypes.string,
  time: PropTypes.number,
  onEditedLabel: PropTypes.func,
  stopTimer: PropTypes.func,
  startTimer: PropTypes.func,
}
