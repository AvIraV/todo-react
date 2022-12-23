import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLableChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAddTask(this.state.label, this.transformTime())
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  transformTime = () => {
    const { min, sec } = this.state
    let time = (parseInt(min) * 60 + parseInt(sec)) * 1000
    return time
  }

  getTaskMin = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  getTaskSec = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          value={this.state.label}
          autoFocus
          onChange={this.onLableChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus=""
          onChange={this.getTaskMin}
          value={this.state.min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus=""
          onChange={this.getTaskSec}
          value={this.state.sec}
        />
        <button type="submit hidden"></button>
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
}
