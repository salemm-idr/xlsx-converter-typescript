import { Request, Response } from "express";
import express from "express";
import xlsx from "xlsx";
import bodyParser from "body-parser";
import fileSystem from "fs";
import path from "path";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * *realize all the engine of endpoint  with the information
 */

export class Converter {
  /**
   *
   * @param req file uploader bring xlsx file to transform
   * @param res  response with status of file tranform and probably seto to data base
   */
  public convert(req: Request, res: Response): void {
    console.log("you made it !!");
    res.status(200).json({ message: "Hola mundo en typescript" });
  }
}
