import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Unauthorized");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }
};

export default authMiddleware;
