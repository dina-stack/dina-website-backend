const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const axios = require("axios");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* ================= PAYMENT ================= */

router.post("/pay", async (req, res) => {
  try {
    const { paymentMethodId, name, email, addWorkbook } = req.body;

    if (!paymentMethodId || !email) {
      return res.json({ success:false, error:"Missing payment data" });
    }

    /* STRIPE */
    const amount = addWorkbook ? 4700 : 3700;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods:{
        enabled:true,
        allow_redirects:"never"
      },
      receipt_email: email,
      description: addWorkbook
        ? "Freedom Offer Formula + Workbook"
        : "Freedom Offer Formula"
    });

    if(paymentIntent.status !== "succeeded"){
      return res.json({ success:false, error:"Payment not completed" });
    }

    /* ACTIVECAMPAIGN (non-blocking) */
    try{

      const contact = await axios.post(
        "https://dinashakir.api-us1.com/api/3/contact/sync",
        { contact:{ email, firstName:name } },
        { headers:{
          "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
          "Content-Type":"application/json"
        }}
      );

      const contactId = contact.data.contact.id;

      await axios.post(
        "https://dinashakir.api-us1.com/api/3/contactLists",
        {
          contactList:{
            list:15,
            contact:contactId,
            status:1
          }
        },
        { headers:{
          "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
          "Content-Type":"application/json"
        }}
      );

      if(addWorkbook){
        await axios.post(
          "https://dinashakir.api-us1.com/api/3/contactTags",
          { contactTag:{ contact:contactId, tag:"5" }},
          { headers:{
            "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
            "Content-Type":"application/json"
          }}
        );
      }

    }catch(acErr){
      console.error("AC error:", acErr.response?.data || acErr.message);
    }

    return res.json({
      success:true,
      redirect:addWorkbook ? "/success-upsell" : "/success"
    });

  } catch(err){
    console.error("PAY ERROR:", err);
    return res.json({ success:false, error:"Server error" });
  }
});

module.exports = router;
