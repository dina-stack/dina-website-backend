require("dotenv").config();

const express = require("express");
const app = express();


// routes
const webhookRoutes = require("./routes/webhook.routes");
app.use("/webhook", webhookRoutes);

const pagesRoutes = require("./routes/pages.routes");
app.use("/", pagesRoutes);

const paymentRoutes = require("./routes/payment.routes");
app.use("/", paymentRoutes);

const leadRoutes = require("./routes/lead.routes");
app.use("/", leadRoutes);

// error handler
const errorMiddleware = require("./middlewares/error.middleware");
app.use(errorMiddleware);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// middleware
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

