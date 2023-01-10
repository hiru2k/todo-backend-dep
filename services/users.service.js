import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);

  const { password, ...newUser } = await prisma.user.create({
    data: user,
  });

  return newUser;
};

const getUser = async (id) => {
  id = parseInt(id);
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  const { password, ...securedUser } = user;

  return securedUser;
};

const isEmailTaken = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user;
};

const usersService = {
  createUser,
  getUser,
  isEmailTaken,
};

export default usersService;
