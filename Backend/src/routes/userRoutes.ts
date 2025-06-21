import express from "express";
import { userController } from "../controllers/userController";
import container from "../config/inversifyConfig/inversifyConfig";
import verify from "../middlewares/authVerfication";
const router = express.Router();

const controller = container.get<userController>(userController);

router.route("/signup").post(controller.userSignup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.userLogin);
router.route("/forgot_password").post(controller.forgotPassword);
router.route("/reset-password/:token").post(controller.resetPassword);
router.route("/restaurents").get(controller.getAllhotels);
router.route("/profile/:id").get(verify,controller.getProfile);
router.route("/addto_cart").post(controller.addtoCart);



export default router;
