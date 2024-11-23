import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Check if res object is defined (for web environment)
  if (res) {
    // Set cookie in web environment
    res.cookie("jwt", token, {
      httpOnly: true, // more secure
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: "strict", // CSRF
    });
  }

  // Return the token
  return token;
};

export default generateTokenAndSetCookie;
