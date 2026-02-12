const express = require("express");
const router = express.Router();

router.post("/framework-lead", async (req, res) => {

  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  // مؤقت — فقط لنتأكد أنه يعمل
  console.log("NEW LEAD:", name, email);

  return res.json({
    success: true
  });

});

module.exports = router;
