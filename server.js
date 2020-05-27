const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hello World" });
});

app.listen(3000);
