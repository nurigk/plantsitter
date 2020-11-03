import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

const CurrentUser = ({
  currentUser,
  setCurrentUser,
  users,
  setUsers,
  setView,
}) => {
  const handleCancel = (currentUser) => {
    if (currentUser) {
      let updateUser = Object.assign({}, currentUser);
      updateUser.duration = null;
      updateUser.active = false;
      return axios
        .post("/cancel", currentUser)
        .then(() => {
          users.forEach((e, i) => {
            if (e.user === updateUser.user) {
              let newUsers = users.filter((e) => e.user !== updateUser.user);
              newUsers.push(updateUser);
              setUsers(newUsers);
            }
          });
          setCurrentUser(updateUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setView("enter");
  };

  const handleSelect = (event) => {
    event.preventDefault();
    let updateUser = Object.assign({}, currentUser);
    updateUser.duration = event.target.value;
    updateUser.active = true;

    users.forEach((e, i) => {
      if (e.user === updateUser.user) {
        let newUsers = users.filter((e) => e.user !== updateUser.user);
        newUsers.push(updateUser);
        setUsers(newUsers);
      }
    });
    setCurrentUser(updateUser);
  };

  return (
    <div className="main">
      {currentUser.active ? (
        <>
          <h1>Last watered:{moment().from(currentUser.lastwatered)}</h1>

          <button onClick={() => handleCancel(currentUser)}>
            Cancel Service
          </button>
        </>
      ) : (
        <>
          <h1>
            Take care of {currentUser.plantName}!
            <br/>
            Currently, you don't have any subscriptions.
            <br/>
            Please select duration below to
            start!
          </h1>

          <label htmlFor="duration">Select Duration: </label>
          <select name="duration" onChange={handleSelect}>
            <option value="month">Monthly</option>
            <option value="other week">Bi-Monthly</option>
            <option value="week">Weekly</option>
            <option value="minute">Every Minute</option>
          </select>
        </>
      )}
    </div>
  );
};
export default CurrentUser;
