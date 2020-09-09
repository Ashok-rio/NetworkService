const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

const secret = process.env.SECRET || 'secret';

//Register userController

exports.register = (req,res)=>{

    const errors = validationResult(req);//!This is express validator
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    User.findOne({phoneNumber:req.body.phoneNumber}).exec()//?Check phoneNumber 
    .then(user=>{
        if(user){
            res.json({
                message:`phone number is already used`
            })
        }
        else{
            User.findOne({ email: req.body.email }).exec()//?Check Email
                .then(user => {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (!user) {
                            if (req.body.userType == 'admin') {
                                if (req.body.position == null) {
                                    res.json({
                                        message: 'please set position'
                                    })
                                }
                                else {
                                    const users = new User({               //?Admin create
                                        name: req.body.name,
                                        email: req.body.email,
                                        phoneNumber: req.body.phoneNumber,
                                        position: req.body.position,
                                        password: hash,
                                        userType: req.body.userType
                                    }).save()
                                        .then(docs => {
                                            res.json(docs)
                                        })
                                        .catch(err => {
                                            res.json(err)
                                        })
                                }
                            }
                            else {
                                if (req.body.department == null) {
                                    res.json({
                                        message: 'please set department'
                                    })
                                } else {
                                    const users = new User({                //?User create
                                        name: req.body.name,
                                        email: req.body.email,
                                        department: req.body.department,
                                        phoneNumber: req.body.phoneNumber,
                                        password: hash,
                                        userType: req.body.userType
                                    }).save()
                                        .then(docs => {
                                            res.json(docs)
                                        })
                                        .catch(err => {
                                            res.json(err)
                                        })
                                }
                            }
                        } else {
                            res.json({
                                message: `Email Id  is already used`
                            })
                        }
                    })
                })
                .catch(err => {
                    res.json(err)
                })
        }
    })
}

//login userController

exports.login = (req, res) => {
    
    const emailId = req.body.email;
    const phone = req.body.phoneNumber;
    const password = req.body.password;
    // console.log("email :",emailId);
    // console.log("phone :",phone);
    // console.log("password :",password);
    User.findOne({$or:[{phoneNumber:phone},{email:emailId}]})         //!find both email and phoneNumber
        .then(user => {
            if (!user) {
                 res.json({
                     message:'Invalid Username'
                 });
            }
            bcrypt.compare(password, user.password)                 //?Compare password
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            position: user.position,
                            department: user.department,
                            phoneNumber: user.phoneNumber,
                            userType: user.userType
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (err) res.status(500)
                                    .json({
                                        error: "Error signing token",
                                        raw: err
                                    });
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            });
                    } else {
                        res.json({
                            message: 'Incorrect Password'
                        });
                    }
                });
        });
};

//GetAll userController

exports.get_user = (req,res,err) => {
    User.find({},(err,user)=>{
      if(err){
          res.status(500).json({
              message:'auth failed'
          })
      }
      else{
          res.json(user)
      }
  });
    };
   
    /**
     * !passport middleware to req user on used controllers
     * ?user is just payload on your token = let user = req.user
     **/

//getOne userController 

exports.get_users = async (req,res) =>{                        
    let user = req.user;
    User.findOne({_id:user.id})
    .then(docs=>{
        res.json(docs)
    }).catch(err=>{
        res.json(err)
    })
}

//Delete userController

exports.deleteUser = (req,res)=>{
    let user = req.user;
    User.findByIdAndDelete(user.id)
    .then(docs=>{
        res.status(200).json({
            message:[`${user.email} Account`,'Delete sucessfully']
        })
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}

//Update user

exports.updateUser = async (req,res) =>{
    let user = req.user;
    if(user.position){
        if(user.userType == 'admin'){
            if(req.body.name && !req.body.position){
                const docs = await  User.updateOne({_id:user.id},{$set:{name:req.body.name}})
                res.json(docs)
            }
            else if(!req.body.name && req.body.position){
                    if(req.body.position){
                        const docs = await  User.updateOne({_id:user.id},{$set:{position:req.body.position}})
                        res.json(docs)
                    }
                }
                    else{
                        if(req.body.position && req.body.name && !user.department ){
                            let RbPosition = req.body.position
                            let position = ['Network Engineer','Network Maintenance','System Maintenance'];
                            if(RbPosition == position[0] || RbPosition == position[1] || RbPosition == position[2]){
                                let admin ={
                                    position:req.body.position,
                                    name:req.body.name
                                }
                                User.updateOne({_id:user.id},{$set:admin})
                                    .then(docs=>{
                                        res.status(200).json({
                                            message:'update sucessfully',
                                            UpdateUserData:docs
                                        })
                                    }).catch(err=>{
                                        res.status(500).json({
                                            Error:err
                                        })
                                    })
                            }
                            else{
                                res.status(500).json({
                                    Error:'You choose only This options', 
                                    Choose:`(${position[0]}),(${position[1]}),(${position[2]})`
                                })
                            }
                        }
                        else{
                            res.json({
                                message:`Please Enter Name & Position` , Account : `${user.email}`
                            })
                        }
                    }
    
        }
        else{
            res.json({
                message:'you are not an admin'
            })  
        }
    }else if(user.department){
        if(user.userType == 'user'){
            if(req.body.name && !req.body.department){
                const docs = await  User.updateOne({_id:user.id},{$set:{name:req.body.name}})
                res.json(docs)
            }
            else if(!req.body.name && req.body.department){
                    if(req.body.department){
                        const docs = await  User.updateOne({_id:user.id},{$set:{department:req.body.department}})
                        res.json(docs)
                    }
            }
            else{
                if(req.body.department && req.body.name && !user.position ){
                    let RbDepartment = req.body.department
                    let department = ['Bca','Bsc-it','Bsc-cs','Mca','Msc-it','Msc-cs'];
                        if(RbDepartment == department[0] || RbDepartment == department[1] || RbDepartment == department[2]
                            ||RbDepartment == department[3]||RbDepartment == department[4]||RbDepartment == department[5]){
                            let UserData ={
                                department: req.body.department,
                                name:req.body.name
                            }
                            User.updateOne({_id:user.id},{$set:UserData})
                                .then(docs=>{
                                    res.status(200).json({
                                        message:'update sucessfully',
                                        UpdateUserData:docs
                                    })
                                }).catch(err=>{
                                    res.status(500).json({
                                        Error:err
                                    })
                                })
                        }
                        else{
                            res.status(500).json({
                                Error:'You choose only This options',
                                Choose:`(${department[0]}),(${department[1]}),(${department[2]}),(${department[3]}),(${department[4]}),(${department[5]})`
                            })
                        }
                }
                else{
                    res.json({
                        message:`Please Enter Name & Department ` , Account : `${user.email}`
                    })
                }
            }
    
        }
        else{
            res.json({
                message:'you are not an user'
            })  
        }
    }
    else{
        res.status(500).json({
            message:'Token Invalid'
        })
    }
}