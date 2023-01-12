import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import todosService from "../services/todos.service";

const todosRouter = Router();

todosRouter.get("/", authMiddleware, async (req, res, next) => {
  try {
    const todos = await todosService.getTodos(req.userId);
    res.send(todos);
  } catch (error) {
    next(error);
  }
});

todosRouter.post("/", authMiddleware, async (req, res, next) => {
  try {
    const todo = req.body;
    todo.userId = req.userId;
    const newTodo = await todosService.createTodo(todo);
    res.send(newTodo);
  } catch (error) {
    next(error);
  }
});

export default todosRouter;
