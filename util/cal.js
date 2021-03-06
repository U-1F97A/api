exports.getStartDate = (timeFrom) => {
  return new Promise((resolve) => {
    var now = new Date();

    var FromHH = Number(timeFrom[0]);

    if (now.getHours() < FromHH) {
      resolve(now); // from today
    } else {
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
      resolve(now); // from tomorrow
    }
  });
};

exports.getMinutesPerPage = (defmin, base, level, habit, goodAt) => {
  return new Promise((resolve) => {
    var diff = 1;
    switch (base - level) {
      case -2 || -1:
        diff = 0.2;
        break;
      case 0:
        diff = 0.3;
        break;
      case 1:
        diff = 0.4;
        break;
      case 2:
        diff = 0.45;
        break;
    }
    var power = 1;
    switch (habit * goodAt) {
      case 0:
        power = 0.3;
        break;
      case 1:
        power = 0.35;
        break;
      case 2:
        power = 0.45;
        break;
      case 4:
        power = 0.5;
        break;
    }
    resolve(defmin * (diff + power));
  });
};

exports.getPagePerDay = (minutesPerDay, minutesPerPage) => {
  return new Promise((resolve) => {
    resolve(Math.ceil(minutesPerDay / minutesPerPage));
  });
};

exports.getHowManyDaysToRead = (pageCount, pagePerDay) => {
  return new Promise((resolve) => {
    resolve(Math.ceil(pageCount / pagePerDay));
  });
};
