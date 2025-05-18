// server/controllers/paymentController.js
import Stripe from "stripe";

// Initialize Stripe with your secret key
// Ensure STRIPE_SECRET_KEY is set in your .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { cartItems } = req.body; // Expect an array of cart items

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Ensure your FRONTEND_URL is correctly set in your .env for success/cancel URLs
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  try {
    const line_items = cartItems.map((item) => {
      // Validate item structure and price
      if (
        typeof item.price !== "number" ||
        item.price <= 0 ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        throw new Error(`Invalid item price or quantity for ${item.title}`);
      }
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            // Stripe allows only one image URL for product_data.images
            // If item.image is an array, take the first one. If it's a string, use it.
            images: [
              typeof item.image === "string"
                ? item.image
                : Array.isArray(item.image) && item.image.length > 0
                  ? item.image[0]
                  : "https://via.placeholder.com/100?text=No+Image",
            ],
          },
          unit_amount: Math.round(item.price * 100), // Price in cents
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: `${frontendUrl}/payment-success`, // Redirect URL after successful payment
      cancel_url: `${frontendUrl}/cart`, // Redirect URL if payment is cancelled
      // For shipping address collection (optional)
      // shipping_address_collection: {
      //   allowed_countries: ['US', 'CA'], // Example countries
      // },
    });

    res.status(200).json({ url: session.url }); // Send the session URL to the frontend
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create checkout session" });
  }
};
