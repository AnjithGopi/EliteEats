import "reflect-metadata"
import express from "express";
import connectDb from "./src/config/db.ts";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./src/routes/userRoutes.ts";
import riderRoute from "./src/routes/riderRoutes.ts";
import adminRoute from "./src/routes/adminRoutes.ts";


dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use("/user", userRoute);
app.use("/rider", riderRoute);
app.use("/admin", adminRoute);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`);
  });
});
