import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const { password: hashedPassword, ...securedUser } = user;

  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  if (!isValidPassword) return null;

  return generateToken(securedUser);
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

const authService = {
  login,
};

export default authService;
