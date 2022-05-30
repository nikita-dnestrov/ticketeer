import { Router } from "express";
import { usersRouter } from "./user";

const router = Router();

router.use("/users", usersRouter);

export default router;
