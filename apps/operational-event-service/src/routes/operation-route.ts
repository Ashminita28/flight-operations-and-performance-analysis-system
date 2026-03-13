import { Router } from "express";
import { OperationController } from "../controllers/operation-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const operationRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Operational flight event endpoints
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all flight events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of events
 */
operationRouter.get(
	"/events",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	OperationController.getAllEvents,
);

/**
 * @swagger
 * /api/{flightId}/events:
 *   post:
 *     summary: Record an operational event for a flight
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOperationalEvent'
 *     responses:
 *       200:
 *         description: Event recorded
 */
operationRouter.post(
	"/:flightId/events",
	authenticate,
	authorizeRole("Operations"),
	OperationController.recordFlightEvent,
);

/**
 * @swagger
 * /api/{flightId}/events/{id}:
 *   put:
 *     summary: Update an operational event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOperationalEvent'
 *     responses:
 *       200:
 *         description: Event updated
 */
operationRouter.put(
	"/:flightId/events/:id",
	authenticate,
	authorizeRole("Operations"),
	OperationController.changeFlightEvent,
);

/**
 * @swagger
 * /api/{flight_id}/events:
 *   get:
 *     summary: Get all events for a flight
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flight_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events list
 */
operationRouter.get(
	"/:flight_id/events",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	OperationController.getByFlight,
);

export default operationRouter;
