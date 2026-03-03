import { Router } from "express";
import { FlightPerformanceController } from "../controller/performance-controller";

const performanceRouter: Router = Router();

performanceRouter.post("/performance", FlightPerformanceController.create);

performanceRouter.get("/performance", FlightPerformanceController.getAll);

export default performanceRouter;
