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
router.get("/start/thank-you", (req, res) => {
  res.sendFile(path.join(root, "start", "thank-you.html"));
});

// STEP 2 (upsell bridge)  ✅ FIXED URL STRUCTURE
router.get("/start/step-2", (req, res) => {
  res.sendFile(path.join(root, "start", "step-2.html"));
});

router.get("/fof/wb-thankyou", (req, res) => {
  res.sendFile(path.join(root, "shop", "FoF", "WB-thankyou", "index.html"));
});

// SHOP
router.get("/shop", (req, res) => {
  res.sendFile(path.join(root, "shop", "index.html"));
});

// WORK WITH ME
router.get("/work-with-me", (req, res) => {
  res.sendFile(path.join(root, "work-with-me", "index.html"));
});

// TERMS
router.get("/terms_conditions", (req, res) => {
  res.sendFile(path.join(root, "terms_conditions.html"));
});

// PRIVACY
router.get("/privacy_policy", (req, res) => {
  res.sendFile(path.join(root, "privacy_policy.html"));
});

// Freedom Offer Formula  (بدون تغيير اسم فولدر FoF.html)
router.get("/fof", (req, res) => {
  res.sendFile(path.join(root, "shop", "FoF.html", "index.html"));
});


// Freedom Engine
router.get("/freedom-engine", (req, res) => {
  res.sendFile(path.join(root, "shop", "freedom-engine", "index.html"));
});

// FOOTER PARTIAL
router.get("/footer", (req, res) => {
  res.sendFile(path.join(root, "footer.html"));
});

module.exports = router;
