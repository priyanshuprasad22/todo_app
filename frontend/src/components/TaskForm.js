import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const TaskFormPage = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    dueDate: ''
  });

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    
    if(id) {
      fetch(`/api/v1/todo/tasks/${id}`)
      .then(response => response.json())
      .then(data=> setTask (data))
      .catch(error => console.error('Error fetching task:',error));
    }

  },[id]);


  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

 

  const handleSubmit = async e => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id 
    ? `/api/v1/todo/tasks/${id}`
    : '/api/v1/todo/tasks';

    try{
      const response = await fetch(url,{
        method,
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(task)
      });

      if(!response.ok){
        throw new Error( `Failed to ${id ? 'update' : 'create'}`);
      }
      navigate('/');

    }catch(error){
      console.error('Error submitting task:',error);
    }
  };

  return (
    <div className="task-form-page">
      <h2>{id ? 'Edit Task':'Create Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>
        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Due Date:</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
        <button type="submit" className="btn submit-btn">{id ? 'Update Task':'Create Task'}</button>
        <button type="button" className="btn cancel-btn" onClick={()=> navigate('/')}>Cancel</button>

      </form>
    </div>
  );
}

export default TaskFormPage;
