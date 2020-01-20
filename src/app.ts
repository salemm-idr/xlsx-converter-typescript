import express, { Application, Response, Request } from "express";
import path from "path";
import { json, urlencoded, raw, text } from "body-parser";
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname));
const directoryPath: string = path.join(__dirname, "uploads");
const directoryOut: string = path.join(__dirname, "outputs");
const transformedJson: string = path.join(__dirname, "transformed");
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
//app.use("/api", converter);
app.use(express.static(path.join(__dirname, "dist")));

app.listen(4200, () => {
  console.log(`ready for action on port 4200  🔪 && 🔥`);
});
