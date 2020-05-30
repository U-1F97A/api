const request = require("request");

const GBA_URL = "https://www.googleapis.com/books/v1/volumes";

exports.getBookInfoWithTitle = (booktitle) => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: GBA_URL,
        qs: {
          q: booktitle,
        },
      },
      (err, req, data) => {
        if (err) reject(JSON.parse(data));
        resolve(JSON.parse(data));
      }
    );
  });
};

exports.getBookInfoWithIsbn = (isbn) => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        uri: GBA_URL,
        qs: {
          q: isbn,
        },
      },
      (err, req, data) => {
        if (err) reject(JSON.parse(data));
        resolve(JSON.parse(data));
      }
    );
  });
};
