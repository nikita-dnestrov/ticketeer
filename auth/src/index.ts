import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cookie from "cookie-session";

import { errorHandler, NotFoundError } from "./common";
import routes from "./router";
import config from "./config";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookie({
    signed: false,
    secure: true,
  })
);
app.use(morgan("dev"));

app.use("/api", routes);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  // if (!process.env.JWT_SECRET) {
  //   throw new Error("JWT_SECRET should be defined");
  // }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
  app.listen(config.PORT, () => console.log(`Up on ${config.PORT}!`));
};

start();
