import { Router } from "express";
import { analyticsController } from "../controller/analytics-controller";

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
	analyticsController.getDelayAnalytics,
);

analyticsRouter.get(
	"/analytics/active-flights",
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
	analyticsController.exportAnalyticsController,
);

export default analyticsRouter;
