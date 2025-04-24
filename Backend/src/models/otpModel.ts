
import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({

    email:{type:String,required:true},
    otp:{type:String,required:true},
    expiry:{type:Date,default:Date.now(),expires:120}
})


const Otp= mongoose.model("Otp",otpSchema)