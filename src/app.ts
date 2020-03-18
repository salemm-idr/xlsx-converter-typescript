import express, { Application } from "express";
import path from "path";
import Api from "./routes/Api";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
const app: express.Express = express();
//app.use(fileUpload({ debug: true }));
app.use(
  fileUpload({
    // useTempFiles: true,
    // tempFileDir: "uploads"  //para windows /uploads/
  })
);
app.use(bodyParser.json());
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

app.listen(4200, () => {
  console.log(`ready for action on port 4200  🚀 🔥`);
});
