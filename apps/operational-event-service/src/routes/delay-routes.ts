import { Router } from "express";
import { DelayCategoryController } from "../controllers/delay-controller";

const delayRouter: Router = Router();

delayRouter.post("/delays", DelayCategoryController.create);

delayRouter.get("/delays", DelayCategoryController.getAll);

delayRouter.delete("/delays/:id", DelayCategoryController.delete);

export default delayRouter;
