import { PrismaClient } from "@prisma/client";

export default class ListGamesService {
  private prisma = new PrismaClient();
  async execute() {
    const games = await this.prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return games;
  }
}
