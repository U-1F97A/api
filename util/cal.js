require("date-utils");

exports.getStartDate = (timeFrom) => {
  var now = new Date();
  now.setTime(now.getTime() + 9 * 60 * 60 * 1000); // JST

  FromHH = Number(timeFrom[0]);

  if (now.getHours() < FromHH) {
    return now; // from today
  } else {
    now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
    return now; // from tomorrow
  }
};
