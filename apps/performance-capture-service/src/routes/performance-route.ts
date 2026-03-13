import { Router } from "express";
import { FlightPerformanceController } from "../controller/performance-controller";

import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";
const performanceRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Performance
 *   description: Flight performance metrics endpoints
 */

/**
 * @swagger
 * /api/performance/{flightId}:
 *   post:
 *     summary: Record performance data for a flight
 *     tags: [Performance]
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
 *             $ref: '#/components/schemas/FlightPerformance'
 *     responses:
 *       201:
 *         description: Performance recorded
 */
performanceRouter.post(
	"/performance/:flightId",
	authenticate,
	authorizeRole("Operations"),
	FlightPerformanceController.create,
);

/**
 * @swagger
 * /api/performance:
 *   get:
 *     summary: Get all performance records
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of performance data
 */
performanceRouter.get(
	"/performance",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	FlightPerformanceController.getAll,
);

/**
 * @swagger
 * /api/performance/{flight_id}:
 *   get:
 *     summary: Get performance data by flight ID
 *     tags: [Performance]
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
 *         description: Performance data
 */
performanceRouter.get(
	"/performance/:flight_id",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	FlightPerformanceController.geFlightPerformance,
);

export default performanceRouter;
