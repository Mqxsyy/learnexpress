import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.post("/answers", (req, res) => {
	res.send(req.body);
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
