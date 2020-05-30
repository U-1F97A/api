const express = require("express");
const gba = require("../util/gba.js");
const cal = require("../util/cal.js");
const eve = require("../util/event.js");
const s3u = require("../util/s3-upload.js");

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

  karte.timeFrom = [
    parseInt(karte.timeFrom[0]) - 9,
    parseInt(karte.timeFrom[1]),
  ];

  var bookInfo = {
    title: "",
    pageCount: -1,
    picture: "url",
  };

  var startDate = new Date();
  var minutesPerPage = "1";
  var pagesPerDay = "1";
  var days = "1";

  var eventTitle = bookInfo.title;
  var descriptions = [];
  var starts = [];
  var events = [];
  var icspath = "./temp/file.ics";
  var filename =
    days.toString() + "days" + karte.bookTitle.replace(" ", "-") + ".ics";

  await gba
    .getBookInfoWithTitle(karte.bookTitle)
    .then((result) => {
      bookInfo.title = result.items[0].volumeInfo.title;
      bookInfo.pageCount = result.items[0].volumeInfo.pageCount;
      bookInfo.picture = result.items[0].volumeInfo.imageLinks.thumbnail;
      eventTitle = bookInfo.title;
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

  await eve.genICSfile(events, icspath).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  await s3u
    .upload(filename, icspath)
    .then(() => {
      res.status(200).json({
        s3URL: "https://u-1f97a-api.glitch.me/download?name=" + filename,
        comment:
          "問診の結果から、あなたは毎日" +
          karte.maxPerDay.toString() +
          "分の時間を確保し、その時間に" +
          pagesPerDay.toString() +
          "ページ読むことができると推測しました。この本は" +
          bookInfo.pageCount.toString() +
          "ページあるので、" +
          days.toString() +
          "日で読み終わる計算です。このスケジュールを記述した .ics ファイルを作成しました。ぜひご活用ください。",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = handler;
