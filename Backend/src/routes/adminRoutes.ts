import express from "express"
import adminController from "../controllers/adminController.ts"

const router=express.Router()


router.route("/login").post(adminController.login)



export default router