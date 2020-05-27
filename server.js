const express = require("express");
const parser = require("body-parser");

const router = require("./api/");

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use("/", router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listen on " + port);
