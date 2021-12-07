const pdf = require("html-pdf");
const template = require("../documents/receiptTemplate");
const path = require("path");

const createPdf = (req, res) => {
  pdf.create(template(req.body, {})).toFile("receipt.pdf", (err, success) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.status(200).json(success);
    }
  });
};

const fetchPdf = (req, res) => {
  let rootPath = path.join(__dirname, "../");
  res.sendFile(`${rootPath}/receipt.pdf`);
};

module.exports = { createPdf, fetchPdf };
