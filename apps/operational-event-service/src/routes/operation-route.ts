import { Router } from "express";
import { OperationController } from "../controllers/operation-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const operationRouter: Router = Router();

operationRouter.get(
	"/events",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	OperationController.getAllEvents,
);

operationRouter.post(
	"/:flightId/events",
	authenticate,
	authorizeRole("Operations"),
	OperationController.recordFlightEvent,
);

operationRouter.put(
	"/:flightId/events/:id",
	authenticate,
	authorizeRole("Operations"),
	OperationController.changeFlightEvent,
);

operationRouter.get(
	"/:flight_id/events",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	OperationController.getByFlight,
);

export default operationRouter;
