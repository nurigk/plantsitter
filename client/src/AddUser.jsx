import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      phoneNumber: "",
      plantName: "",
      duration: "month",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAddUser = this.handleSubmitAddUser.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sendMessages = this.sendMessages.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmitAddUser(event) {
    const {
      setUsers,
      users,
      setCurrentUser,
      setView,
      currentUser,
    } = this.props;
    event.preventDefault();
    let time = Date.now()
    let phoneN = "+1" + this.state.phoneNumber;
    let newUser = {
      user: this.state.user,
      phoneNumber: phoneN,
      plantName: this.state.plantName,
      duration: this.state.duration,
      active: true,
      lastWatered: moment(time).format(),
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    this.sendMessages(newUser);
    setView("currentUser");
  }
  sendMessages(currentUser) {
    return axios
      .post("/send", currentUser)
      .then(() => {
        console.log('Success!')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      duration: event.target.value,
    });
  }

  render() {
    return (
      <div className="main-adduser">
        <form onSubmit={this.handleSubmitAddUser}>
          <label htmlFor="user">Your Name: </label>
          <input
            type="text"
            name="user"
            id="user"
            value={this.state.user}
            onChange={this.handleChange}
          ></input>
          <br />
          <br />
          <label htmlFor="phoneNumber">Your Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
          ></input>
          <br />
          <br />
          <label htmlFor="plantName">Your Plant's Name: </label>
          <input
            type="text"
            name="plantName"
            id="plantName"
            value={this.state.plantName}
            onChange={this.handleChange}
          ></input>
          <br />
          <br />
          <label htmlFor="duration">Select Duration: </label>
          <select name="duration" onChange={this.handleSelect}>
            <option value="month">Monthly</option>
            <option value="other-week">Bi-Monthly</option>
            <option value="week">Weekly</option>
            <option value="minute">Every Minute</option>
          </select>
          <input type="submit"></input>
          <br/> <br/>
          <div>*By submitting, you are agreeing to receive text messages!</div>
        </form>
      </div>
    );
  }
}

export default AddUser;
