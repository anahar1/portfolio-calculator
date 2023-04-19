import React, { useState } from 'react';
import { addUser } from './firebase.js';
import { Routes, Route, useNavigate } from "react-router-dom";
import Tasks from './Tasks.js';

const App = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    
    addUser(name);
    setName('');
    navigate('/tasks');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Add Name</button>
        <Routes>
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
      </form>
    </div>
  );
};

export default App;