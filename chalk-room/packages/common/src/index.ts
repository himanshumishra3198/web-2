import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(3).max(20),
  password: z.string().min(8),
  name: z.string(),
});

export const SigninUserSchema = z.object({
  email: z.string().min(3).max(20),
  password: z.string().min(8),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
