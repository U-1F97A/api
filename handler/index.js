const express = require("express");
const handler = express.Router();

handler.get("/", function (req, res) {
  res.status(200).json({ message: "Hello World" });
});

module.exports = handler;
