import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { userService } from "./service";
import { BadRequestError, NotFoundError } from "../common";
import * as jwt from "jsonwebtoken";
import CONFIG from "../config";

class UserController {
  async current(req: Request, res: Response, next: NextFunction) {
    let data = null;
    if (req.session?.jwt) {
      data = jwt.verify(req.session!.jwt, CONFIG.JWT_SECRET);
    }
    res.status(200).json({ status: "ok", data });
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.get({ email });

    if (!user) throw new NotFoundError();

    if (!(await userService.comparePasswordHash(password, user.password)))
      throw new BadRequestError("Wrong Password");

    req.session = { jwt: jwt.sign(user!.toJSON(), CONFIG.JWT_SECRET) };

    res.status(200).json({ status: "ok", data: user });
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (await userService.check({ email })) {
      throw new BadRequestError("Email taken");
    }

    const user = await userService.create({
      email,
      password: await userService.hashPassword(password),
    });

    console.log(user);

    req.session = { jwt: jwt.sign(user.toJSON(), CONFIG.JWT_SECRET) };

    res.status(200).json({ user });
  }

  async signout(req: Request, res: Response) {
    req.session = null;
    res.status(200).json({ status: "ok" });
  }

  async clearDb(req: Request, res: Response) {
    await userService.dropUsers();
    res.status(200).json({ status: "ok" });
  }
}

export const userController = new UserController();
