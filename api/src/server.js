import express from "express";
import { tasksRouter } from "./routes/tasks.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});