const mongoose  = require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        require:true,
        min:8,
    },
    IsAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    AvatarImage:{
        type:String,
        default:"",
    },
});


module.exports=mongoose.model("Users",userSchema)
