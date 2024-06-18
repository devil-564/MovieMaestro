const express = require("express");
const jwt = require("jsonwebtoken");

const STRIPE_SECRET_KEY = 'sk_test_51O3sqDSBRqUrJNSPWTDUkMUYl8ib2yS4Jfe0qHgbLk5looZZNLa4R8hqP4D8bxO5RW89FrGPyfUBJrXQMr1DeTq200OqHJn90x';
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/charge", async(req, res) => {
    const token = req.header('auth-token')

    try {
      if (!token) {
        throw new Error("Please check the credentials");
      } 
  
    //   const data = jwt.verify(token, JWT_SEC_KEY);
    //   req.customer = data.isCustomer;  // Attach user information to the request object using req.customer
      console.log("Stripe Start")
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name
              },
              unit_amount: (item.price) * 100,
            },
            quantity: item.quantity
          }
        }),
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      })
  
    //   const save_pdf_purchase = await save_pdf(req.customer.id, session.id)
    //   res.json({ url: session.url, success: true })
    res.json({success : true, url : session.url})

    } catch (error) {
      res.status(401).send({ error });
    }
})

module.exports = router;