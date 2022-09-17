import { Request, Response } from "express";
import ListGamesService from "../services/games/listGames";

export default class GameController {
  async index(req: Request, res: Response) {
    const listGames = new ListGamesService();
    const games = await listGames.execute();
    return res.json(games);
  }
}
