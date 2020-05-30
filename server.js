const express = require("express");
const parser = require("body-parser");

require("dotenv").config();

const handler = require("./handler");

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use("/", handler);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listen on " + port);
