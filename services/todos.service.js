import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTodo = async (todo) => {
  todo.completed = false;

  const newTodo = await prisma.toDo.create({
    data: todo,
  });

  return newTodo;
};

const todosService = {
  createTodo,
};

export default todosService;
