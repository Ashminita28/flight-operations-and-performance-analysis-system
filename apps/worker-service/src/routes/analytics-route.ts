import { Router } from "express";
import { analyticsController } from "../controller/analytics-controller";
import { authenticate, authorizeRole } from "@package/shared-middleware";

const analyticsRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Worker service analytics endpoints
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard counter analytics
 *     tags: [Analytics]
 *     parameters:
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
 *       - in: query
 *         name: origin_airport
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_airport
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard counters
 */
analyticsRouter.get(
	"/analytics/counters",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getCounterController,
);

/**
 * @swagger
 * /api/reports/on-time-performance:
 *   get:
 *     summary: Get on-time performance chart data
 *     tags: [Analytics]
 *     parameters:
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
 *       - in: query
 *         name: origin_airport
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_airport
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: On-time performance data
 */
analyticsRouter.get(
	"/analytics/on-time-performance",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getOnTimeController,
);

/**
 * @swagger
 * /api/reports/analytics-table:
 *   get:
 *     summary: Get summary table analytics
 *     tags: [Analytics]
 *     parameters:
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
 *         description: Summary table data
 */
analyticsRouter.get(
	"/analytics/delay-analysis",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getDelayAnalytics,
);

analyticsRouter.get(
	"/analytics/active-flights",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	analyticsController.getActiveFlightsController,
);

/**
 * @swagger
 * /api/reports/export:
 *   get:
 *     summary: Request analytics export via email
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Export request submitted
 */
analyticsRouter.post(
	"/analytics/export-report",
	authenticate,
	authorizeRole("Admin", "Analyst"),
	analyticsController.exportAnalyticsController,
);

export default analyticsRouter;
