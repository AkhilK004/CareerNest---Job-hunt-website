import express from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { getAllJobs, getJobById, getJobByLoggedAdminUser, postJob } from "../controllers/job.controller.js";
 
const router = express.Router();

router.route("/postjob").post( isAuthenticated , postJob);
router.route("/all").get( getAllJobs); // Public endpoint - no authentication required
router.route("/getadminjobs").get(isAuthenticated, getJobByLoggedAdminUser);
router.route("/:id").get( getJobById); // Public endpoint - anyone can view job details


export default router;