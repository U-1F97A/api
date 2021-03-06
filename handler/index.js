const express = require("express");
const handler = express.Router();

handler.get("/", (req, res) => {
  res.status(200).json({ message: "allive" });
});
handler.get("/download", require("./download.js"));

handler.use("/book", require("./book.js"));
handler.use("/isbn", require("./isbn.js"));
handler.use("/genSchedule", require("./gensche.js"));

module.exports = handler;
