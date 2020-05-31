const s3d = require("../util/s3-download.js");

function download(req, res) {
  console.log(req.body);

  const filename = req.query.name;

  res.attachment(filename);

  s3d
    .download(filename)
    .on("error", (err) => {
      res.status(500).send({ error: err });
    })
    .pipe(res);
}

module.exports = download;
