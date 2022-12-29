import React, { useState, useEffect } from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [id, setID] = useState(3)
  const [filter, setFilter] = useState('all')

  const [todoData, setTodoData] = useState([
    {
      label: 'Completed',
      time: 0,
      date: new Date(),
      pause: true,
      id: 0,
      completed: false,
    },
    {
      label: 'Editing',
      time: 0,
      date: new Date(),
      pause: true,
      id: 1,
      completed: false,
    },
    {
      label: 'Active',
      time: 0,
      date: new Date(),
      pause: true,
      id: 2,
      completed: false,
    },
  ])
  const [activeTask, setActiveTask] = useState([])
  const [completedTask, setCompletedTask] = useState([])

  useEffect(() => {
    let interval = setInterval(() => {
      setTodoData((todoData) => {
        let newArr = todoData.map((item) => {
          if (!item.pause) {
            item.time = item.time + 1000
          }
          return item
        })
        return newArr
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [todoData])

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return newArray
    })
  }

  const onAddTask = (text, time) => {
    let newID = id
    const newTask = {
      label: text,
      time,
      date: new Date(),
      pause: true,
      id: newID,
      completed: false,
    }
    setID(newID + 1)
    setTodoData((todoData) => {
      const newArr = [...todoData, newTask]
      return newArr
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldTask = arr[idx]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }

    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      return toggleProperty(todoData, id, 'completed')
    })
  }

  const onEditedLabel = (editLabel, id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], label: editLabel }]
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return newData
    })
  }

  const startTimer = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: false }]
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return newData
    })
  }

  const stopTimer = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: true }]
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return newData
    })
  }

  const removeAllCompletedTasks = () => {
    setTodoData(todoData.filter((todo) => !todo.completed))
  }

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return activeTask
    } else if (filter === 'completed') {
      return completedTask
    }
  }

  const getFilterStatusFromFooter = (status) => {
    if (status === 'active') {
      const newArr = todoData.filter((item) => !item.completed)
      setActiveTask(newArr)
      setFilter(status)
    } else if (status === 'all') {
      setFilter(status)
    } else {
      const newArr = todoData.filter((item) => item.completed)
      setCompletedTask(newArr)
      setFilter(status)
    }
  }

  const completedCount = todoData.filter((item) => item.completed).length
  const todoCount = todoData.length - completedCount
  const visibleItems = filterItems(todoData, filter)

  return (
    <div className="app main">
      <h1>todos</h1>
      <NewTaskForm onAddTask={onAddTask} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteItem}
        onEditedLabel={onEditedLabel}
        onToggleCompleted={onToggleCompleted}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <Footer
        todoCount={todoCount}
        done={completedCount}
        removeAllCompletedTasks={removeAllCompletedTasks}
        getFilterStatusFromFooter={getFilterStatusFromFooter}
      />
    </div>
  )
}

export default App
