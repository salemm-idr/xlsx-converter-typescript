import { Converter } from "../controller/Converter";
import { Router } from "express";
const router = Router();

export default class ConverterRoutes {
  public fileConverter: Converter;
  constructor() {
    this.fileConverter = new Converter();
  }
  get routes(): Router {
    const controller = this.fileConverter;
    router.post("/api/xfile", controller.convert);
    return router;
  }
}
