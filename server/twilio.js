// const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER} = require('../config.js')
const env = require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


module.exports={
  sendMessage: (user, phoneNumber, plantName, confirmed, duration) => {
    let textBody= `Hi ${user}! Welcome to Plantsitter! We'll be reminding you to water ${plantName} every ${duration}!`
    user= user || 'there'
    plantName= plantName || 'plants'
    if(confirmed) {
      textBody= `Hi ${user}! Time to water your ${plantName}!`
    }
     return client.messages
      .create({
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: textBody,
      })
      .then(message => console.log(message.sid));
  }
}