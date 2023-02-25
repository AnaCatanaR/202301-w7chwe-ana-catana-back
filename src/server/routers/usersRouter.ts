import { Router } from "express";
import { getUsers, createUser } from "../controllers/usersControllers.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post("/create", createUser);

export default usersRouter;
