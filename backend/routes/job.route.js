import express from "express";
import isAuthenticated from "../middlewares/isAuth.js";
import { jobPost, getAllJobs, getJobById, getAdminJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, jobPost);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJob);

export default router;