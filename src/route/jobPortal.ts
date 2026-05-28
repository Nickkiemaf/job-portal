import { Router } from "express";
import { auth } from "../controller/authController.ts";
import { job } from "../controller/jobController.ts";

const router = Router()

router.post("/signup", auth.userSignup)
router.post("/login", auth.userLogin)
router.post("/jobs", job.createJob) //create job - employer only
router.get("/jobs", job.allActiveJobs) //all active jobs
router.get("/jobs/:id", job.getSingleJob)
router.patch("jobs/:id", job.updateJobs)
router.get("jobs/:id/application", job.getSingleJob)


export default router


// GET
//   / jobs
// List all active jobs(supports query filters)
// GET
//   / jobs /: id
// View a single job listing(increments view count)
// POST
//   / jobs
// Create a new job listing
// PUT
//   / jobs /: id
// Update an existing job listing
// DELETE
//   / jobs /: id
// Delete(soft - delete) a job listing
// GET
//   / jobs /: id / applications
// View all applications for a job
