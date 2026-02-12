const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhook.controller");

router.post(
  "/stripe",
  express.raw({ type: "*/*" }),
  webhookController.handleStripeWebhook
);

module.exports = router;

