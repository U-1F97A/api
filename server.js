const parser = require("body-parser");
const express = require("express");
var morgan = require("morgan");

require("dotenv").config();

const handler = require("./handler");

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/", handler);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listen on " + port);
