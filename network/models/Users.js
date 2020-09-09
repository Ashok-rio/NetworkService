const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        minLength: [5, 'Name is too short!'],
        maxLength: 15
    },
    email:{
        type:String,
        required:true,
        lowercase: true
    },
    department:{
        type:String,
        enum:['Bca','Bsc-it','Bsc-cs','Mca','Msc-it','Msc-cs']
    },
    phoneNumber:{
        type:Number,
        required: [true, 'What is your contact number?']
    },
    position:{
        type:String,
        enum:['Network Engineer','Network Maintenance','System Maintenance']
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    userType:{
        type:String,
        required:true
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
});

Users.path('department').options.enum;
Users.path('position').options.enum;

module.exports = mongoose.model('users',Users)