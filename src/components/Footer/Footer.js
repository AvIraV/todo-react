import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'

import './Footer.css'

const Footer = ({ todoCount, getFilterStatusFromFooter, removeAllCompletedTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter
        onfilterAllTasks={() => getFilterStatusFromFooter('all')}
        onfilterActiveTasks={() => getFilterStatusFromFooter('active')}
        onfilterCompletedTasks={() => getFilterStatusFromFooter('completed')}
      />
      <button className="clear-completed" onClick={removeAllCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  todoCount: PropTypes.number,
  getFilterStatusFromFooter: PropTypes.func,
  removeAllCompletedTasks: PropTypes.func,
}
