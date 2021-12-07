const router = require("express").Router();
const controller = require("../controllers/pdfController");

router.post("/create-pdf", controller.createPdf);
router.get("/get-pdf", controller.fetchPdf);

module.exports = router;
