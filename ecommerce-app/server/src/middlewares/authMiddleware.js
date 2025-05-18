import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * @description Middleware to protect routes by verifying JWT token.
 * If the token is valid, it attaches the user's information (excluding password) to the request object.
 * Otherwise, it sends a 401 Unauthorized response.
 */
export const protectRoute = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //  Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Exclude password from the user object attached to req
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        // If user associated with token is not found (e.g., deleted account)
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
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

  // If no token is found in the Authorization header
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};
