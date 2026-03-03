import { Router } from "express";
import { OperationController } from "../controllers/operation-controller";

const operationRouter: Router = Router();

operationRouter.post(
	"/flights/:flightId/events",
	OperationController.recordFlightEvent,
);
operationRouter.put(
	"/flights/:flightId/events/:id",
	OperationController.changeFlightEvent,
);

operationRouter.get("/events", OperationController.getAllEvents);

operationRouter.post("/flights/:flight_id", OperationController.getByFlight);

export default operationRouter;
