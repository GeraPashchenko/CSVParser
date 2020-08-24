const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const {connect} = require('./services/mongooseConnection/connect');

require('dotenv').config(); // for reading env file
require('./routs/routs').app(app);

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.listen(process.env.SERVER_PORT, (err)=>{
    if(err) throw err;

    connect(mongoose, process); // connect to MongoDB by Mongoose
    console.log(`========== STARTED ON PORT ${process.env.SERVER_PORT} ==========`);
});
