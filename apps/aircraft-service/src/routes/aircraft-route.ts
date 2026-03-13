import { Router } from "express";

import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";
import {
	changeAircraftStatusController,
	createAircraftController,
	deleteAircraftByIdController,
	getAircraftByIdController,
	getAllAircraftController,
	getAllAirportsController,
	updateAircraftByIdController,
} from "../controllers/aircraft-controller";

const aircraftRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Aircraft
 *   description: Aircraft management endpoints
 */

/**
 * @swagger
 * /api/aircraft:
 *   post:
 *     summary: Register a new aircraft
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registration:
 *                 type: string
 *               icao_type:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *               seat_capacity:
 *                 type: integer
 *               fuel_capacity_kg:
 *                 type: number
 *               max_payload_kg:
 *                 type: number
 *               year_of_manufacture:
 *                 type: integer
 *               status:
 *                 type: string
 *               base_airport_code:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aircraft created successfully
 */
aircraftRouter.post(
	"/aircraft",
	authenticate,
	authorizeRole("Operations"),
	createAircraftController,
);

/**
 * @swagger
 * /api/aircraft:
 *   get:
 *     summary: Retrieve all aircraft
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of aircraft
 */

aircraftRouter.get(
	"/aircraft",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllAircraftController,
);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   get:
 *     summary: Get aircraft by ID
 *     tags: [Aircraft]
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
 *         description: Aircraft details
 */
aircraftRouter.get(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAircraftByIdController,
);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   put:
 *     summary: Update aircraft
 *     tags: [Aircraft]
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
 *     responses:
 *       200:
 *         description: Aircraft updated
 */
aircraftRouter.put(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Operations"),
	updateAircraftByIdController,
);

/**
 * @swagger
 * /api/aircraft/{id}/status:
 *   patch:
 *     summary: Change aircraft status
 *     tags: [Aircraft]
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
aircraftRouter.patch(
	"/aircraft/:id/status",
	authorizeRole("Operations"),
	changeAircraftStatusController,
);
/**
 * @swagger
 * /api/aircraft/{id}:
 *   delete:
 *     summary: Delete aircraft
 *     tags: [Aircraft]
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
 *         description: Aircraft deleted
 */
aircraftRouter.delete(
	"/aircraft/:id",
	authenticate,
	authorizeRole("Operations"),
	deleteAircraftByIdController,
);
/**
 * @swagger
 * /api/airports:
 *   get:
 *     summary: Get list of airports
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Airports list
 */
aircraftRouter.get(
	"/airports",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getAllAirportsController,
);

export default aircraftRouter;
