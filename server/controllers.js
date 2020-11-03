const { scheduler } = require("./scheduler.js");
const cron = require("node-cron");
const { sendMessage, firstMessage } = require("./twilio");

const schedules = {};

module.exports = {
  sendMessages: (req, res) => {
    const { user, phoneNumber, plantName, duration } = req.body;
    const scheduled = scheduler(duration);
    schedules[phoneNumber] = cron.schedule(scheduled, () => {
      return sendMessage(user, phoneNumber, plantName, duration)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.sendStatus(500);
          console.log(err);
        });
    });
    return firstMessage(user, phoneNumber, plantName, duration)
    .then(() => {
      setTimeout(()=>schedules[phoneNumber].start(),6000)
    })
    .catch((err)=>{
      res.sendStatus(500);
      console.log(err)
    })
  },
  cancelService: (req, res) => {
    let pn = req.body.phoneNumber
    return Promise.resolve(schedules[pn].stop())
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err)=>{
      res.sendStatus(500);
      console.log(err)
    })
  },
};
