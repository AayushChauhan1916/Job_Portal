import express from "express";
import register from "../controller/Auth/register.js"
import login from "../controller/Auth/login.js"
import logout from "../controller/Auth/logout.js"
import update from "../controller/Auth/updateProfile.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/update",isAuthenticated,update);

export default router;