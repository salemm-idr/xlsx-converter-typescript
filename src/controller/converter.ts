import { Request, Response, RequestHandler } from "express";
import xlsx from "xlsx";
import fileSystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";
const directoryPath: string = path.join(__dirname, "./uploads");
const directoryOut: string = path.join(__dirname, "outputs");
const transformedJson: string = path.join(__dirname, "transformed");
type UploadedFile = fileUpload.UploadedFile;

/**
 * *realize all the engine of endpoint  with the information
 */
export class Converter {
  /**
   *
   * @param req file uploader bring xlsx file to transform
   * @param res  response with status of file tranform and probably seto to data base
   */
  constructor() {}
  isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }
  convert(req: Request, res: Response) {
    console.log("you made it !! and no change at all ");
    try {
      if (typeof req.files === "object") {
        const xfile = req.files.file;
        console.log(xfile);
        // if (this.isUploaded(xfile)) {
        //   console.log(xfile.name);
        //   xfile.mv(`src\\uploads\\${xfile.name}`, err => {
        //     if (err) {
        //       console.log("some error on the file");
        //     }
        //   });
        // }
      }
    } catch (error) {}
  }
}
