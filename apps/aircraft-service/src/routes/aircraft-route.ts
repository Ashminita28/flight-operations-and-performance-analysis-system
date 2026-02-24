import { Router } from "express";
import {
	createAircraft,
	getAircraft,
	getAircraftById,
	updateAircraft,
	deleteAircraft,
	addMaintenance,
} from "../controllers/aircraft-controller";

const aircraftRouter: Router = Router();

aircraftRouter.post("/", createAircraft);
aircraftRouter.get("/", getAircraft);
aircraftRouter.get("/:id", getAircraftById);
aircraftRouter.put("/:id", updateAircraft);
aircraftRouter.delete("/:id", deleteAircraft);
aircraftRouter.post("/:id/maintenance", addMaintenance);

export default aircraftRouter;
