import express from "express";
import { userController } from "../controllers/userController";
import container from "../config/inversifyConfig/inversifyConfig";
import verify from "../middlewares/authVerfication";
import { verifyUser } from "../middlewares/verifyuser";
import { UserOrderController } from "../controllers/userOrderController";
const router = express.Router();

const controller = container.get<userController>(userController);
const userOrderController =
  container.get<UserOrderController>(UserOrderController);

router.route("/signup").post(controller.userSignup);
router.route("/verify_otp").post(controller.verifyOtp);
router.route("/login").post(controller.userLogin);
router.route("/forgot_password").post(controller.forgotPassword);
router.route("/reset-password/:token").post(controller.resetPassword);
router.route("/restaurents").get(controller.getAllhotels);
router
  .route("/restaurent/:id")
  .get(verify, verifyUser, controller.getHotelData);
router.route("/profile/:id").get(verify, verifyUser, controller.getProfile);
router.route("/addto_cart").post(verify, verifyUser, controller.addtoCart);
router
  .route("/view_cart/:id")
  .get(verify, verifyUser, controller.getCartDetails);
router.route("/logout").get(verify, verifyUser, controller.userLogout);

router.route("/update_useraddress/").post(verify,verifyUser,controller.updateAddress)

//handling orders.......

router
  .route("/item_details/:id")
  .get(verify, verifyUser, userOrderController.getItemDetails);
router
  .route("/instant_order")
  .post(verify, verifyUser, userOrderController.instantOrder);

router
  .route("/viewOrders/:id")
  .get(verify, verifyUser, userOrderController.getOrders);

export default router;
