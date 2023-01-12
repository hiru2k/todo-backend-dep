import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import erroHandler from "./middleware/error-handler.middleware";
import usersRouter from "./routers/users.router";
import authRouter from "./routers/auth.router";
import todosRouter from "./routers/todos.router";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/todos", todosRouter);

app.use(erroHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
