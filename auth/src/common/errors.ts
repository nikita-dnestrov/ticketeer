import { ValidationError } from "express-validator";

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serialize(): { errors: { message: string; field?: string }[] };
}

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super("Request Validation Error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize() {
    return {
      errors: this.errors.map((el) => ({ message: el.msg, field: el.param })),
    };
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return {
      errors: [{ message: "Not Found" }],
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(private msg: string) {
    super("Bad Request");
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return {
      errors: [{ message: this.msg }],
    };
  }
}
