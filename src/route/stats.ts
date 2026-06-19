import { Router } from "express";
import { analytics } from "../controller/analyticsController.ts";
import { authenticate } from "../middleware/authenticate.ts";
import { permissions } from "../middleware/verifyRole.ts";

const router = Router()

router.get("/analytics/employer", authenticate, permissions(["Company"]), analytics.summaryDashboardAnalytics)
router.get("/analytics/jobs/:id", authenticate, permissions(["Company"]), analytics.specificJobListingAnalytics)

export default router
