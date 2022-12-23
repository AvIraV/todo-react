import React, { Component } from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  maxId = 50
  filter = 'all'

  state = {
    todoData: [
      this.createTodoTask('Completed', 0),
      this.createTodoTask('Editing', 0),
      this.createTodoTask('Active', 0),
    ],
  }

  createTodoTask(label, time) {
    return {
      label,
      time,
      id: this.maxId++,
      completed: false,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  onAddTask = (text, time) => {
    const newTask = this.createTodoTask(text, time)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask]

      return {
        todoData: newArr,
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldTask = arr[idx]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }

    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      }
    })
  }

  onfilterAllTasks = () => {
    this.filter = 'all'
    this.setState(({ todoData }) => {
      let newArr = [...todoData]
      return newArr
    })
  }

  onfilterActiveTasks = () => {
    this.filter = 'active'
    this.setState(({ todoData }) => {
      let newArr = [...todoData]
      newArr = newArr.filter((item) => !item.completed)
      return newArr
    })
  }

  onfilterCompletedTasks = () => {
    this.filter = 'completed'
    this.setState(({ todoData }) => {
      let newArr = [...todoData]
      newArr = newArr.filter((item) => item.completed)
      return newArr
    })
  }

  removeAllCompletedTasks = () => {
    this.setState({
      todoData: this.state.todoData.filter((todo) => !todo.completed),
    })
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((item) => !item.completed)
    } else if (filter === 'completed') {
      return items.filter((item) => item.completed)
    }
  }

  render() {
    let { todoData } = this.state

    const completedCount = todoData.filter((el) => el.completed).length
    const todoCount = todoData.length - completedCount
    const visibleItems = this.filterItems(todoData, this.filter)

    return (
      <div className="app main">
        <h1>todos</h1>
        <NewTaskForm onAddTask={this.onAddTask} />
        <TaskList todos={visibleItems} onDeleted={this.deleteItem} onToggleCompleted={this.onToggleCompleted} />
        <Footer
          toDo={todoCount}
          done={completedCount}
          removeAllCompletedTasks={this.removeAllCompletedTasks}
          onfilterCompletedTasks={this.onfilterCompletedTasks}
          onfilterActiveTasks={this.onfilterActiveTasks}
          onfilterAllTasks={this.onfilterAllTasks}
        />
      </div>
    )
  }
}
