const express = require('express');
const route = express.Router();
const DailyUpdatesController = require('../controllers/DailyUpdatesController');

const passport = require('passport')
require('../middleware/Passport')(passport)

route.post('/createDailyUpdate',passport.authenticate('jwt',{session:false}),DailyUpdatesController.createDailyUpdate);
route.get('/viewNotification',passport.authenticate('jwt',{session:false}),DailyUpdatesController.viewNotifications);

module.exports = route;