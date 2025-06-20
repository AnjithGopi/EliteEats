import "reflect-metadata";
import express from "express";
import connectDb from "./src/config/db";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./src/routes/userRoutes";
import riderRoute from "./src/routes/riderRoutes";
import adminRoute from "./src/routes/adminRoutes";
import vendorRoute from "./src/routes/resturantRoutes";
import { connectRedis } from "./src/config/redis";
import cookieParser from "cookie-parser";
import {Api }from "./src/config/constants/api";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/rider", riderRoute);
app.use("/admin", adminRoute);
app.use("/restaurent", vendorRoute);

Promise.all([connectDb(), connectRedis()])
  .then(() =>
    app.listen(port, () => {
      console.log(`server running in ${Api}`);
    })
  )
  .catch((error) => {
    console.log("Error starting server:", error);
  });
