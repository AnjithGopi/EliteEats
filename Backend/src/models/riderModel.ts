import mongoose from "mongoose";


const riderSchema= new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    mobile:{type:Number,unique:true,required:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
    isOnline:{type:Boolean,default:true},
    
})



const Rider= mongoose.model("Rider",riderSchema)

export default Rider