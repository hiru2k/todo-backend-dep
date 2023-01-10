import { Router } from "express";
import authService from "../services/auth.service";
import usersService from "../services/users.service";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);

    if (!result) {
      res.status(401).send("Invalid credentials");
    } else {
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
});

authRouter.get("/", async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersService.getUser(decoded.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

export default authRouter;
