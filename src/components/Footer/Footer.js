import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'

import './Footer.css'

const Footer = ({ toDo, onfilterCompletedTasks, onfilterAllTasks, onfilterActiveTasks, removeAllCompletedTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter
        onfilterCompletedTasks={() => onfilterCompletedTasks()}
        onfilterAllTasks={() => onfilterAllTasks()}
        onfilterActiveTasks={() => onfilterActiveTasks()}
      />
      <button className="clear-completed" onClick={removeAllCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  toDo: PropTypes.number,
  onfilterCompletedTasks: PropTypes.func,
  onfilterAllTasks: PropTypes.func,
  onfilterActiveTasks: PropTypes.func,
  removeAllCompletedTasks: PropTypes.func,
}
