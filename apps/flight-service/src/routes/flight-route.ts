import { Router } from "express";
import {
	createFlightController,
	getAllFlightsController,
	getFlightByIdController,
	updateFlightByIdController,
	deleteFlightById,
	getTodaysFlightUpdates,
	searchFlightController,
	changeFlightStatusByIdController,
} from "../controllers/flight-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const flightRouter: Router = Router();

flightRouter.post(
	"/flights",
	authenticate,
	authorizeRole("Operations"),
	createFlightController,
);

flightRouter.get(
	"/flights",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllFlightsController,
);
flightRouter.get(
	"/flights/search",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	searchFlightController,
);
flightRouter.get(
	"/flights/today",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getTodaysFlightUpdates,
);
flightRouter.get(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	getFlightByIdController,
);

flightRouter.put(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	updateFlightByIdController,
);

flightRouter.patch(
	"/flights/:id/status",
	authenticate,
	authorizeRole("Operations"),
	changeFlightStatusByIdController,
);

flightRouter.delete(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	deleteFlightById,
);

export default flightRouter;
