const DailyUpdate = require('../models/DailyUpdates');
const User = require('../models/Users');

//Create daily updates

exports.createDailyUpdate = async (req,res) =>{
    let users = req.user;
    const user = await User.findById(users.id);
    if(user.userType == 'admin'){
        try{
            let daily = await new DailyUpdate({
                admin :user.id,
                department:req.body.department,
                notification:req.body.notification
        });
        const docs = await daily.save();
        res.status(201).json({
            message:'create sucessfully',
            DailyUpdate :docs
        });
        }catch(err){
            res.status(404).json(err);
        }
    }else{
        res.status(404).json({
            message:`Hey ${user.name}! : You are not an Admin`
        })
    }
}

exports.viewNotifications = async (req,res)=>{
    let user = req.user;
    try{
        let dept = user.department;
            if(user.userType == "user"){
                const docs = await DailyUpdate.find({$or:[{department:dept},{department:'All'}]},[],{sort:{'_id':-1}})
                .populate({path:'admin',select:['name','phoneNumber']})
                res.status(200).json(docs);
            }else if(user.userType == "admin"){
                const docs = await DailyUpdate.find({},[],{sort:{'_id':-1}})
                .populate({path:'admin',select:['name','phoneNumber']})
                res.status(200).json(docs);
            }
    }catch(err){
        res.status(404).json(err);
    }

}
