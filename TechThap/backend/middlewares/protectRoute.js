import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
	try {
		let userId;

		// Check if token is provided in the request headers
		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer ")) {
			const token = authHeader.split(" ")[1];
			// Verify token and extract user ID
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			userId = decoded.userId;
		} else {
			// If token is not provided in headers, check for cookie
			const token = req.cookies.jwt;
			// Verify token and extract user ID
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			userId = decoded.userId;
		}

		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		req.user = user;

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

export default protectRoute;
