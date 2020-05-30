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
