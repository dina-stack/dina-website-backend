const express = require("express");
const router = express.Router();
const path = require("path");

const root = path.join(__dirname, "..");

// HOME
router.get("/", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

// START (lead magnet page)
router.get("/start", (req, res) => {
  res.sendFile(path.join(root, "start", "index.html"));
});

// THANK YOU — lead magnet
router.get("/thankyou-framework", (req, res) => {
  res.sendFile(path.join(root, "start", "thank-you.html"));
});

// STEP 2 (upsell bridge)
router.get("/step-2", (req, res) => {
  res.sendFile(path.join(root, "start", "step-2.html"));
});

// SHOP
router.get("/shop", (req, res) => {
  res.sendFile(path.join(root, "shop", "index.html"));
});

// WORK WITH ME
router.get("/work-with-me", (req, res) => {
  res.sendFile(path.join(root, "work-with-me", "index.html"));
});

module.exports = router;

