import { Router } from "express";
import todosService from "../services/todos.service";

const todosRouter = Router();

todosRouter.post("/", async (req, res, next) => {
  try {
    const todo = req.body;
    const newTodo = await todosService.createTodo(todo);
    res.send(newTodo);
  } catch (error) {
    next(error);
  }
});

export default todosRouter;
