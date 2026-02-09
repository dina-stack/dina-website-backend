const Stripe = require("stripe");
const env = require("../config/env");
let stripe = null;

if (env.stripeSecretKey) {
  stripe = new Stripe(env.stripeSecretKey);
}

module.exports = stripe;
