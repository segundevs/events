const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

const payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "USD",
    },
    (err, success) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(success);
      }
    }
  );
};
module.exports = { payment };
