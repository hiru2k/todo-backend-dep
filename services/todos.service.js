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

const toggleTodo = async (todoId) => {
  const todo = await prisma.toDo.findUnique({
    where: {
      id: todoId,
    },
  });

  await prisma.toDo.update({
    where: {
      id: todoId,
    },
    data: {
      completed: !todo.completed,
    },
  });
};

const checkOwnership = async (todoId, userId) => {
  const todo = await prisma.toDo.findUnique({
    where: {
      id: todoId,
    },
  });

  return todo.userId === userId;
};

const todosService = {
  createTodo,
  getTodos,
  toggleTodo,
  checkOwnership,
};

export default todosService;
