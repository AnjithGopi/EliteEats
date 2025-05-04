import express from "express";
import { userController } from "../controllers/userController";
import container from "../config/inversifyConfig";
const router = express.Router();

const controller = container.get<userController>(userController);

router.route("/signup").post(controller.userSignup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.userLogin);


export default router;
