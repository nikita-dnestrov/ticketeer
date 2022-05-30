import { Router } from "express";
import { validator } from "../common";
import { userController } from "./controller";
import { authValidation } from "./validation";

export const usersRouter = Router();
const { current, signin, signout, signup, clearDb } = userController;

usersRouter.post("/sign-up", authValidation, validator, signup);
usersRouter.post("/sign-in", authValidation, validator, signin);
usersRouter.post("/sign-out", signout);

usersRouter.get("/current", current);

usersRouter.delete("/", clearDb);
