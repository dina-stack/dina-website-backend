require("dotenv").config();

const express = require("express");

const app = express();
const webhookRoutes = require("./routes/webhook.routes");
app.use("/webhook", webhookRoutes);

app.use(express.json());

const pagesRoutes = require("./routes/pages.routes");
app.use("/", pagesRoutes);

const paymentRoutes = require("./routes/payment.routes");
app.use("/", paymentRoutes);



const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use("/webhook", webhookRoutes);

const errorMiddleware = require("./middlewares/error.middleware");
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

