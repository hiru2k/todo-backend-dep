import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	const bearerToken = req.headers.authorization;

	if (!bearerToken) {
		res.status(401).send("Unauthorized");
	} else {
		try {
			const token = bearerToken.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.userId = decoded.id;
			next();
		} catch (error) {
			res.status(401).send("Unauthorized");
		}
	}
};

export default authMiddleware;
