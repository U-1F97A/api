const express = require("express");
const gba = require("../util/gba.js");
const cal = require("../util/cal.js");

const handler = express.Router();

// {
//   "bookTitle": "本のタイトル(string)",
//   "purpose": "目的とか(string)",
//   "base": "ない:0, 多少ある:1, ある:2(integer)",
//   "level": "0からの入門:0, 入門:1, 応用:2(integer)",
//   "habit": "読まない:0, たまに読む:1, 読む:1(integer)",
//   "goodAt": "苦手:0, 苦手ではない:1, 得意:2",
//   "timeFrom": "HH:MM(string)",
//   "maxPerDay": "n(integer)"
// }

handler.post("/", (req, res) => {
  var karte = {
    bookTitle: req.body.bookTitle,
    purpose: req.body.purpose,
    base: req.body.base,
    level: req.body.level,
    goodAt: req.body.goodAt,
    timeFrom: req.body.timeFrom.split(":"),
    maxPerDay: req.body.maxPerDay,
  };

  var bookInfo = {
    title: "",
    pageCount: -1,
    picture: "url",
  };

  cal
    .getHowManyMinToRead1Page(
      1,
      karte.base,
      karte.level,
      karte.habit,
      karte.goodAt
    )
    .then((minPer1Page) => {
      console.log(minPer1Page);
    });

  cal.getStartDate(karte.timeFrom).then((now) => {
    console.log(now);
  });

  gba
    .getBookInfoWithTitle(karte.bookTitle)
    .then((data) => {
      bookInfo.title = data.items[0].volumeInfo.title;
      bookInfo.pageCount = data.items[0].volumeInfo.pageCount;
      bookInfo.picture = data.items[0].volumeInfo.imageLinks.thumbnail;
    })
    .catch((data) => {
      res.status(500);
    });

  res.status(200).end();
});

module.exports = handler;
