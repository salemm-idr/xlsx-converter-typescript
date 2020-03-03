import xlsx, { WorkSheet, WorkBook } from "xlsx";
import filesystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";
import { Writable, WritableOptions, Transform } from "stream";

type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.join(__dirname, "..\\uploads");
interface toWrite {
  name: string;
  hojaAoA: unknown[];
}
export class FileCall {
  constructedSearch: [] = [];

  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }

  constructor() {}

  public async moveFile(xfile: any | object) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => console.log("moviendo archivo"), 200);
      if (typeof xfile === "object") {
        let Xfile = xfile.file;
        console.log(Xfile);
        if (FileCall.isUploaded(Xfile)) {
          Xfile.mv(`${directoryPath}\\${Xfile.name}`, err => {
            if (err) {
              console.log(err);
              reject(new Error("No se ha movido el archivo ⚠️"));
            } else resolve(Xfile.name);
          });
        }
      }
    });
  }

  public async readFilex(xfileName: string) {
    return new Promise<WorkBook>((resolve, reject) => {
      setTimeout(() => console.log("leyendo el  archivo ✊"), 200);

      console.log(xfileName, "en readfilex   🔧");
      let workbook: WorkBook = xlsx.readFile(`${directoryPath}\\${xfileName}`, {
        cellDates: true
      });
      if (workbook === undefined) {
        reject(new Error("no pueod leer el archivo"));
      } else resolve(workbook);
    });
  }

  public async constructWorkSheet(workbook: WorkBook) {
    return new Promise<object>((resolve, reject) => {
      setTimeout(() => console.log("construyendo sheet 🕵"), 200);

      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");

      let daFile = tabs.map((tab, index) => {
        let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data: (string | number)[] = xlsx.utils.sheet_to_json(worksheet, {
          header: 1
        });
        this.constructNewJson(data);
        // let data = xlsx.stream.to_json(worksheet, { header: 1 });
        toSave.name = tab;
        toSave.hojaAoA = data;
        return toSave;
      });

      resolve(daFile);
    });
  }

  public async writeJsonToFolder(wrote: any) {
    setTimeout(() => console.log("Escribiendo nuevo AoA 🖨"), 200);

    return new Promise<string>((resolve, reject) => {
      // let writeStreamer = filesystem.createWriteStream(
      //   `src\\outputs\\${wrote[0].name}.json`
      // );
      filesystem.writeFileSync(
        `src\\outputs\\${wrote[0].name}.json`,
        JSON.stringify(wrote[0].hojaAoA, null, 2)
      );

      resolve(wrote[0].name);
    }); //.then(name => this.constructNewJson(name));
  }

  public async constructNewJson(grabado: (string | number)[]) {
    setTimeout(() => console.log("constuyendo nuevo json"), 200);
    return new Promise((resolve, reject) => {
      //*version streamer
      // let myReadStream = filesystem.createReadStream(
      //   `src\\outputs\\${chunkName}.json`
      // );
      // let grabado = myReadStream.on("data", chunk => {
      //   console.log(chunk);
      //   return chunk;
      // });
      //*version readfile sync
      // let data = filesystem.readFileSync(
      //   `src\\outputs\\${chunkName}.json`,
      //   "utf8"
      // );
      //let grabado = JSON.parse(data);
      let dataWorked: any = [];
      grabado.forEach((element: any, index: number) => {
        const texted: any = element.map((innerText: string) => {
          if (typeof innerText === "string") {
            let recortado = innerText
              .toUpperCase()
              .trim()
              .replace(/t\r\n\s+/g, "");
            return recortado;
          }
        });
        if (texted.includes("TELEFONO") === true) {
          this.constructedSearch = texted;
          dataWorked = grabado.slice(index + 1);
          //return setTimeout(() => resolve(dataWorked), 600);
          return dataWorked;
        }
      });
      resolve(dataWorked);
    }).then(dataWorked => this.composeNewObject(dataWorked));
  }

  public async composeNewObject(dataWorked: any) {
    setTimeout(() => console.log("Armando json de escritura 🚧"), 200);

    return new Promise<object>((resolve, reject) => {
      let nodos: any[] = dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      //*stream version
      let myWriteStream = filesystem.createWriteStream(
        `src\\tiras\\stream.json`
      );
      let chunks = JSON.stringify(nodos, null, 2);
      myWriteStream.write(chunks);
      // filesystem.writeFileSync(
      //   `src\\tiras\\EXITO2callBack.json`,
      //   JSON.stringify(nodos, null, 2)
      // );

      console.log("grabando nuevo JSON ✍️");
      resolve(nodos);
    }); //.then(nodos => this.writeNewExcel(nodos));
  }
  public async writeNewExcel(nodos: object) {
    console.log("writefile entrance");
    return new Promise((resolve, reject) => {
      setTimeout(() => console.log("Escribe nuevo excel 👷"), 200);
      let stream = xlsx.stream.to_json(nodos, { raw: true });
      let conv = new Transform({ writableObjectMode: true });
      conv._transform = (obj, e, cb) => {
        cb(null, JSON.stringify(obj) + "\n");
      };
      stream.pipe(conv);
      conv.pipe(process.stdout);

      /**crea el libro de trabajo */
      const wb: WorkBook = xlsx.utils.book_new();
      /**nombre de la hoja string */
      const ws_name = "transformed";
      /**crea la hoja de trabajo */
      // let ws: WorkSheet = xlsx.stream.to_json();
      /**junta el libro creado con la hoja  */
      // xlsx.utils.book_append_sheet(wb, ws, ws_name);
      /**escribe el libro en la ruta especifica */
      //xlsx.writeFile(wb, "src\\constructedFile\\streamer.xlsx");

      resolve(wb);
    }); //.then(res => console.log("Todo se ha guarado con exito 🙉 🙈 🙊"));
  }

  //todo Eliminar las conexion de la lectura
  //todo agregar los nuevos paths para la escritura del json
  //todo mejorar la sintaxis de las variables
  //todo intentar escribir despues de eso el excel con el streamer del xlsx
  //todo intentar escribir el excel con el streamer de node
  //todohacer refactor del codigo y dejaro mas limpio
  //todo comentar las funciones y sintantic
  public async doitAll(name: string) {
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const constructedWorkSheet: object = await this.constructWorkSheet(filex);
    const writeJson = <string>(
      await this.writeJsonToFolder(constructedWorkSheet)
    );
    //const readJson = await this.readJsonFromFolder(writeJson);
    //const newTable = await this.constructNewJson(writeJson);
    //const newObject = await this.composeNewObject(newTable);
    //const newExcel = await this.writeNewExcel();
  }
}
