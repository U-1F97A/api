const express = require("express");
const gba = require("../util/gba.js");

const handler = express.Router();

handler.post("/", (req, res) => {
  console.log(req.body);

  var isbn = req.body.isbn;
  gba
    .getBookInfoWithIsbn(isbn)
    .then((data) => {
      res.status(200).json({
        title: data.items[0].volumeInfo.title,
        pageCount: data.items[0].volumeInfo.pageCount,
        picture: data.items[0].volumeInfo.imageLinks.thumbnail,
      });
    })
    .catch((data) => {
      res.status(500).json(data);
    });
});

module.exports = handler;
