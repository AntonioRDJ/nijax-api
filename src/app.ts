import express from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes";

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());
app.use(router);


export default app;
