const User = require("../models/usermodel")
const bcrypt= require("bcrypt")

module.exports.register = async (req,res,next)=>{

    try{
        const{email,username,password}=req.body;
        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.json({msg:"Username already Exist",status:false})
        }
        const emailCheck= await User.findOne({email})
        if(emailCheck){
            return res.json({msg:"Email already Exist",status:false})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user= await User.create({
            email,
            username,
            password:hashedpassword,
        });
        delete user.password;
        return res.json({status:true,user})
    }catch(ex){
        next(ex);
    }
}







module.exports.login = async (req,res,next)=>{

    try{
        const{username,password}=req.body;
        const user1 = await User.findOne({username})
        if(!user1){
            return res.json({msg:"Incorrect Username or Password",status:false})
        }
        const ispasswordvalid=bcrypt.compare(password,user1.password)
        if(!ispasswordvalid){
            return res.json({msg:"Incorrect Username or Password",status:false})
        }
        delete user1.password;
        return res.json({status:true,user1})
    }catch(ex){
        next(ex);
    }
}

module.exports.avatar= async(req,res,next)=>{
    try{
        const userid= req.params.id;
        const AvatarImage= req.body.image;
        const userData = await User.findByIdAndUpdate(userid,{
            IsAvatarImageSet:true,
            AvatarImage,
        })
        return res.json({
            isSet:userData.IsAvatarImageSet,
            image: userData.AvatarImage,
        })
    }
    catch(ex){
        next(ex);
    }
}


module.exports.alluser= async(req,res,next)=>{
    try{
        const users= await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "AvatarImage",
            "_id"
        ])
        return res.json(users)

    }
    catch(ex){
        next(ex);

    }
}