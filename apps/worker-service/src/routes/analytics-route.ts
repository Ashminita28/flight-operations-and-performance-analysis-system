import { Router } from "express";
import { analyticsController } from "../controller/analytics-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const analyticsRouter: Router = Router();

analyticsRouter.get(
	"/counters",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getCounterController,
);

analyticsRouter.get(
	"/on-time-performance",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getOnTimeController,
);

analyticsRouter.get(
	"/delay-analysis",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getDelayAnalytics,
);

analyticsRouter.get(
	"/active-flights",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getActiveFlightsController,
);

analyticsRouter.post(
	"/export-report",
	authenticate,
	authorizeRole("Admin", "Analyst"),
	analyticsController.exportAnalyticsController,
);

export default analyticsRouter;
