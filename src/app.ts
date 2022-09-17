import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

export default app;
