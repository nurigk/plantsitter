import React, { useState, useEffect } from "react";
import enter from "../dist/lib/enter.jpeg";
import growme from "../dist/lib/grow_me.gif";
import axios from 'axios';
import AddUser from './AddUser.jsx'
import CurrentUser from "./CurrentUser.jsx"

const App = () => {
  const [view, setView] = useState("enter");
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([])
  const [value, setValue] = useState('');
  const [intervals, setIntervals] = useState(null)

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(users.length) {
      users.forEach(e => {
        if (e.user === value) {
          setCurrentUser(e)
          setView('currentUser')
        } else {
          setView('addUser')
        }
      })
    } else {
      setView('addUser')
    }
  }


  const updateView = () => {
    console.log(view)
    if (view === "enter") {
      return (
        <div>
        <div id="title">Plantsitter</div>
        <img src={enter} alt="drawings of plants"></img>
        <form onSubmit={handleSubmit}>
        <label htmlFor='user'>Your Name: </label>
        <input type='text' name='user' id='user'value={value} onChange={handleChange}></input>
        <input type='submit'></input>
        </form>
      </div>
      );
    } else if (view === "currentUser"){
      return (
         <CurrentUser setUsers={setUsers} users={users} setCurrentUser={setCurrentUser} setView={setView} currentUser={currentUser} intervals={intervals} setIntervals={setIntervals}/>
      );
    } else if (view === "addUser"){
      return (
          <AddUser setUsers={setUsers} users={users} setCurrentUser={setCurrentUser} setView={setView}currentUser={currentUser}intervals={intervals} setIntervals={setIntervals}/>
      );
    }
  };

  return (
    <div>
    {updateView()}
  </div>
  );
};

export default App;