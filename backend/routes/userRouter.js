import express from "express";
import register from "../controller/Auth/register.js"
import login from "../controller/Auth/login.js"
import logout from "../controller/Auth/logout.js"
import update from "../controller/Auth/updateProfile.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import verifyEmail from "../controller/verifyEmail.js";

const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/update",isAuthenticated,update);
router.get("/verification/:id/:token",verifyEmail);

export default router;