import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";
import { RiderController } from "../controllers/riderController";



const router = express.Router();

const controller=container.get<RiderController>(RiderController)

router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);

export default router;
