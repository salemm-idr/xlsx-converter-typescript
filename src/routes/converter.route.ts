import { Converter } from "../controller/Converter";
import { Router } from "express";
const router = Router();

export class ConverterRoutes {
  public fileConverter: Converter;
  constructor() {
    this.fileConverter = new Converter();
  }
  //*manage routes on basic root /api/convert/'names'
  /**
   * *you can list all your routes here and manage with controllers
   */
  get routes(): Router {
    const controller = this.fileConverter;
    router.post("/xfile", controller.convert);
    return router; //*must return the same router
  }
}
