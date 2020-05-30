const express = require("express");
const gba = require("../domain/gba.js");

const handler = express.Router();

handler.get("/", (req, res) => {
  res.status(200).json({
    message: "hoge",
  });
});

handler.post("/", (req, res) => {
  var isbn = req.body.isbn;
  gba.getBookInfoWithIsbn(isbn).then((data) => {
    res.status(200).json({
      title: data.items[0].volumeInfo.title,
      pageCount: data.items[0].volumeInfo.pageCount,
      picture: data.items[0].volumeInfo.imageLinks.thumbnail,
    });
  });
});

module.exports = handler;
