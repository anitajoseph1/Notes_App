// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer token"

  if (!authHeader) {
    return res.status(401).json({ message: "No token, auth denied" });
  }

  const token = authHeader.split(" ")[1]; // after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "No token, auth denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // we set { id: user._id } when logging in
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
