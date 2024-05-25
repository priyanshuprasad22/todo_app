import React, { useState, useEffect } from 'react';
import TaskListItem from './TaskListItemPage';
import {useNavigate} from 'react-router-dom'

const TaskListPage = ({ onDelete }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('api/v1/todo/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleCreateClick = () =>{
    navigate('/create');
  }
  
  const handleEdit = (taskId) =>{
    navigate(`/edit/${taskId}`);
  }



  const handleDelete = async (taskId) => {
    try{
      const response = await fetch(`/api/v1/todo/tasks/${taskId}`,{
        method:'DELETE'
      });

      if(!response.ok){
        throw new Error('Failed to delete task');
      }

      setTasks(prevTasks => prevTasks.filter(t=> t.id !== taskId));
    }catch(error){
      console.error('Error in deleting task',error);
    }

  };

  return (
    <div className="task-list-page">
      <h1 className='appheading'>To Do Application</h1>
      <div className='header'>
        <h2 className='tasklistheading'>Task List</h2>
        <button className="btn create-btn" onClick={handleCreateClick}>Create New Task</button>
      </div>
      <div className="task-list">
        { tasks.length ===0 ? (
          <p>No tasks to display</p>
        ):(tasks.map(task => (
          <TaskListItem
            key={task.id}
            task={task}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        )))}
      </div>
    </div>
  );
}

export default TaskListPage;
