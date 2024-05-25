import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListPage from './components/TaskList';
import TaskFormPage from './components/TaskForm';
import './App.css';
import './style.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<TaskListPage />} />
          <Route path="/create" element={<TaskFormPage />} />
          <Route path="/edit/:id" element={<TaskFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
