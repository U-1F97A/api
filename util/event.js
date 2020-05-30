const ics = require("ics");

exports.EventStruct = (title, description, start, duration) => {
  this.title;
  this.description;
  this.start;
  this.duration;
};

exports.structToJSON = (struct) => {
  return new Promise((resolve) => {
    minutes = struct.duration;
    var hour, min;
    if (minutes >= 60) {
      hour = Math.floor(minutes / 60);
      min = minutes % 60;
    }

    const e = {
      title: struct.title,
      description: struct.description,
      start: struct.start,
      duration: {
        hour: hour,
        min: min,
      },
    };

    return e;
  });
};

createDescription = (bookTitle, startPage, lastPage) => {
  return new Promise((resolve) => {
    description =
      "今日は" +
      bookTitle +
      "の" +
      startPage +
      "ページから" +
      lastPage +
      "ページまで読みましょう。";
    resolve(description);
  });
};

exports.createDescriptions = (bookTitle, pageCount, pagesPerDay, days) => {
  return new Promise((resolve) => {
    promiseArray = [];
    startPage = 1;

    for (let i = 0; i < days; i++) {
      if (i == days - 1) {
        promiseArray.push(createDescription(bookTitle, startPage, pageCount));
      } else {
        promiseArray.push(
          createDescription(bookTitle, startPage, startPage + pagesPerDay)
        );
      }
      startPage += pagesPerDay + 1;
    }

    Promise.all(promiseArray).then((descriptions) => {
      resolve(descriptions);
    });
  });
};
