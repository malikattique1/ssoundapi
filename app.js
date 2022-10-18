
require("dotenv").config();
const express = require("express");
const app = express();


const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// var multer = require('multer');
// var upload = multer();
// app.use(upload.array()); 
// app.use(express.static('public'));
// app.use(express.static('upload/sounds'));
// app.use(express.static('sounds'));

const path = require('path');
app.use('/upload', express.static(path.join(__dirname, 'upload')))


const userRouter = require("./api/sounds/sounds.router");
const userRouter6 = require("./api/mixtures/mixtures.router");
const userRouter8 = require("./api/users/users.router");


const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});






// app.use('/tray_icon', express.static('upload/mixtures/clipArts'));

app.use("/api/sounds", userRouter);

app.use("/api/mixtures", userRouter6);

app.use("/api/user", userRouter8);


// app.listen();

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
