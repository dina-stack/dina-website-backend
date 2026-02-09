const stripe = require("../services/stripe.service");
const products = require("../config/products");
const { fulfillOrder } = require("../services/fulfillment.service");

// مؤقت لمنع duplicate events (لاحقًا نستبدله ب database)
const processedEvents = new Set();

exports.handleStripeWebhook = async (req, res) => {

  let event;

  // ✅ التحقق أن الطلب من Stripe
  try {

    const sig = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {

    console.error("Invalid webhook signature");
    return res.status(400).send("Webhook Error");

  }

  // ✅ تجاهل أي event غير مهم
  if (event.type !== "payment_intent.succeeded") {
    return res.status(200).send("Event ignored");
  }

  const eventId = event.id;

  // ✅ منع التكرار
  if (processedEvents.has(eventId)) {
    return res.status(200).send("Already processed");
  }

  processedEvents.add(eventId);

  const paymentIntent = event.data.object;

  // ✅ تأكيد حالة الدفع
  if (paymentIntent.status !== "succeeded") {
    return res.status(200).send("Payment not completed");
  }

  const productId = paymentIntent.metadata.productId;
  const product = products[productId];

  if (!product) {
    console.error("Product not found");
    return res.status(400).send("Invalid product");
  }

  // ✅ التحقق من المبلغ
  if (paymentIntent.amount_received !== product.price) {

    console.error("Amount mismatch — possible tampering");

    return res.status(400).send("Invalid payment amount");
  }

  // ✅ لا ننتظر fulfillment حتى لا يتأخر الرد على Stripe
  fulfillOrder(paymentIntent);

  return res.status(200).send("Success");
};

