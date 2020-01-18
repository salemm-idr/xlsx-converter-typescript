import { converter } from "../controller/converter";
import express from "express";
const app = express();

export default app.post("/xfile", converter);
