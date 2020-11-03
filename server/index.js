const express = require("express");
const app = express();
const port = process.env.port || 5500;
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { sendMessages, cancelService } = require("./controllers.js");

app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/send", sendMessages);
app.post("/cancel", cancelService);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
