import { z } from 'zod';

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'id doit être un nombre entier positif"),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  userId: z.number().int().positive("L'userId doit être un entier positif"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(["pending", "done"]).optional(),
});
