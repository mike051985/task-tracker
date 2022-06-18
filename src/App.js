import React, { useState, useRef, useEffect } from "react";
import TaskList from "./TaskList";
import "./styles.css"


const LOCAL_STORAGE_KEY = "taskApp.tasks"

function App() {
  const [tasks, setTasks] = useState([])
  const taskNameRef = useRef()

  useEffect(() => {
    const storeTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storeTasks) setTasks(storeTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function toggleTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
  }

  function handleAddTask(e) {
    const name = taskNameRef.current.value
    if (name === "") return
    setTasks(prevTasks => {
      return [...prevTasks, { id: Math.random(10000), name: name, complete: false}]
    })
    taskNameRef.current.value = null
  }

  function handleClearTask() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  return (
    <div className="container">
      <h1 className="title">Task Tracker</h1>
      <TaskList tasks={tasks} toggleTask={toggleTask} />
      <input className="input" ref={taskNameRef} type="text"/>
      <button className="btn" onClick={handleAddTask}>Add Task</button>
      <button className="btn" onClick={handleClearTask}>Clear Task</button>
      <h3 className="task">{tasks.filter(task => !task.complete).length} left to do</h3>
    </div>
  )
}

export default App;
