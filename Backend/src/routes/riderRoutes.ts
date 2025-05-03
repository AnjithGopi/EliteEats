import express from "express";

import RiderController from "../controllers/riderController";

const router = express.Router();

router.route("/signup").post(RiderController.signup);
router.route("/verify_otp").post(RiderController.verifyOtp);
router.route("/login").post(RiderController.login);

export default router;
