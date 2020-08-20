require('dotenv').config()
import express, { Application } from "express";
import path from "path";
import Api from "./routes/Api";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

// "mongodb://salemm:salemm2018@ds023603.mlab.com:23603/caska-db"
//mongodb://salemm:salemm2018@ds159527.mlab.com:59527/xlsxconverter
//mongodb+srv://salemm:salemmidr2020@xlsxconverter.rjbpw.mongodb.net/test
//loca    "mongodb://localhost:27017/xfileBigSheet"
mongoose
.connect("mongodb+srv://salemm:salemmidr2020@xlsxconverter.rjbpw.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(x => {console.log(
    `Conectado a mongo database 🔽  named: ${x.connections[0].name}`
  )
  })
  .catch(error => {
    console.error("Error conectado con la base Mongo ❌", error)
  })
  
const app: express.Express = express();
//app.use(fileUpload({ debug: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  //  tempFileDir: "src/uploads"
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(function(req, res, next) {
  //allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
//*Give the power to initialize all the routes go for it on ./routes/Api.ts
Api.initialize(app);

app.use(express.static(path.join(__dirname, "dist")));

app.listen(process.env.PORT, () => {
  console.log(`ready for action on ${process.env.PORT} 🚀 🔥`);
});
