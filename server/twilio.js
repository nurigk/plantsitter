// const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER} = require('../config.js')
const ck = require('ckey');
// const env = require('dotenv').config();

const client = require('twilio')(
  ck.TWILIO_ACCOUNT_SID,
  ck.TWILIO_AUTH_TOKEN
);



module.exports={
   sendMessage: (user, phoneNumber, plantName, confirmed, duration) => {
    let textBody= `Hi ${user}! Welcome to Plantsitter! We'll be reminding you to water ${plantName} every ${duration}. Don't forget to water today!`
    user= user || 'there'
    plantName= plantName || 'plants'
    if(confirmed) {
      textBody= `Hi ${user}! Time to water your ${plantName}!`
    }
     return client.messages
      .create({
        to: phoneNumber,
        from: ck.TWILIO_PHONE_NUMBER,
        body: textBody,
      })
      .then(message => console.log(message.sid))
      .catch(err => console.log(err))
  }
}