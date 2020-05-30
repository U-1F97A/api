const express = require("express");
const gba = require("../util/gba.js");
const cal = require("../util/cal.js");
const eve = require("../util/event.js");

const handler = express.Router();

// bodyにあるJSON
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

handler.post("/", async (req, res) => {
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

  var startDate = new Date();
  var minutesPerPage = "1";
  var pagesPerDay = "1";
  var days = "1";

  await gba
    .getBookInfoWithTitle(karte.bookTitle)
    .then((result) => {
      bookInfo.title = result.items[0].volumeInfo.title;
      bookInfo.pageCount = result.items[0].volumeInfo.pageCount;
      bookInfo.picture = result.items[0].volumeInfo.imageLinks.thumbnail;
    })
    .catch((data) => {
      res.status(500);
    });

  await cal
    .getMinutesPerPage(
      minutesPerPage,
      karte.base,
      karte.level,
      karte.habit,
      karte.goodAt
    )
    .then((result) => {
      minutesPerPage = result;
    });

  await cal.getPagePerDay(karte.maxPerDay, minutesPerPage).then((result) => {
    pagesPerDay = result;
  });

  await cal
    .getHowManyDaysToRead(bookInfo.pageCount, pagesPerDay)
    .then((result) => {
      days = result;
    });

  await cal.getStartDate(karte.timeFrom).then((result) => {
    startDate = result;
  });

  eventTitle = bookInfo.title;
  descriptions = [];
  starts = [];
  events = [];

  await eve
    .createDescriptions(bookInfo.title, bookInfo.pageCount, pagesPerDay, days)
    .then((result) => {
      descriptions = result;
    });

  await eve
    .createStarts(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      parseInt(karte.timeFrom[0]),
      parseInt(karte.timeFrom[1]),
      days
    )
    .then((result) => {
      starts = result;
    });

  await eve
    .createEvents(eventTitle, days, descriptions, starts, karte.maxPerDay)
    .then((result) => {
      events = result;
    });

  res.status(200).end();
});

module.exports = handler;
