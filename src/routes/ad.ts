import { Router } from "express";
import AdController from "../controllers/ad";

const adRouter = Router();

adRouter.post("/games/:id/ads", AdController.store);
adRouter.get("/games/:id/ads", AdController.listAdsByGame);
adRouter.get("/ads/:id/discord", AdController.showDiscord);

export default adRouter;
