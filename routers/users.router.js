import { Router } from "express";
import usersService from "../services/users.service";

const usersRouter = Router();

usersRouter.get("/unique", async (req, res, next) => {
  try {
    const isEmailTaken = await usersService.isEmailTaken(req.query.email);
    res.send(!isEmailTaken);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await usersService.getUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await usersService.createUser(user);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
