import express from "express";
import { Router } from "express";
import {
	createFlight,
	getFlights,
	getFlightById,
	updateFlightStatus,
	assignCrew,
} from "../controllers/flight-controller";
import { checkRole } from "../middlewares/permission-middleware";
import constants from "../utils/constants";
import { getDashboard } from "../controllers/dashboard-controller";
import { authenticate } from "../middlewares/auth-middleware";

const flightRouter: Router = Router();

flightRouter.post(
	"/",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	createFlight,
);

flightRouter.get(
	"/",
	authenticate,
	checkRole(constants.ROLE_MANAGEMENT),
	checkRole(constants.ROLE_OPERATIONS),
	checkRole(constants.ROLE_ANALYST),
	getFlights,
);

flightRouter.get(
	"/:id",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	checkRole(constants.ROLE_MANAGEMENT),
	getFlightById,
);

flightRouter.patch(
	"/:id/status",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	updateFlightStatus,
);

flightRouter.post(
	"/assign-crew",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	assignCrew,
);

flightRouter.get("/dashboard", authenticate, getDashboard);

export default flightRouter;
