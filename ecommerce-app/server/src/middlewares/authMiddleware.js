import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * @description Middleware to protect routes by verifying JWT token.
 * If the token is valid, it attaches the user's information (excluding password) to the request object.
 * Otherwise, it sends a 401 Unauthorized response.
 */
export const protectRoute = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Get user from the token's ID and attach to request object
      // We use `decoded.userId` because that's what's set during token generation in authController.js
      // Exclude password from the user object attached to req
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        // If user associated with token is not found (e.g., deleted account)
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Authentication error:", error.message);
      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Not authorized, token is invalid" });
      }
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Not authorized, token has expired" });
      }
      // Generic server error for other issues
      return res
        .status(500)
        .json({ message: "Server error during authentication" });
    }
  }

  // If no token is found in the Authorization header or it's not in 'Bearer' format
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};
