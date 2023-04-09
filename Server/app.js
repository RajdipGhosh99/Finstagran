const express = require("express");
require("dotenv").config();
const mongoose = require("./DBmodule/dbCon");
const { json } = require("body-parser");
const app = express();
const cors = require("cors");
const userController = require("./Routes/User/index");
const postsController = require("./Routes/Posts/index");

const errorHandler = require("./Middleware/errorHandler");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.send("Hello Express!");
});

app.use("/user", userController);
app.use("/post", postsController);

errorHandler(app);

app.listen(process.env.PORT, () =>
	console.log(`app is running on port ${process.env.PORT} 🔥`),
);
