import express from "express";

import RiderController from "../controllers/riderController.ts";

const router = express.Router();

router.route("/signup").post(RiderController.signup);
router.route("/verify_otp").post(RiderController.verifyOtp)

export default router;
