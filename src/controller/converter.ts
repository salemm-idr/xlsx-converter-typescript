import { Request, Response } from "express";
import express from "express";
import xlsx from "xlsx";
import bodyParser from "body-parser";
import fileSystem from "fs";
import path from "path";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export class Converter {
  public convert(req: Request, res: Response): void {
    console.log("you made it !!");
  }
}
