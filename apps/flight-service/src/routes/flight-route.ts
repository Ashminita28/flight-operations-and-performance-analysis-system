import express from "express";
import { Router } from "express";
import {
	createFlight,
	getFlights,
	getFlightById,
	updateFlightStatus,
	assignCrew,
	assignAircraft,
} from "../controllers/flight-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const flightRouter: Router = Router();

flightRouter.post(
	"/",
	authenticate,
	authorizeRole(["Operations"]),
	createFlight,
);

flightRouter.get(
	"/",
	authenticate,
	authorizeRole(["Manager", "Operations", "Analyst"]),
	getFlights,
);

flightRouter.get(
	"/:id",
	authenticate,
	authorizeRole(["Manager", "Operations"]),
	getFlightById,
);

flightRouter.patch(
	"/:id/status",
	authenticate,
	authorizeRole(["Operations"]),
	updateFlightStatus,
);

flightRouter.post(
	"/assign-crew",
	authenticate,
	authorizeRole(["Operations"]),
	assignCrew,
);
flightRouter.post(
	"/assign-aircraft",
	authenticate,
	authorizeRole(["Operations"]),
	assignAircraft,
);

export default flightRouter;
