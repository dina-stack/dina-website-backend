require("dotenv").config();

const express = require("express");
const app = express();

// middleware
app.use(express.json());

// routes
const webhookRoutes = require("./routes/webhook.routes");
app.use("/webhook", webhookRoutes);

const pagesRoutes = require("./routes/pages.routes");
app.use("/", pagesRoutes);

const paymentRoutes = require("./routes/payment.routes");
app.use("/", paymentRoutes);

const pagesRoutes = require("./routes/pages.routes");
app.use("/", pagesRoutes);

// error handler
const errorMiddleware = require("./middlewares/error.middleware");
app.use(errorMiddleware);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

