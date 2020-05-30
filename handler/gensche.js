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

  var startDate;
  var minPer1Page = "1";
  var pagePerDay = "1";
  var duration = "1";

  gba
    .getBookInfoWithTitle(karte.bookTitle)
    .then((result) => {
      bookInfo.title = result.items[0].volumeInfo.title;
      bookInfo.pageCount = result.items[0].volumeInfo.pageCount;
      bookInfo.picture = result.items[0].volumeInfo.imageLinks.thumbnail;

      cal
        .getHowManyDaysToRead(bookInfo.pageCount, pagePerDay)
        .then((result) => {
          duration = result;
        });
    })
    .catch((data) => {
      res.status(500);
    });

  cal
    .getHowManyMinToRead1Page(
      minPer1Page,
      karte.base,
      karte.level,
      karte.habit,
      karte.goodAt
    )
    .then((result) => {
      minPer1Page = result;
    });

  cal.getPagePerDay(karte.maxPerDay, minPer1Page).then((result) => {
    pagePerDay = result;
  });

  cal.getStartDate(karte.timeFrom).then((result) => {
    startDate = result;
  });

  res.status(200).end();
});

module.exports = handler;
