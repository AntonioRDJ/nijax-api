import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
require("./utils/patch.js");


class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.express.use(
      cors({
        origin: "*",
        optionsSuccessStatus: 200
      })
    );
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(router);
  }

  private errorHandling(): void {
    // this.express.use(errorHandler);
  }
}

export default new App().express;
