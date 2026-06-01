import { application, Router } from "express";
import { auth } from "../controller/authController.ts";
import { job } from "../controller/jobController.ts";
import { newApplication } from "../controller/applicationController.ts";
import { company } from "../controller/companyController.ts";

const router = Router()

router.post("/signup", auth.userSignup)
router.post("/login", auth.userLogin)
router.post("/jobs", job.createJob) //create job - employer only
router.get("/jobs", job.allActiveJobs) //all active jobs
router.get("/jobs/:id", job.getSingleJob)
router.patch("jobs/:id", job.updateJobs)
router.get("jobs/:id/application", job.getSingleJob)

//application routes
router.post("/jobs/:id/apply", newApplication.userApplication)
router.get("/applications/me", newApplication.allUserApplication)
router.put("/applications/:id/status", newApplication.updateApplicationByStatus)

//company routes

router.get("/companies/:id", company.activeJobs)
router.put("/companies/:id", company.updateCompanyProfile)


export default router


