import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";
import { VendorController } from "../controllers/vendorController";
import verify from "../middlewares/authVerfication";
import { verifyVendor } from "../middlewares/verifyVendor";
import { Verify } from "crypto";


const router = express.Router();

const controller =container.get<VendorController>(VendorController)


router.route("/signup").post(controller.signup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.login);
router.route("/create_category").post(verify,verifyVendor,controller.createCategory)
router.route("/add_items").post(verify,verifyVendor,controller.createMenu)
router.route("/categories/:id").get(verify,verifyVendor,controller.getCategories)
router.route("/menu/:id").get(verify,verifyVendor,controller.getMenu)
router.route("/delete_category/:id").get(verify,verifyVendor,controller.deleteCategory)
router.route("/view_orders/:id").get(controller.viewAllOrders)
router.route("/find_order/:id").get(verify,verifyVendor,controller.findOrder)

router.route("/fetchOrders_restaurent/:id").get(verify,verifyVendor,controller.fetchOrders)
router.route("/forgotPassword").post(controller.forgotPassword)
router.route("/resetPassword/:token").post(controller.resetPassword)




router.route("/logout").post(verify,controller.logout)





export default router