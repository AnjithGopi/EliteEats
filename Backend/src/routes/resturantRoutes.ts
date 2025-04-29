import express from "express";
import vendorController from "../controllers/vendorController.ts";

const router = express.Router();

router.route("/signup").post(vendorController.signup);
router.route("/login").post(vendorController.login);
