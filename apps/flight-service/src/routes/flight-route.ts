import { Router } from "express";
import {
	createFlightController,
	getAllFlightsController,
	getFlightByIdController,
	updateFlightByIdController,
	deleteFlightById,
	getTodaysFlightUpdates,
	searchFlightController,
	changeFlightStatusByIdController,
} from "../controllers/flight-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const flightRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight operations and management
 */

/**
 * @swagger
 * /api/flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFlight'
 *     responses:
 *       201:
 *         description: Flight created
 */
flightRouter.post(
	"/flights",
	authenticate,
	authorizeRole("Operations"),
	createFlightController,
);

/**
 * @swagger
 * /api/flights:
 *   get:
 *     summary: Retrieve a list of flights
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: flight_number
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: origin_airport
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_airport
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of flights
 */
flightRouter.get(
	"/flights",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllFlightsController,
);

/**
 * @swagger
 * /api/flights/search:
 *   get:
 *     summary: Search flights by flight number
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: flight_number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching flights
 */
flightRouter.get(
	"/flights/search",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	searchFlightController,
);

/**
 * @swagger
 * /api/flights/today:
 *   get:
 *     summary: Get today's flights
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's flights
 */
flightRouter.get(
	"/flights/today",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getTodaysFlightUpdates,
);

/**
 * @swagger
 * /api/flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flight details
 */
flightRouter.get(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	getFlightByIdController,
);

/**
 * @swagger
 * /api/flights/{id}:
 *   put:
 *     summary: Update flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *             $ref: '#/components/schemas/UpdateFlight'
 *     responses:
 *       200:
 *         description: Flight updated
 */
flightRouter.put(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	updateFlightByIdController,
);

/**
 * @swagger
 * /api/flights/{id}/status:
 *   patch:
 *     summary: Change flight status
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status changed
 */
flightRouter.patch(
	"/flights/:id/status",
	authenticate,
	authorizeRole("Operations"),
	changeFlightStatusByIdController,
);

/**
 * @swagger
 * /api/flights/{id}:
 *   delete:
 *     summary: Delete flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flight deleted
 */
flightRouter.delete(
	"/flights/:id",
	authenticate,
	authorizeRole("Operations"),
	deleteFlightById,
);

export default flightRouter;
