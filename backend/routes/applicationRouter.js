import express from "express";
import applyJob from "../controller/application/applyJob.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import getAppliedJobs from "../controller/application/getallapplication.js";
import getApplicant from "../controller/application/getApplicant.js";
import updateStatus from "../controller/application/updateStatus.js";

const router = express.Router();

router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/get/appliedjob", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicant);
router.patch("/status/:id/update", isAuthenticated, updateStatus);

export default router;
