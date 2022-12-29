import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = ({ onfilterCompletedTasks, onfilterAllTasks, onfilterActiveTasks }) => {
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

export default TaskFilter

TaskFilter.propTypes = {
  onfilterCompletedTasks: PropTypes.func,
  onfilterAllTasks: PropTypes.func,
  onfilterActiveTasks: PropTypes.func,
}
