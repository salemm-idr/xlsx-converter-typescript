import xlsx, { WorkSheet } from "xlsx";
import fileUpload from "express-fileupload";
import Cover, { ICover } from "../models/Cover";
import path from "path";
type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.resolve("src/uploads");
interface Idata {
  message: string;
  payload: any;
}
export class CoverCreator {
  xlsxFile: any;
  historicId: string;
  taskRequestId: string;
  workbook: any;
  worksheet: WorkSheet = Object;
  fileName: string = "";
  coverId: string = "";
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }
  constructor(xlsxFile: any, historicId: string, taskRequestId: string) {
    this.xlsxFile = xlsxFile;
    this.historicId = historicId;
    this.taskRequestId = taskRequestId;
  }

  public async getXlsx() {
    return new Promise<Idata>((resolve, reject) => {
      const { file } = this.xlsxFile;
      console.log(file, "llegado");
      //mover archivo a carpeta
      file.mv(`${directoryPath}/${file.name}`, (error: any) => {
        if (error) {
          console.log(error);
          reject({ message: "There isa error on move file function" });
        } else {
          this.fileName = file.name;
          resolve({
            message: "File Storaged Succesfully 😉",
            payload: this.fileName,
          });
        }
      });
    });
  }

  public readXfile() {
    return new Promise<Idata>((resolve, reject) => {
      this.workbook = xlsx.readFile(`${directoryPath}/${this.fileName}`, {
        cellDates: true,
      });
      let tabs: string[] = this.workbook.SheetNames;

      console.log(tabs, "in Coverconverter 🖥 ");
      tabs.map((tab) => {
        this.worksheet = this.workbook.Sheets[tab];
      });
      let headerXtract = xlsx.utils.sheet_to_csv(this.worksheet, {
        RS: "\n",
        strip: true,
      });
      let muestrax = headerXtract.slice(0, 800);
      let str = muestrax.toUpperCase().trim();
      let headerSheet = "";
      let infoAddress = "";
      let infoImei = "";
      let infoName = "";
      let infoPlat = "";
      let infoFecha = "";

      let pivoAddres = "";
      let pivoName = "";
      let pivoCel = "";

      if (str.includes("TELEFONO") === true) {
        headerSheet = str.split("TELEFONO")[0];
        //console.log(headerSheet);
        pivoAddres = headerSheet.split("DIRECCIÓN")[1];
        //console.log(pivoAddres,"\n------------------Extracto de direccion \n")

        if (headerSheet.includes("DIRECCIÓN") === true) {
          pivoName = headerSheet.split("DIRECCIÓN")[0];
          //console.log(pivoName,"\n----------- extracto de nombre infoName \n")
        }

        if (pivoName.includes("NOMBRE") === true) {
          //console.log(pivoName.split("NOMBRE")[1],"\n----------- cadena de nombre REAL \n")
          infoName = pivoName.split("NOMBRE")[1];
        }
        if (pivoAddres.includes("IMEI") === true) {
          infoAddress = pivoAddres.split("IMEI")[0];
          infoImei = pivoAddres.split("IMEI")[1];
          //console.log(infoAddress,"\n------------------cadena de direccion REAL------\n")
          //console.log(infoCel,"\n------------------cadena de celular REAL------\n")
        } else {
          infoAddress = pivoAddres;
          //console.log(infoAddress)
        }
        if (infoAddress.includes("PLATAFORMA") === true) {
          infoPlat = infoAddress.split("PLATAFORMA")[1];
          infoAddress = infoAddress.split("PLATAFORMA")[0];
          // console.log(infoAddress,"============adress")
          // console.log(infoPlat,"============plataforma")
        }
        if (infoPlat.includes("FECHA") === true) {
          infoFecha = infoPlat.split("FECHA")[1];
          infoPlat = infoPlat.split("FECHA")[0];
        }
        if (infoFecha.includes("ACTIVACIÓN")) {
          infoFecha = infoFecha.split("ACTIVACIÓN:")[1];
        }
      }
      let data = {
        complete_name: infoName.replace(/[^a-zA-Z ]/g, ""),
        residence: infoAddress, //.replace(/[^a-zA-Z ]\n/g, ""),
        formatted_address: infoAddress,
        activationDate: infoFecha.replace(/[^a-zA-Z ]\n/g, ""),
        plansName: infoPlat.replace(/[^a-zA-Z ]/g, ""),
        imsi: infoImei.replace(/[^a-zA-Z ]\n/g, ","),
        location: {},
      };

      const call = async () => {
        try {
          const dataAddress = data.residence
            .replace(":CALLE: ", "")
            .replace("COL: ", "")
            .replace("#", "")
            .replace(":", "")
            .replace(/\s+/g, "+");
          const llamada = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${dataAddress}&key=AIzaSyBpzIKk6MqsPjBmHDCpewQnqGi6wz_MiZc`
          );
          const { results } = await llamada.json();
          console.log(
            results[0],
            "============================================="
          );
          data.formatted_address = results[0].formatted_address;
          data.location = results[0].geometry.location;
          const cover = new Cover({
            historicId: this.historicId,
            taskRequestId: this.taskRequestId,
            name: data.complete_name,
            residence: data.residence,
            formatted_address: data.formatted_address,
            activationDate: data.activationDate,
            plansName: data.plansName,
            imsi: data.imsi,
            location: data.location,
          });
          console.log(cover, "recompose!! 💀");

          cover.save();
          resolve({ message: "Cover Id Created", payload: true });
        } catch (error) {
          reject({
            message: `Cant create cover module ${error}`,
            payload: error,
          });
          throw new Error(`no se ha podido enviar la peticion error: ${error}`);
        }
      };

      call();
    });
  }
}
