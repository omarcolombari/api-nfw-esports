import { prisma } from "../../app";
import AppError from "../../errors/AppError";

export default class FindDiscordByAd {
  async execute(id: string) {
    const ad = await prisma.ads.findUnique({
      select: {
        discord: true,
      },
      where: {
        id,
      },
    });

    if (!ad) {
      throw new AppError("Ad not found", 404);
    }

    return { discord: ad.discord };
  }
}
