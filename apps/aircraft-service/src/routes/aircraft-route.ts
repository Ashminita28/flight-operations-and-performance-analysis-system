import { Router } from "express";
import {
	createAircraft,
	getAircraft,
	getAircraftById,
	updateAircraft,
	deleteAircraft,
	addMaintenance,
} from "../controllers/aircraft-controller";
import { checkRole } from "../middlewares/permission-middleware";
import constants from "../utils/constants";
import { authenticate } from "../middlewares/auth-middleware";

const aircraftRouter: Router = Router();

aircraftRouter.post(
	"/",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	createAircraft,
);
aircraftRouter.get(
	"/",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	checkRole(constants.ROLE_MANAGEMENT),
	getAircraft,
);
aircraftRouter.get(
	"/:id",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	checkRole(constants.ROLE_MANAGEMENT),
	getAircraftById,
);
aircraftRouter.put(
	"/:id",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	updateAircraft,
);
aircraftRouter.delete(
	"/:id",
	authenticate,
	checkRole(constants.ROLE_MANAGEMENT),
	deleteAircraft,
);
aircraftRouter.post(
	"/:id/maintenance",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	addMaintenance,
);

export default aircraftRouter;
