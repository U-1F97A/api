const express = require("express");
const request = require("request");

const handler = express.Router();
const GBA_URL = "https://www.googleapis.com/books/v1/volumes";

handler.get("/", (req, res) => {
  res.status(200).json({
    message: "hoge",
  });
});

handler.post("/", (req, res) => {
  var isbn = req.body.isbn;
  getbookapi(isbn).then((data) => {
    res.status(200).json({
      title: data.items[0].volumeInfo.title,
      pageCount: data.items[0].volumeInfo.pageCount,
      picture: data.items[0].volumeInfo.imageLinks.thumbnail,
    });
  });
});

function getbookapi(isbn) {
  return new Promise((resolve) => {
    request.get(
      {
        uri: GBA_URL,
        qs: {
          q: isbn,
        },
      },
      (err, req, data) => {
        resolve(JSON.parse(data));
      }
    );
  });
}

module.exports = handler;
