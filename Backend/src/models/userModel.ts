// import mongoose, { model, mongo } from "mongoose";
// import { HydratedDocument } from "mongoose";

// export interface IUser {
//   name?: String;
//   displayPicture?: String;
//   userId: string;
//   email: string;
//   mobile: number;
//   password: string;
//   isActive: boolean;
//   isAdmin: boolean;
//   registered_On: Date;
//   address?:IAddress;
//   loginHistory?:ILoginHistory[]
// }

// export interface IAddress {
//   fullAddress?: String;
//   city?: String;
//   zipcode?: String;
//   state?: String;
// }

// export interface ILoginHistory {
//   timestamp: Date;
//   location: {
//     type: "Point";
//     coordinates: number[];
//   };
// }

// export type UserDocument=HydratedDocument<IUser>

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   displayPicture: { type: String },
//   userId: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   mobile: { type: Number, unique: true, required: true },
//   password: { type: String, required: true },
//   isActive: { type: Boolean, default: true },
//   isAdmin: { type: Boolean, default: false },
//   registered_On: { type: Date, default: Date.now },
//   address: {
//     fullAddress: { type: String },
//     city: { type: String },
//     zipcode: { type: String },
//     state: { type: String },
//   },

//   loginHistory: [
//     {
//       timestamp: { type: Date },
//       location: {
//         type: { type: String, enum: ["Point"], default: "Point" },
//         coordinates: { type: [Number] },
//       },
//     },
//   ],
// });

// const User = mongoose.model<IUser>("User", userSchema);

// export default User;






import mongoose, { Schema, model, Document } from "mongoose";

export interface IAddress {
  fullAddress?: string;
  city?: string;
  zipcode?: string;
  state?: string;
}

export interface ILoginHistory {
  timestamp: Date;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

export interface IUser {
  name?: string;
  displayPicture?: string;
  userId: string;
  email: string;
  mobile: number;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  registered_On: Date;
  address?: IAddress;
  loginHistory?: ILoginHistory[];
}

export type UserDocument = Document & IUser;

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  displayPicture: { type: String },
  userId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  registered_On: { type: Date, default: Date.now },
  address: {
    fullAddress: { type: String },
    city: { type: String },
    zipcode: { type: String },
    state: { type: String },
  },
  loginHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number] },
      },
    },
  ],
});

const User = model<UserDocument>("User", userSchema);

export default User;
