import { PrismaClient } from "@prisma/client";
import axios from "axios";
import "dotenv/config";

// Inteface

interface IGames {
  id: string;
  name: string;
  box_art_url: string;
}

interface IResponseGetGames {
  data: IGames[];
  pagination: object;
}

const prisma = new PrismaClient();

const getBearerToken = async () => {
  const {
    data: { access_token },
  } = await axios.post("https://id.twitch.tv/oauth2/token", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  return access_token;
};

const getGames = async (token: string) => {
  const {
    data: { data },
  } = await axios.get<IResponseGetGames>(
    "https://api.twitch.tv/helix/games/top",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": String(process.env.CLIENT_ID),
      },
    }
  );

  return data;
};

const insertGamesInDb = (games: IGames[]) => {
  games.forEach(async (element) => {
    const game = await prisma.game.create({
      data: {
        title: element.name,
        bannerUrl: element.box_art_url,
      },
    });
  });
};

const main = async () => {
  const token = await getBearerToken();
  const games = await getGames(token);
  insertGamesInDb(games);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
