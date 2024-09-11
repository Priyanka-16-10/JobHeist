import express from "express";
import isAuthenticated from "../middlewares/isAuth.js";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/get/:id").get(isAuthenticated, getApplicants);
router.route("/getadminjobs").get(isAuthenticated, updateStatus);

export default router;