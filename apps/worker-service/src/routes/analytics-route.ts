import { Router } from "express";
import { analyticsController } from "../controller/analytics-controller";

const analyticsRouter: Router = Router();

analyticsRouter.get(
	"/dashboard/summary",
	analyticsController.getCounterController,
);
analyticsRouter.get(
	"/reports/on-time-performance",
	analyticsController.getOnTimeController,
);
analyticsRouter.get(
	"/reports/charts/delays",
	analyticsController.getDelayAnalytics,
);

export default analyticsRouter;
