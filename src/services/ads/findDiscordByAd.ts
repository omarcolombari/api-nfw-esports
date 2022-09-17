import { PrismaClient } from "@prisma/client";

export default class FindDiscordByAd {
  private prisma = new PrismaClient();
  async execute(id: string) {
    const ad = await this.prisma.ads.findUniqueOrThrow({
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
