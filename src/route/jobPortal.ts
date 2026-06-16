import { application, Router } from "express";
import { auth } from "../controller/authController.ts";
import { job } from "../controller/jobController.ts";
import { newApplication } from "../controller/applicationController.ts";
import { company } from "../controller/companyController.ts";
import { authenticate } from "../middleware/authenticate.ts";
import { permissions } from "../middleware/verifyRole.ts";


const router = Router()

router.post("/signup", auth.userSignup)
router.post("/login", auth.userLogin)
router.post("/jobs", authenticate, permissions(["Job_seeker"]), job.createJob) //create job - employer only
router.get("/jobs", authenticate, permissions(["Job_seeker"]), job.allActiveJobs) //all active jobs
router.get("/jobs/:id", authenticate, permissions(["Company", "Job_seeker"]), job.getSingleJob) //get a job by id
router.patch("/jobs/:id", authenticate, permissions(["Company"]), job.updateJobs)
router.delete("/jobs/:id", authenticate, permissions(["Company"]), job.deleteJob)
router.get("/jobs/:id/application", job.allJobApplications)//company application

//application routes
router.post("/jobs/:id/apply", authenticate, permissions(["Job_seeker"]), newApplication.userApplication)
router.get("/applications/me", authenticate, permissions(["Job_seeker"]), newApplication.allUserApplication)
router.put("/applications/:id/status", authenticate, permissions(["Company"]), newApplication.updateApplicationByStatus)
router.delete("/applications/:id", authenticate, permissions(["Job_seeker"]), newApplication.withdrawApplication)//delete application: jobseeker


//company routes

router.get("/companies/:id", authenticate, permissions(["Company"]), company.activeJobs)//return company's active jobs 
router.put("/companies/:id", authenticate, permissions(["Company"]), company.updateCompanyProfile)


export default router


