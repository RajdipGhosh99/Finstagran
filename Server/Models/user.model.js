const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        trim:true,
        required:true,
        type:String
    },
    mobile:{
        trim:true,
        required:true,
        type:String 
    },
    fullname:{
        trim:true,
        required:true,
        type:String
    },
    username:{
        trim:true,
        required:true,
        type:String
    },
    password:{
        trim:true,
        required:true,
        minlength: [5, "Password size must be atleast of 5 character."],
        type:String
    },

})

const UserModel=mongoose.model('user',userSchema)
module.exports=UserModel