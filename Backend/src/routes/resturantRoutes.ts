import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";
import { VendorController } from "../controllers/vendorController";


const router = express.Router();

const controller =container.get<VendorController>(VendorController)

router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);
router.route("/add_items").post(controller.createMenu)



export default router