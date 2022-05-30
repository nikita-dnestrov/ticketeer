import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError, RequestValidationError } from "./errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serialize() });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  throw new RequestValidationError(errors.array());
};

export const errorCatcher = (cb: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
