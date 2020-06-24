import express from "express";
import { ConverterRoutes } from "./converter.route";

//*Global route handling
export default class Api {
  public static initialize(app: express.Application): void {
    app.use("/api/convert", new ConverterRoutes().routes);
  }
}
