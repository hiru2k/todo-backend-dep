import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTodo = async (todo) => {
  todo.completed = false;

  const newTodo = await prisma.toDo.create({
    data: todo,
  });

  return newTodo;
};

const getTodos = async (userId) => {
  const todos = await prisma.toDo.findMany({
    where: {
      userId,
    },
  });

  return todos;
};

const todosService = {
  createTodo,
  getTodos,
};

export default todosService;
