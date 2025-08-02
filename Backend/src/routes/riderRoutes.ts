import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";
import { RiderController } from "../controllers/riderController";



const router = express.Router();

const controller=container.get<RiderController>(RiderController)

router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);
router.route("/verify_profile").post(controller.verifyProfile)
router.route("/logout").get(controller.logout)

export default router;
