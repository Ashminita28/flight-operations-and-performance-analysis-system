import express from "express";
import { Router } from "express";
import * as controller from "../controllers/flight-controller";

const flightRouter: Router = express();

flightRouter.post("/", controller.createFlight);

flightRouter.get("/", controller.getFlights);

flightRouter.get("/:id", controller.getFlightById);

flightRouter.patch("/:id/status", controller.updateFlightStatus);

flightRouter.post("/assign-crew", controller.assignCrew);

export default flightRouter;
