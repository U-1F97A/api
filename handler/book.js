const express = require("express");
const gba = require("../domain/gba.js");

const handler = express.Router();

handler.post("/", (req, res) => {
  var booktitle = req.body.booktitle;
  gba
    .getBookInfoWithTitle(booktitle)
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
