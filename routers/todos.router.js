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

todosRouter.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const todoId = Number(req.params.id);

    const isOwned = await todosService.checkOwnership(todoId, req.userId);
    if (!isOwned) {
      return res.status(403).send("You are not authorized to do this");
    }

    await todosService.toggleTodo(todoId);
    res.send("Todo toggled");
  } catch (error) {
    next(error);
  }
});

export default todosRouter;
