import { prisma } from '../db.js';

// GET all
// jutilise le truxc de prisma prisma.task.FinUnique()

export const getTask = (req, res, next) => {

  const task = await prisma.task.FindUnique();

  if (!task) {
    return res.status(404).json({ message: "Task not found" }).end();
  }

  res.status(200).json(task).end();
};

export const getTasks = (req, res, next) => {
  res.status(200).json(tasks).end();
};

export const createTask = (req, res, next) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: "pending",
  };
  tasks.push(newTask);
  res.status(201).json(newTask).end();
};

export const updateTask = (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" }).end();
  }

  task.title = title;
  task.description = description;
  task.status = status;

  res.status(200).json(task).end();
};

export const deleteTask = (req, res, next) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" }).end();
  }

  tasks.splice(taskIndex, 1);

  res.status(204).end();
};
