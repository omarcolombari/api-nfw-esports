import { prisma } from "../../app";
import { convertMinutesToHoursString } from "../../utils/convert-minute-to-hours-string";

export default class ListAdsByGame {
  async execute(gameId: string) {
    const ads = await prisma.ads.findMany({
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

    return ads.map((ad) => {
      return {
        ...ad,
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
        hourStart: convertMinutesToHoursString(ad.hourStart),
      };
    });
  }
}
