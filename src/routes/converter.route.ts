import { Converter } from "../controller/converter";
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
    router.get("/getfile",controller.getFile);
    router.post("/geocode",controller.goMaps);
    router.post("/createHeader",controller.createHeader);
    //! habialita una nueva ruta router.get("/getjson", controller.getJson);
    return router; //*must return the same router
  }
}
