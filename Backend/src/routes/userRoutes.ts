import express from "express";
import { userController } from "../controllers/userController";
import userContainer from "../config/inversifyConfig/inversifyUser";
const router = express.Router();

const controller = userContainer.get<userController>(userController);

router.route("/signup").post(controller.userSignup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.userLogin);


export default router;
