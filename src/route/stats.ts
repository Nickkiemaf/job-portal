import { Router } from "express";
import { analytics } from "../controller/analyticsController.ts";

const router = Router()

router.get("/analytics/employer", analytics.summaryDashboardAnalytics)
router.get("/analytics/jobs/:id", analytics.specificJobListingAnalytics)

export default router