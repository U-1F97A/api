const s3Client = require("./s3-client.js");

function download(filename) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  return s3Client.getObject(params).createReadStream();
}

module.exports = download;
