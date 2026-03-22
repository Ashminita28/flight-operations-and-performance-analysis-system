import { Router } from "express";

import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";
import {
	changeAircraftStatusController,
	createAircraftController,
	deleteAircraftByIdController,
	getAircraftByIdController,
	getAllAircraftController,
	getAllAirportsController,
	updateAircraftByIdController,
} from "../controllers/aircraft-controller";

const aircraftRouter: Router = Router();

aircraftRouter.post(
	"/aircraft",
	authenticate,
	authorizeRole("Operations"),
	createAircraftController,
);

aircraftRouter.get(
	"/aircraft",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllAircraftController,
);

aircraftRouter.get(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAircraftByIdController,
);

aircraftRouter.put(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Operations"),
	updateAircraftByIdController,
);

aircraftRouter.patch(
	"/aircraft/:id/status",
	authorizeRole("Operations"),
	changeAircraftStatusController,
);

aircraftRouter.delete(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Operations"),
	deleteAircraftByIdController,
);

aircraftRouter.get(
	"/airports",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllAirportsController,
);

export default aircraftRouter;
