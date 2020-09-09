const mongoose =  require('mongoose');

const IssueSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'users'
    },
    issueType:{
        type:String,
        enum:['No Internet','Slow Internet','System Maintenance']
    },
    Location:{
        type:String,
        enum:['Lab-1','Lab-2','Lab-3']
    },
    description:{
        type:String
    },
    InquiryStatus:{
        type:String,
        enum:['Not Assigned','Inprogress','Closed','Completed']
    },
    taskAssignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'users'
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('issue',IssueSchema);