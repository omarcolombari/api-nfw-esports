import { prisma } from "../../app";

export default class FindDiscordByAd {
  async execute(id: string) {
    const ad = await prisma.ads.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id,
      },
    });

    return { discord: ad.discord };
  }
}
