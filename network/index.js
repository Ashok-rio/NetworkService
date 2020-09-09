const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport =  require('passport');
const port = process.env.PORT || 9090; //!port 

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI = "mongodb://localhost:27017/networkService";//?mondoDB connection string

//mongoose connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => {
        console.log(err)
    });
    
require('./middleware/Passport');
const UserRoute = require('./routes/UserRoute'); //?require UserRoute
const IssueRoute = require('./routes/IssueRoute');//?require Issue
const DailyUpdateRoute = require('./routes/DailyUpdateRoute');//?require Daily Updates

app.use('/user',UserRoute);
app.use('/issue',IssueRoute);
app.use('/dailyUpdate',DailyUpdateRoute);

app.listen(port, function () {                              //?Server port
    console.log(`Server is running on port:${port}`);
});
