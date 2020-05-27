const express = require("express");
const request = require("request");

const handler = express.Router();
const GBA_URL = "https://www.googleapis.com/books/v1/volumes";

handler.post("/", (req, res) => {
  var booktitle = req.body.booktitle;
  getbookapi(booktitle).then((data) => {
    res.status(200).json({
      title: data.items[0].volumeInfo.title,
      pageCount: data.items[0].volumeInfo.pageCount,
      picture: data.items[0].volumeInfo.imageLinks.thumbnail,
    });
  });
});

function getbookapi(booktitle) {
  return new Promise((resolve) => {
    request.get(
      {
        uri: GBA_URL,
        qs: {
          q: booktitle,
        },
      },
      (err, req, data) => {
        resolve(JSON.parse(data));
      }
    );
  });
}

module.exports = handler;
