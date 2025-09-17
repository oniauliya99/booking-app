import z, { array, string } from "zod";

export const ReserveSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
});

export const ContactSchema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(6, "Subject is required"),
  message: z.string().min(50, "Message must be at least 50 characters"),
});

export const RoomSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(50),
  capacity: z.coerce.number().gt(0),
  price: z.coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});
