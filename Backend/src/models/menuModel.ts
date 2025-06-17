

import mongoose from "mongoose";


const menuSchema=new mongoose.Schema({
    
    hotelId:{type:mongoose.Schema.ObjectId},
    name:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    isAvailable:{type:Boolean,default:true},
    images:{type:String},
  

})

const Menu=mongoose.model("Menu",menuSchema)

export default Menu