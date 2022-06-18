import React from 'react'

export default function Task({ task, toggleTask }) {
    function handleTaskClick() {
        toggleTask(task.id)
    }

    const completedStyle = {
      fontStyle: "italic",
      color: "#a7a7a7",
      textDecoration: "line-through"
    }
    
  return (
    <div className='checkbox'>
        <label>
            <input type="checkbox" checked={task.complete} onChange={handleTaskClick} />
            <p style={task.complete ? completedStyle: null}>
            {task.name}
            </p>
        </label>
    </div>
  )
}
