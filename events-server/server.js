const express = require("express");
const stripeRoute = require("./routes/stripe");
const receiptRoute = require("./routes/receipt");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", stripeRoute);
app.use("/api", receiptRoute);

app.listen(port, (req, res) => {
  console.log("Listening on port 5000");
});
