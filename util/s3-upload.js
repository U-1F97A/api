const s3Client = require("./s3-client.js");
const fs = require("fs");

exports.upload = (filename, icspath) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
    };

    fileStream = fs.createReadStream(icspath);
    fileStream.on("error", (err) => {
      reject(err);
    });

    params.Body = fileStream;

    s3Client.putObject(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
