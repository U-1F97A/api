exports.getStartDate = (timeFrom) => {
  return new Promise((resolve) => {
    var now = new Date();
    now.setTime(now.getTime() + 9 * 60 * 60 * 1000); // JST

    FromHH = Number(timeFrom[0]);

    if (now.getHours() < FromHH) {
      resolve(now); // from today
    } else {
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
      resolve(now); // from tomorrow
    }
  });
};
