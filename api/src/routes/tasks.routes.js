import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { idSchema, createTaskSchema, updateTaskSchema } from "../validations/task.validations.js";

const router = Router();

router
    .route("/")
    .get(getTasks)
    .post(validate({ body: createTaskSchema }), createTask);

router
    .route("/:id")
    .get(validate({ params: idSchema }), getTaskById)
    .patch(validate({ params: idSchema, body: updateTaskSchema }), updateTask)
    .delete(validate({ params: idSchema }), deleteTask);

export { router as tasksRouter };
