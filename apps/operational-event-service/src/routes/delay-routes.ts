import { Router } from "express";
import { DelayCategoryController } from "../controllers/delay-controller";
import { authenticate } from "@package/shared-middleware";

const delayRouter: Router = Router();

delayRouter.post("/delays", authenticate, DelayCategoryController.create);

delayRouter.get("/delays", authenticate, DelayCategoryController.getAll);

delayRouter.delete("/delays/:id", authenticate, DelayCategoryController.delete);

export default delayRouter;
