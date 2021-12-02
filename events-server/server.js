const express = require("express");

const app = express();

app.listen("5000", (req, res) => {
  console.log("Listening on port 5000");
});
