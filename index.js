import bodyParser from "body-parser";
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";
import { Sequelize, QueryTypes } from "sequelize";

const app = express();
const port = 3000;

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure("views", {
	autoescape: true,
	express: app,
});

app.get("/", async (req, res) => {
	const sequelize = new Sequelize({
		dialect: "sqlite",
		storage: "db.sqlite",
	});

	const posts = await sequelize.query("SELECT * FROM `posts`", {
		type: QueryTypes.SELECT,
	});

	console.log(posts);

	res.render("index.njk");
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
