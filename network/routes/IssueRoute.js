const express = require('express');
const route = express.Router();
const IssueConroller = require('../controllers/IssueController');

const passport = require('passport')
require('../middleware/Passport')(passport)

route.post('/createIssue',passport.authenticate('jwt',{session:false}),IssueConroller.createIssue);

route.get('/getIssue',passport.authenticate('jwt',{session:false}),IssueConroller.getIssue);

route.put('/updateIssue',passport.authenticate('jwt',{session:false}),IssueConroller.updateIssue);

route.delete('/delIssue',passport.authenticate('jwt',{session:false}),IssueConroller.delIssue);

module.exports = route;