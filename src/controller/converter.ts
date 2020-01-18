import { Request, Response } from "express";
import express from "express";
import xlsx from "xlsx";
import bodyParser from "body-parser";
import fileSystem from "fs";
import path from "path";
import fileUpload from "express-fileupload";
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export function converter(req: Request, res: Response) {
  console.log("hey estas en converter ahora ");
}
