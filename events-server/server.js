const express = require("express");
const stripeRoute = require("./routes/stripe");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", stripeRoute);

app.listen(port, (req, res) => {
  console.log("Listening on port 5000");
});
