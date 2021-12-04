const router = require("express").Router();
const controller = require("../controllers/stripeController");

router.post("/payment", controller.payment);

module.exports = router;
