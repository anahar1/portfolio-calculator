import React, { useState } from 'react';
import { addUser, addTask } from './firebase.js';
import { Routes, Route, useNavigate } from "react-router-dom";
import Tasks from './Tasks.js';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    addUser(name);
    setName('');
    navigate('/tasks');
  };

  function handleAddTaskSubmit(e) {
    e.preventDefault();
    addTask({
      date: date,
      title: title,
      description: description,
      status: status
    });
    setDate(new Date().toISOString());
    setTitle('');
    setDescription('');
    setStatus('');
  };

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={
          <form onSubmit={handleLoginSubmit}>
            <h1>Task Tracker</h1>
            <div className="form-control">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit" className="btn">Log In</button>
          </form>
        } />
        <Route path='/tasks' element={
          <>
            <Tasks />
            <form onSubmit={handleAddTaskSubmit}>
              <h2>Add New Task</h2>
              <div className="form-control">
                <label htmlFor="date">Date:</label>
                <input type="datetime-local" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-control">
                <label htmlFor="task-name">Name:</label>
                <input type="text" id="task-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="form-control">
                <label htmlFor="status">Status:</label>
                <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>
              <button type="submit" className="btn">Add Task</button>
            </form>
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
