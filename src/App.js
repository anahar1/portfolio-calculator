import React, { useState } from 'react';
import { addUser } from './firebase.js';
import { Routes, Route, Navigate } from "react-router-dom";
import Tasks from './Tasks.js';

const App = () => {
  const [name, setName] = useState('');
  const [navigation, setNavigation] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    
    addUser(name).then(() => {
      setName('');
      setNavigation(true);
    }).catch((error) => {
      console.log('Error adding name to Firestore', error);
    });
  };

  return (
    <>
      {navigation ? (
        <Navigate to="/tasks" />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button type="submit">Add Name</button>
        </form>
      )}
    </>
  );
};

export default App;