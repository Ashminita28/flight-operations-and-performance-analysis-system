import { Router } from "express";
import {
	createAircraft,
	getAircraft,
	getAircraftById,
	updateAircraft,
	deleteAircraft,
	addMaintenance,
} from "../controllers/aircraft-controller";

import constants from "../utils/constants";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const aircraftRouter: Router = Router();

aircraftRouter.post(
	"/",
	authenticate,
	authorizeRole(["Operations"]),
	createAircraft,
);
aircraftRouter.get(
	"/",
	authenticate,
	authorizeRole(["Operations", "Manager"]),
	getAircraft,
);
aircraftRouter.get(
	"/:id",
	authenticate,
	authorizeRole(["Operations", "Manager"]),
	getAircraftById,
);
aircraftRouter.put(
	"/:id",
	authenticate,
	authorizeRole(["Operations", "Manager"]),
	updateAircraft,
);
aircraftRouter.delete(
	"/:id",
	authenticate,
	authorizeRole(["Manager"]),
	deleteAircraft,
);
aircraftRouter.post(
	"/:id/maintenance",
	authenticate,
	authorizeRole(["Operations"]),
	addMaintenance,
);

export default aircraftRouter;
