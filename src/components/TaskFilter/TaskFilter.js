import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

export default class TaskFilter extends Component {
  render() {
    const { onfilterCompletedTasks, onfilterAllTasks, onfilterActiveTasks } = this.props
    return (
      <ul className="task-filter filters">
        <li>
          <button onClick={onfilterAllTasks}>All</button>
        </li>
        <li>
          <button onClick={onfilterActiveTasks}>Active</button>
        </li>
        <li>
          <button onClick={onfilterCompletedTasks}>Completed</button>
        </li>
      </ul>
    )
  }
}

TaskFilter.propTypes = {
  onfilterCompletedTasks: PropTypes.func,
  onfilterAllTasks: PropTypes.func,
  onfilterActiveTasks: PropTypes.func,
}
