import express from "express";
import Stripe from "stripe";

const router = express.Router();

// ✅ Stripe instance
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// ✅ CREATE CHECKOUT SESSION
router.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        message: "Payment service not configured",
      });
    }

    const { packageId, name, price } = req.body;

    // ✅ Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Package name or price missing",
      });
    }

    // ✅ Convert to paise
    const amountInPaise = Math.round(price * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],

      // ✅ IMPORTANT: Save ID for receipt & DB
      metadata: {
        packageId: packageId || "N/A",
        packageName: name,
        price: price,
      },

      // ✅ MUST INCLUDE session_id
      success_url:
        "http://localhost:5173/role/tourist/payment/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "http://localhost:5173/role/tourist/payment/cancel",
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Payment session creation failed",
    });
  }
});

export default router;
