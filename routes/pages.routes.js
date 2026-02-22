const express = require("express");
const router = express.Router();
const path = require("path");

const root = path.join(__dirname, "..");

/* ================= HOME ================= */

router.get("/", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

/* ================= START FUNNEL ================= */

router.get("/start", (req, res) => {
  res.sendFile(path.join(root, "start", "index.html"));
});

router.get("/start/thank-you", (req, res) => {
  res.sendFile(path.join(root, "start", "thank-you.html"));
});

router.get("/start/step-2", (req, res) => {
  res.sendFile(path.join(root, "start", "step-2.html"));
});

/* ================= SHOP ================= */

router.get("/shop", (req, res) => {
  res.sendFile(path.join(root, "shop", "index.html"));
});

/* ================= WORK WITH ME ================= */

router.get("/work-with-me", (req, res) => {
  res.sendFile(path.join(root, "work-with-me", "index.html"));
});

/* ================= LEGAL ================= */

router.get("/terms_conditions", (req, res) => {
  res.sendFile(path.join(root, "terms_conditions.html"));
});

router.get("/privacy_policy", (req, res) => {
  res.sendFile(path.join(root, "privacy_policy.html"));
});

/* ================= FOF ================= */

router.get("/fof", (req, res) => {
  res.sendFile(path.join(root, "shop", "FoF.html", "index.html"));
});

router.get("/fof/thank_you", (req, res) => {
  res.sendFile(path.join(root, "shop", "FoF.html", "Thank_you.html"));
});

router.get("/fof/wb_thankyou", (req, res) => {
  res.sendFile(path.join(root, "shop", "FoF.html", "WB-thankyou.html"));
});

/* ================= FREEDOM ENGINE ================= */

router.get("/freedom-engine", (req, res) => {
  res.sendFile(path.join(root, "shop", "freedom-engine", "index.html"));
});

router.get("/freedom-engine/thank_you", (req, res) => {
  res.sendFile(path.join(root, "shop", "freedom-engine", "Thank_you.html"));
});

/* ================= CONTACT ================= */

router.get("/contact", (req, res) => {
  res.sendFile(path.join(root, "contact", "index.html"));
});

router.get("/contact/thank_you", (req, res) => {
  res.sendFile(path.join(root, "contact", "Thank_you.html"));
});

/* ================= FOOTER PARTIAL ================= */

router.get("/footer", (req, res) => {
  res.sendFile(path.join(root, "footer.html"));
});

module.exports = router;