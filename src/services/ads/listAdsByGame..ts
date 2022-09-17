import { PrismaClient } from "@prisma/client";

export default class ListAdsByGame {
  private prisma = new PrismaClient();
  async execute(gameId: string) {
    const ad = await this.prisma.ads.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return ad;
  }
}
