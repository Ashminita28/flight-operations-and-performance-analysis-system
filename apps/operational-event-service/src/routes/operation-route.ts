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

export default operationRouter;
