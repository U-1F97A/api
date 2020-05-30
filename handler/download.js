const downloadService = require("../util/s3-download.js");

function download(req, res) {
  const { filename } = req.query;

  res.attachment(filename);

  downloadService(filename)
    .on("error", (err) => {
      res.status(500).send({ error: err });
    })
    .pipe(res);
}

module.exports = download;
