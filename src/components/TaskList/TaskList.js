import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ todos, onEditedLabel, onDeleted, onToggleCompleted, startTimer, stopTimer }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEditedLabel={(editLabel) => onEditedLabel(editLabel, id)}
        startTimer={() => startTimer(id)}
        stopTimer={() => stopTimer(id)}
      />
    )
  })
  return <ul className="task-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
}

export default TaskList
