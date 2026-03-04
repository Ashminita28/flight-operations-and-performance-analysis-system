import { Router } from "express";
import { OperationController } from "../controllers/operation-controller";

const operationRouter: Router = Router();

operationRouter.post(
	"/:flightId/events",
	OperationController.recordFlightEvent,
);
operationRouter.put(
	"/:flightId/events/:id",
	OperationController.changeFlightEvent,
);

operationRouter.get("/events", OperationController.getAllEvents);

operationRouter.get("/:flight_id/events", OperationController.getByFlight);

export default operationRouter;
