const products = require("../config/products");
const stripe = require("../services/stripe.service");

exports.pay = async (req, res) =>  {
  try {

    if (!stripe) {
      return res.status(503).json({
        message: "Payment service unavailable"
      });
    }
if (!req.body || !req.body.productId) {
  return res.status(400).json({
    message: "Product is required"
  });
}

    const productId = req.body.productId.trim();
const addUpsell = req.body.addUpsell ?? false;

    const product = products[productId];

    if (!product) {
      return res.status(400).json({
        message: "Invalid product"
      });
    }

    if (!product.price) {
      return res.status(500).json({
        message: "Product price is not configured"
      });
    }

    let amount = product.price;

    if (addUpsell) {

      if (productId !== "freedomOfferFormula") {
        return res.status(400).json({
          message: "Upsell is not allowed for this product"
        });
      }

      amount += products.workbookUpsell.price;
    }

   const paymentIntent = await stripe.paymentIntents.create({
  amount: amount,
  currency: product.currency,
  automatic_payment_methods: {
    enabled: true,
  },
});

res.json({
  success: true,
  redirect: "/thank-you/fof",

  metadata: {
    productId: productId,
    upsell: addUpsell ? "yes" : "no",
  },
});



    return res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {

    console.error("Payment Error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating payment"
    });
  }
};
