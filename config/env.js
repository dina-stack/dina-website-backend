require("dotenv").config();

module.exports = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  activeCampaignToken: process.env.ACTIVE_CAMPAIGN_TOKEN
};
