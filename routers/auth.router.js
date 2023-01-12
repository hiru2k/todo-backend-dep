import { Router } from "express";
import authService from "../services/auth.service";
import usersService from "../services/users.service";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware";

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

authRouter.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await usersService.getUser(req.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

export default authRouter;
