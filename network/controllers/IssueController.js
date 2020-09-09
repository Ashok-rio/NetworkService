const Issue = require('../models/Issue');
const User = require('../models/Users');

//Crete issue

exports.createIssue = (req,res) =>{
    let user = req.user
    User.findById(user.id)
    .then(user=>{
        if(user.userType == 'user'){
            let issue = new Issue({
                user:user.id,
                issueType:req.body.issueType,
                Location:req.body.Location,
                description:req.body.description,
                InquiryStatus:'Not Assigned'
            })
            .save()
            .then(docs=>{
                res.status(200).json(docs)
            }).catch(err=>{
                res.status(500).json(err)
            })
        }else{
            res.status(200).json({
                message:'You are Admin not a User!'
            })
        }
    })
    .catch(err=>{
        res.status(404).json(err)
    })
}


exports.getIssue = (req,res) =>{
    let user = req.user;
    User.findById(user.id)
    .then(user=>{
        if(user.userType == 'user'){
            Issue.find({user:user.id},[],{sort:{'_id':-1}})
            .populate('taskAssignedTo')
            .then(docs=>{
                res.status(200).json(docs)
            }).catch(err=>{
                res.status(404).json(err)
            })
        }else{
            Issue.find({},[],{sort:{'_id':-1}})
            .populate('user')
            .populate('taskAssignedTo')
            .then(docs=>{
                res.status(200).json(docs)
            }).catch(err=>{
                res.status(404).json(err)
            })
        }
    }).catch(err=>{
        res.status(500).json(err)
    })
}



exports.updateIssue = (req,res) =>{
    let user = req.user;
    let issueId = req.body.id;

    User.findById(user.id).then(user=>{
        
        if(user.userType == 'user'){

            let updateData={
                issueType:req.body.issueType,
                Location:req.body.Location,
                description:req.body.description,
                InquiryStatus:req.body.InquiryStatus
            }

            Issue.updateOne({_id:issueId},{$set:req.body})
            .then(doc=>{
                res.status(200).json(doc)
            }).catch(err=>{
                res.status(404).json(err)
            })
        }else if(user.userType == 'admin'){
            let updateData={
                InquiryStatus:req.body.InquiryStatus,
                taskAssignedTo:user.id
            }

            Issue.updateOne({_id:issueId},{$set:updateData})
            .then(doc=>{
                res.status(200).json(doc)
            }).catch(err=>{
                res.status(404).json(err)
            })
            
        }
    }).catch(err=>{
        res.status(500).json(err)
    })
}

exports.delIssue = (req,res) =>{
    let user = req.user;
    let id = req.body.id;
    User.findById(user.id)
    .then(user=>{
        if(user.userType == 'user'){
            Issue.findOne({user:user.id})
            .then(doc=>{
                if(user.id == doc.user){
                    Issue.findById(id).then(data=>{
                        if(data){
                            Issue.deleteOne({_id:id}).then(docs=>{
                                res.status(200).json({
                                    message:`Issue was Deleted`
                                })
                            }).catch(err=>{
                                res.status(404).json(err);
                            })
                        }else{
                            res.json({
                                message:'Issue Not Found'
                            })
                        }
                    })
                }else{
                    res.status(404).json({
                        message:'No Issues in Your Account'
                    })
                }
            })
        }else{
            res.status(500).json({
                message: `Unknow Issue`
            })
        }
    }).catch(err=>{
        res.status(500).json(err)
    })
}