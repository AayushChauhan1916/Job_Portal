import express from "express";
import register from "../controller/Auth/register.js"
import login from "../controller/Auth/login.js"
import logout from "../controller/Auth/logout.js"
import update from "../controller/Auth/updateProfile.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import verifyEmail from "../controller/verifyEmail.js";
import forgotPassword from "../controller/Auth/forgotpassword/ForgotPasswordRequest.js";
import validateToken from "../controller/Auth/forgotpassword/validateToken.js";
import resetPassword from "../controller/Auth/forgotpassword/resetPassword.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/update",isAuthenticated,update);
router.get("/verification/:id/:token",verifyEmail);
router.post("/forgot-password",forgotPassword);
router.get("/:id/forgotpassword/:token",validateToken);
router.post("/reset-password",resetPassword);

export default router;