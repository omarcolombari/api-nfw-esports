import { Request, Response } from "express";
import CreateAdService from "../services/ads/createAd";
import FindDiscordByAd from "../services/ads/findDiscordByAd";
import ListAdsByGame from "../services/ads/listAdsByGame.";

export default class AdController {
  static async store(req: Request, res: Response) {
    const {
      discord,
      hourEnd,
      hourStart,
      name,
      useVoiceChannel,
      weekDays,
      yearsPlaying,
    } = req.body;

    const { id: gameId } = req.params;

    const createAd = new CreateAdService();
    const ad = await createAd.execute({
      discord,
      gameId,
      hourEnd,
      hourStart,
      name,
      useVoiceChannel,
      weekDays,
      yearsPlaying,
    });
    return res.status(201).json(ad);
  }

  static async showDiscord(req: Request, res: Response) {
    const { id } = req.params;

    const findDiscordByAd = new FindDiscordByAd();
    const discord = await findDiscordByAd.execute(id);

    return res.json(discord);
  }

  static async listAdsByGame(req: Request, res: Response) {
    const { id } = req.params;

    const listAdsByGame = new ListAdsByGame();
    const ads = await listAdsByGame.execute(id);

    return res.json(ads);
  }
}
