import bodyParser from "body-parser";
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";
import { Sequelize, QueryTypes } from "sequelize";
import db from "./models/index.js";
import paginate from "./paginate.js";

const app = express();
const port = 3000;

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure("views", {
	autoescape: true,
	express: app,
});

app.get("/", async (req, res) => {
	const [posts, pagination] = await paginate(db.Post, req.query.page, 20);

	// console.log(posts);

	res.render("index.njk", { posts, pagination });
});

app.get("/answer", (req, res) => {
	res.render("answer.njk", req.query);
});

app.post("/answer", (req, res) => {
	res.render("answer.njk", { ...req.body, ...req.query });
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
