import { prisma } from '../db.js';

export const getTasks = async (req, res, next) => {
  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks).end();
};

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

  if (!task) {
    return res.status(404).json({ message: "Task not found" }).end();
  }

  res.status(200).json(task).end();
};

export const createTask = async (req, res, next) => {
  const { title, description, userId } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description, userId },
  });
  res.status(201).json(newTask).end();
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, status },
  });

  res.status(200).json(task).end();
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id: parseInt(id) } });

  res.status(204).end();
};
