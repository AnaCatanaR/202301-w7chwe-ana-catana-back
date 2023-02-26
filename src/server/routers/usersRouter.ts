import { Router } from "express";
import { getUsers, createUser } from "../controllers/usersControllers.js";
import upload from "../middlewares/multerMiddleware.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.post("/register", upload.single("avatar"), createUser);

export default usersRouter;
