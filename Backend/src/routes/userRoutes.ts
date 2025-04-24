import express  from "express"
import userController from "../controllers/userController.ts"


const router=express.Router()



router.route("/signup")
       .post(userController.userSignup)





 export default router     