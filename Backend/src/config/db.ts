import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ELITE_EATS");
    console.log("Database connection succesfull");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
