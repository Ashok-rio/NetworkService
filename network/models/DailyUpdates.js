const mongoose = require('mongoose');

const DailyUpdate = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    department:{
        type:String,
        enum:['All','Bca','Bsc-it','Bsc-cs','Mca','Msc-it','Msc-cs']
    },
    notification:{
        type:String,
        required:true
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
});

DailyUpdate.path('department').options.enum;

module.exports = mongoose.model('dailyUpdate',DailyUpdate)