import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import routes from "./routes";
import errorHandling from "./middleware/errorHandling";
import "express-async-errors";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandling);

export default app;
