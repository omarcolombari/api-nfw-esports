import { prisma } from "../../app";
import { convertHourStringToMinutes } from "../../utils/convert-hour-string-to-minutes";

interface ICreateAd {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

export default class CreateAdService {
  async execute({
    discord,
    gameId,
    hourEnd,
    hourStart,
    name,
    useVoiceChannel,
    weekDays,
    yearsPlaying,
  }: ICreateAd) {
    const ad = await prisma.ads.create({
      data: {
        discord,
        hourEnd: convertHourStringToMinutes(hourEnd),
        hourStart: convertHourStringToMinutes(hourStart),
        name,
        useVoiceChannel,
        weekDays,
        yearsPlaying,
        gameId,
      },
    });

    return ad;
  }
}
