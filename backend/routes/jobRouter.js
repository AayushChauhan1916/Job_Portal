import express from "express";
import postJob from "../controller/Job/postJob.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import getAllJob from "../controller/Job/getAllJob.js";
import getJobById from "../controller/Job/getJobById.js"
import adminGetJob from "../controller/Job/adminGetJob.js";

const router = express.Router();

router.post("/post",isAuthenticated,postJob);
router.post("/get/alljob",getAllJob);
router.post("/get/:id",getJobById);
router.post("/get/admin/job",isAuthenticated,adminGetJob);

export default router;

