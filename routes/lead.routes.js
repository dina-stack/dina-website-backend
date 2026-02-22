const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/framework-lead", async (req,res)=>{
  try{

    const {email,name} = req.body;

    const contact = await axios.post(
      "https://dinashakir.api-us1.com/api/3/contact/sync",
      { contact:{ email, firstName:name }},
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
          list:16,
          contact:contactId,
          status:1
        }
      },
      { headers:{
        "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
        "Content-Type":"application/json"
      }}
    );

    res.json({success:true});

  }catch(err){
    console.error("Framework lead error:", err.response?.data || err.message);
    res.json({success:false});
  }
});

router.post("/freedom-waitlist", async (req,res)=>{
  try{

    const {email,name} = req.body;

    const contact = await axios.post(
      "https://dinashakir.api-us1.com/api/3/contact/sync",
      { contact:{ email, firstName:name }},
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
          list:17,   // ← مهم جداً
          contact:contactId,
          status:1
        }
      },
      { headers:{
        "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
        "Content-Type":"application/json"
      }}
    );

    res.json({success:true});

  }catch(err){
    console.error("Freedom waitlist error:", err.response?.data || err.message);
    res.json({success:false});
  }
});

router.post("/contact-lead", async (req,res)=>{
  try{

    const {email,name,subject,message} = req.body;

    const contact = await axios.post(
      "https://dinashakir.api-us1.com/api/3/contact/sync",
      { contact:{ email, firstName:name }},
      { headers:{
        "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
        "Content-Type":"application/json"
      }}
    );

    const contactId = contact.data.contact.id;

    // ADD TO LIST 18
    await axios.post(
      "https://dinashakir.api-us1.com/api/3/contactLists",
      {
        contactList:{
          list:18,
          contact:contactId,
          status:1
        }
      },
      { headers:{
        "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
        "Content-Type":"application/json"
      }}
    );

    // OPTIONAL: save message as note inside AC
    await axios.post(
      "https://dinashakir.api-us1.com/api/3/notes",
      {
        note:{
          note:`Subject: ${subject}\nMessage: ${message}`,
          relid:contactId,
          reltype:"Subscriber"
        }
      },
      { headers:{
        "Api-Token":process.env.ACTIVE_CAMPAIGN_TOKEN,
        "Content-Type":"application/json"
      }}
    );

    res.json({success:true});

  }catch(err){
    console.error("Contact lead error:", err.response?.data || err.message);
    res.status(500).json({success:false});
  }
});


module.exports = router;
