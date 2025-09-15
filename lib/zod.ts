import z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(6, "Subject is required"),
  message: z.string().min(50, "Message must be at least 50 characters"),
});
