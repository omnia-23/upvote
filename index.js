import express from "express";
import dotenv from "dotenv";
import { bootstrap } from "./bootstrap.js";
import { connectionToDB } from "./database/dbconnection.js";

const app = express();
const port = 3000;

dotenv.config();

connectionToDB();
bootstrap(app);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
