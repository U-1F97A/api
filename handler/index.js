const express = require("express");
const handler = express.Router();

handler.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

handler.use("/book", require("./book.js"));
handler.use("/isbn", require("./isbn.js"));

module.exports = handler;
