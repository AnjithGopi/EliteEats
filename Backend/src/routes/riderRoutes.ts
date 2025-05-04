import express from "express";
import riderContainer from "../config/inversifyConfig/inversifyRider";
import { RiderController } from "../controllers/riderController";



const router = express.Router();

const controller=riderContainer.get<RiderController>(RiderController)

router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);

export default router;
