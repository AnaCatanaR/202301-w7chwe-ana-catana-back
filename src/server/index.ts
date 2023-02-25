import morgan from "morgan";
import express from "express";
import cors from "cors";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

export default app;
