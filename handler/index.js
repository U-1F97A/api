const express = require("express");
const handler = express.Router();

handler.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

handler.use("/book", require("./book.js"));

module.exports = handler;
