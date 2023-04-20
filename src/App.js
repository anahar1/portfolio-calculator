import React, { useState } from "react";
import { addUser } from "./firebase.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Tasks from "./Tasks.js";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    addUser(name);
    navigate("/tasks");
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <form className="loginForm" onSubmit={handleLoginSubmit}>
              <h1>Task Tracker</h1>
              <div className="form-control">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">
                Log In
              </button>
            </form>
          }
        />
        <Route
          path="/tasks"
          element={
            <>
              <Tasks name={name} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
