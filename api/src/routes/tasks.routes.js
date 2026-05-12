import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router
    .route("/")
    .get(getTasks)
    .post(createTask);

router
    .route("/:id")
    .get(getTaskById)
    .patch(updateTask)
    .delete(deleteTask);

export { router as tasksRouter };
