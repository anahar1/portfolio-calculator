import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { addTask, addUser, getTasks, deleteTask } from "./firebase";

import "./Tasks.css";

const Tasks = ({ name }) => {
  const [tasks, setTasks] = useState([]);
  const [currentName, setCurrentName] = useState(name);
  const [sortBy, setSortBy] = useState("title"); // Default sort by title
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction is ascending

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTasks(name);
      setTasks(tasks);
    };

    fetchData();
  }, [name]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const date = formData.get("due-date");
    const title = formData.get("task");
    const description = formData.get("description");
    const status = formData.get("status");
    const newTasks = await addTask({ name, date, title, description, status });
    setTasks(newTasks);
    console.log("taskssss: ", tasks);
    form.reset();
  };

  const handleDelete = async (taskId) => {
    // Code to delete tasks
    // await deleteTask(currentName, taskId);
    // const tasks = await getTasks(name);
    // setTasks(tasks);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      // If the user clicks on the same field, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If the user clicks on a different field, set the new sort field and reset the sort direction
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortTasks = (tasks) => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (sortBy === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === "status") {
        return sortDirection === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (sortBy === "due-date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
    return sortedTasks;
  };

  return (
    <div>
      <div
        className="navBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h1 style={{ fontWeight: "bold" }}>My Tasks</h1>
        <h3>
          Logged in as{" "}
          <span style={{ fontWeight: "bold", color: "white" }}>
            {currentName}
          </span>
        </h3>
      </div>

      <form className="tasksForm" onSubmit={handleSubmit}>
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("title")}>
                  Task Title{" "}
                  {sortBy === "title" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    />
                  )}
                </th>
                <th>Description</th>
                <th onClick={() => handleSort("status")}>
                  Status{" "}
                  {sortBy === "status" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    />
                  )}
                </th>
                <th onClick={() => handleSort("due-date")}>
                  Due Date{" "}
                  {sortBy === "due-date" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    />
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" name="task" />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </td>
                <td>
                  <select name="status">
                    <option value="TO DO">TO DO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </td>
                <td>
                  <input type="date" name="due-date" />
                </td>
                <td>
                  <button type="submit">Add Task</button>
                </td>
              </tr>
              {sortTasks(tasks).map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.date}</td>
                  <td>
                    <button type="button" className="edit-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(task.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sortButtons">
          <button
            type="button"
            className={`sortButton ${sortBy === "title" ? "active" : ""}`}
            onClick={() => {
              setSortBy("title");
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            }}
          >
            Sort by Title{" "}
            {sortBy === "title" && (
              <FontAwesomeIcon
                icon={sortDirection === "asc" ? faSortUp : faSortDown}
              />
            )}
          </button>
          <button
            type="button"
            className={`sortButton ${sortBy === "status" ? "active" : ""}`}
            onClick={() => {
              setSortBy("status");
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            }}
          >
            Sort by Status{" "}
            {sortBy === "status" && (
              <FontAwesomeIcon
                icon={sortDirection === "asc" ? faSortUp : faSortDown}
              />
            )}
          </button>
          <button
            type="button"
            className={`sortButton ${sortBy === "due-date" ? "active" : ""}`}
            onClick={() => {
              setSortBy("due-date");
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            }}
          >
            Sort by Due Date{" "}
            {sortBy === "due-date" && (
              <FontAwesomeIcon
                icon={sortDirection === "asc" ? faSortUp : faSortDown}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tasks;
