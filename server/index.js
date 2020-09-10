const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const env = require('dotenv').config();
const {sendMessage} = require('./twilio.js')

app.use('/', express.static(path.join(__dirname, "../client/dist")));
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/send", (req, res) => {
  const {user, phone_number, plantName, confirmed, duration} = req.body;
  return sendMessage(user, phone_number, plantName, confirmed, duration)
  .then(()=>{
    res.sendStatus(201)
  })
  .catch((err)=> {
    console.log(err)
  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
