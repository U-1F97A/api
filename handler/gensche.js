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

  var minPer1Page = "1";
  var pagePerDay = "1";
  var duration = "1";

  gba
    .getBookInfoWithTitle(karte.bookTitle)
    .then((data) => {
      bookInfo.title = data.items[0].volumeInfo.title;
      bookInfo.pageCount = data.items[0].volumeInfo.pageCount;
      bookInfo.picture = data.items[0].volumeInfo.imageLinks.thumbnail;
      console.log("## book info");
      console.log(bookInfo);

      cal
        .getHowManyDaysToRead(bookInfo.pageCount, pagePerDay)
        .then((result) => {
          console.log("## duration");
          console.log(result + " days");
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
      console.log("## min / 1page");
      console.log(result);
      minPer1Page = result;
    });

  cal.getPagePerDay(karte.maxPerDay, minPer1Page).then((result) => {
    console.log("## page / day");
    console.log(result);
    pagePerDay = result;
  });

  cal.getStartDate(karte.timeFrom).then((now) => {
    console.log("## start day");
    console.log(now);
  });

  res.status(200).end();
});

module.exports = handler;
