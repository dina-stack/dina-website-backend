const products = require("../config/products");

exports.fulfillOrder = async (paymentIntent) => {

  const productId = paymentIntent.metadata.productId;
  const product = products[productId];

  if (!product) {
    console.error("Product not found during fulfillment");
    return;
  }

  console.log("🚚 Fulfilling:", product.deliverable);

};
