import express from "express";
import registerCompany from "../controller/Company/register.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import getCompany from "../controller/Company/getCompany.js";
import getCompanyById from "../controller/Company/getCompanyById.js"
import updateCompany from "../controller/Company/updateCompany.js";

const router = express.Router();

router.post("/register",isAuthenticated,registerCompany);
router.get("/get",isAuthenticated,getCompany);
router.get("/get/:id",isAuthenticated,getCompanyById);
router.patch("/update/:id",isAuthenticated,updateCompany);


export default router;