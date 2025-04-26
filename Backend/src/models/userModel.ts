import mongoose, { model, mongo } from "mongoose";

const userSchema= new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    mobile:{type:Number,unique:true,required:true},
    password:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    isVerified:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false}
})



const User= mongoose.model("User",userSchema)

export default User