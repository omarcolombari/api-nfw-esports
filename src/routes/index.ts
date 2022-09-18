import { Router } from "express";
import adRouter from "./ad";
import gameRouter from "./game";

const routes = Router();

routes.use(gameRouter);
routes.use(adRouter);

export default routes;
