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
router.get("/jobs/:id", job.getSingleJob) //get a job by id
router.patch("/jobs/:id", job.updateJobs)
router.delete("/jobs/:id", job.deleteJob)
router.get("/jobs/:id/application", job.allJobApplications)//company application

//application routes
router.post("/jobs/:id/apply", newApplication.userApplication)
router.get("/applications/me", newApplication.allUserApplication)
router.put("/applications/:id/status", newApplication.updateApplicationByStatus)
router.delete("/applications/:id", newApplication.withdrawApplication)//delete application: jobseeker


//company routes

router.get("/companies/:id", company.activeJobs)//return company's active jobs 
router.put("/companies/:id", company.updateCompanyProfile)


export default router


