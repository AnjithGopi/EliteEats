import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";
import { VendorController } from "../controllers/vendorController";


const router = express.Router();

const controller =container.get<VendorController>(VendorController)

router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);
router.route("/create_category").post(controller.createCategory)
router.route("/add_items").post(controller.createMenu)
router.route("/categories/:id").get(controller.getCategories)
router.route("/menu/:id").get(controller.getMenu)
router.route("/logout").get(controller.logout)





export default router