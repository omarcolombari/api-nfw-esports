import { Router } from "express";
import GameController from "../controllers/game";

const gameRouter = Router();

gameRouter.get("/", GameController.index);

export default gameRouter;
