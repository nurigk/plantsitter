import React, { useState, useEffect } from "react";
import moment from 'moment'

const CurrentUser = ({currentUser, setCurrentUser, users, setUsers, setView, setIntervals, intervals}) => {


  const handleCancel = (currentUser) => {
    if(currentUser){
      let updateUser= Object.assign({}, currentUser)
      updateUser.duration=null;
      updateUser.active=false;
      for(let i = 0; i < intervals.length; i++) {
        clearInterval(intervals[i])
      }
      setIntervals([])

      users.forEach((e,i) => {
        if(e.user === updateUser.user) {
          let newUsers= users.filter(e => e.user !== updateUser.user)
          console.log(newUsers)
          newUsers.push(updateUser)
          setUsers(newUsers)
        }
      })
      setCurrentUser(updateUser)
    }
    setView('enter');
  }

  const handleSelect= (event) => {
    event.preventDefault();
    let updateUser= Object.assign({}, currentUser)
      updateUser.duration= event.target.value;
      updateUser.active=true

      users.forEach((e,i) => {
        if(e.user === updateUser.user) {
          let newUsers= users.filter(e => e.user !== updateUser.user)
          newUsers.push(updateUser)
          setUsers(newUsers)
        }
      })
      setCurrentUser(updateUser)
  }

return(

  <div>
    {currentUser.active ?
    <>
    <div>Last watered:{moment().from(currentUser.lastwatered)}</div>

    <button onClick={()=>handleCancel(currentUser)}>Cancel Service</button>
    </>
    :
    <>
    <div>You dont't have any subscriptions. Please select duration below to start!</div>

    <label htmlFor='duration'>Select Duration: </label>
    <select name="duration" onChange={handleSelect}>
    <option value='month'>Monthly</option>
    <option value='other week'>Bi-Monthly</option>
    <option value='week'>Weekly</option>
    <option value='minute'>Every Minute</option>
    </select>
    </>
}
  </div>
)
}
export default CurrentUser;