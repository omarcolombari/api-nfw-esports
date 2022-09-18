import "express-async-errors";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

import cors from "cors";
import errorHandling from "./middlewares/errorHandling";
import express from "express";
import routes from "./routes";

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandling);

export default app;
