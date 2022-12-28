import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  state = {
    changedLabel: '',
    editing: false,
  }

  componentDidMount() {
    this.setState({
      changedLabel: this.props.label,
    })
  }

  handleEditingDone = (e) => {
    if (e.keyCode === 13) {
      this.props.onEditedLabel(this.state.changedLabel)
      this.setState({
        editing: false,
      })
    }
  }

  handleEditingChange = (e) => {
    let _changedLabel = e.target.value
    this.setState({
      changedLabel: _changedLabel,
    })
  }

  onEdited = () => {
    this.setState({
      editing: true,
      changedLabel: this.props.label,
    })
  }

  render() {
    const { onDeleted, onToggleCompleted, completed, time, date } = this.props
    let classNames = 'task'

    if (completed) {
      classNames += ' completed'
    }

    let viewStyle = {}
    let editStyle = {}

    if (this.state.editing) {
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
            <span className="title">{this.state.changedLabel}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.props.startTimer}></button>
              <button className="icon icon-pause" onClick={this.props.stopTimer}></button>
              <p className="time">{format(time, 'mm:ss')}</p>
            </span>
            <span className="created">
              created
              {formatDistanceToNow(date, { includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdited}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        <input
          type="text"
          style={editStyle}
          className="edit"
          value={this.state.changedLabel}
          autoFocus
          onChange={this.handleEditingChange}
          onKeyDown={this.handleEditingDone}
        />
      </li>
    )
  }
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  label: PropTypes.string,
  time: PropTypes.number,
}
