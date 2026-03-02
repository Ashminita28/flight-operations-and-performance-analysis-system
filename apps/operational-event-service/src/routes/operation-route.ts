import { Router } from "express";
import { OperationController } from "../controllers/operation-controller";

const operationRouter: Router = Router();

operationRouter.get(
	"/flights/:flightId/events",
	OperationController.allFlightEvents,
);
operationRouter.post(
	"/flights/:flightId/events",
	OperationController.recordFlightEvent,
);
operationRouter.get(
	"/flights/:flightId/events/:id",
	OperationController.specificFlightEvent,
);
operationRouter.put(
	"/flights/:flightId/events/:id",
	OperationController.changeFlightEvent,
);
operationRouter.patch(
	"/flights/:flightId/events/:id/resolve",
	OperationController.resolveFlightEvent,
);
operationRouter.get("/events", OperationController.searchFlightEvent);
operationRouter.get("/delay-categories", OperationController.delayCategories);
operationRouter.post("/delay-categories", OperationController.newDelayCategory);

export default operationRouter;
