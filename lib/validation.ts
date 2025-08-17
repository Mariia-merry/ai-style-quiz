import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Введите имя"),
  email: z.string().email("Невалидный email"),
  style: z.string().optional()
});

export const ResponsesSchema = z.object({
  sessionId: z.string().min(1),
  items: z.array(
    z.object({
      questionId: z.string().min(1),
      answerId: z.string().min(1)
    })
  )
}); 