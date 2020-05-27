const express = require("express");
const app = express();

const router = require("./api/");
app.use("/", router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("listen on " + port);
