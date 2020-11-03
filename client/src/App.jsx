import React, { useState, useEffect } from "react";
import enter from "../dist/lib/enter.jpeg";
import axios from "axios";
import AddUser from "./AddUser.jsx";
import CurrentUser from "./CurrentUser.jsx";

const App = () => {
  const [view, setView] = useState("enter");
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.length) {
      users.forEach((e) => {
        if (e.user === value) {
          setCurrentUser(e);
          setView("currentUser");
        } else {
          setView("addUser");
        }
      });
    } else {
      setView("addUser");
    }
  };

  const updateView = () => {
    if (view === "enter") {
      return (

          <div className="main">
            <img src={enter} alt="drawings of plants"></img>
            <form onSubmit={handleSubmit}>
              <label htmlFor="user">Your Name: </label>
              <input
                type="text"
                name="user"
                id="user"
                value={value}
                onChange={handleChange}
              ></input>
              <input type="submit"></input>
            </form>
          </div>

      );
    } else if (view === "currentUser") {
      return (
        <CurrentUser
          setUsers={setUsers}
          users={users}
          setCurrentUser={setCurrentUser}
          setView={setView}
          currentUser={currentUser}
        />
      );
    } else if (view === "addUser") {
      return (
        <AddUser
          setUsers={setUsers}
          users={users}
          setCurrentUser={setCurrentUser}
          setView={setView}
          currentUser={currentUser}
        />
      );
    }
  };

  return <div className="container">
     <div className="title">PLANTSITTER</div>
    {updateView()}
    </div>;
};

export default App;
