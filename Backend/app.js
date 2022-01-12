const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
const cors = require("cors");
const db = require("./app/models");
require('dotenv').config();


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
db.sequelize.sync();
require("./app/routes/messageRoute")(app);
require("./app/routes/userRoute")(app);

module.exports = app;