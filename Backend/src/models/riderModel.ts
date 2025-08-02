import mongoose from "mongoose";


const riderSchema= new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    displayPicture:{type:String},
    idProof:{type:String},
    license:{type:String},
    vehicleType:{type:String},
    isVerified:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
    rejectionReason:{type:String,default:"Rejection pending"},
    mobile:{type:Number,unique:true,required:true},
    password:{type:String,required:true},
    isActive:{type:Boolean,default:false},
    isOnline:{type:Boolean,default:true},
    registered_On: { type: Date, default: Date.now },
    address:{

        fullAddress:{type:String},
        city:{type:String},
        state:{type:String},
        zipCode:{type:String}
    },

    loginHistory: [
    {
      timestamp: { type: Date },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number] },
      },
    },
  ],
    
})



const Rider= mongoose.model("Rider",riderSchema)

export default Rider