import React, { useState } from 'react';
import { addUser } from './firebase.js';

const App = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(name);
    setName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Add Name</button>
      </form>
    </div>
  );
};

export default App;
