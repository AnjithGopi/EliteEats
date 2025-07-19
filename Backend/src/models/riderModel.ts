import mongoose from "mongoose";


const riderSchema= new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    displayPicture:{type:String},
    idProof:{type:String},
    license:{type:String},
    vehicleType:{type:String},
    isVerified:{type:Boolean,default:false},
    mobile:{type:Number,unique:true,required:true},
    password:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    isOnline:{type:Boolean,default:true},
    address:{

        fullAddress:{type:String},
        city:{type:String},
        state:{type:String},
        zipCode:{type:String}
    }
    
})



const Rider= mongoose.model("Rider",riderSchema)

export default Rider