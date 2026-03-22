import { Router } from "express";
import { FlightPerformanceController } from "../controller/performance-controller";

import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";
const performanceRouter: Router = Router();

performanceRouter.post(
	"/performance/:flightId",
	authenticate,
	authorizeRole("Operations"),
	FlightPerformanceController.create,
);

performanceRouter.get(
	"/performance",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	FlightPerformanceController.getAll,
);

performanceRouter.get(
	"/performance/:flight_id",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	FlightPerformanceController.geFlightPerformance,
);

export default performanceRouter;
