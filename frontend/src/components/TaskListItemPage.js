import React,{useState} from 'react';

const TaskListItem = ({ task, onEdit, onDelete, onViewDetails }) => {
  
  const [showDetails, setShowDetails] =useState(false);

  const toggleDetails = () =>{
    setShowDetails(!showDetails)
  }
  
  
  
  return (
    <div className="task-list-item">
      <div>
        <h3>{task.title}</h3>
        <p>Status: {task.status}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>
      <div className="actions">
        <button className="btn edit-btn" onClick={onEdit}>Edit</button>
        <button className="btn delete-btn" onClick={onDelete}>Delete</button>
        <button className="btn view-btn"onClick={toggleDetails}>View Details</button>
      </div>
      {showDetails && (
          <div className='popup'>
            <div className='popup-content'>
              <span className='close' onClick={toggleDetails}>&times;</span>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date:{task.dueDate}</p>
            </div>
          </div>
        )
      
      }
    </div>
  );
}

export default TaskListItem;
