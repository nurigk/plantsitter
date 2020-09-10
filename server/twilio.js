const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER} = require('../config.js')
console.log(TWILIO_ACCOUNT_SID)
const client = require('twilio')(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
);


module.exports={
  sendMessage: (user, phone_number, plantName, confirmed, duration) => {
    let textBody= `Hi ${user}! Welcome to Plantsitter! We'll be reminding you to water ${plantName} every ${duration}!`
    user= user || 'there'
    phone_number= phone_number || MY_PHONE_NUMBER
    plantName= plantName || 'plants'
    if(confirmed) {
      textBody= `Hi ${user}! Time to water your ${plantName}!`
    }
     return client.messages
      .create({
        to: phone_number,
        from: TWILIO_PHONE_NUMBER,
        body: textBody,
      })
      .then(message => console.log(message.sid));
  }
}