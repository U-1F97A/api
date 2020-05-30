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

createStart = (Year, Month, Date, Hour, Minute) => {
  return new Promise((resolve) => {
    start = [Year, Month, Date, Hour, Minute];
    resolve(start);
  });
};

exports.createStarts = (Year, Month, Date, Hour, Minute, days) => {
  return new Promise((resolve) => {
    promiseArray = [];

    for (let i = 0; i < days; i++) {
      promiseArray.push(createStart(Year, Month, Date, Hour, Minute));

      Date += 1;
      if (Month == 12 && Date == 31) {
        Year += 1;
        Month = 1;
        Date = 1;
      } else if (
        (Year % 4 == 0 && Month == 2 && Date == 30) ||
        (Month == 2 && Date == 29) ||
        ((Month == 4 || Month == 6 || Month == 9 || Month == 11) &&
          Date == 31) ||
        Date == 32
      ) {
        Month += 1;
        Date = 1;
      }
    }

    Promise.all(promiseArray).then((starts) => {
      resolve(starts);
    });
  });
};
