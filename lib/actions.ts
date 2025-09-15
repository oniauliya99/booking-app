"use server";
import { prisma } from "./prisma";
import { ContactSchema } from "./zod";

// Define your ContactSchema

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const formDataObject = Object.fromEntries(formData.entries());

  const validatedFields = ContactSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    const formattedErrors = validatedFields.error.format();

    const fieldErrors: Record<string, string> = {};

    Object.entries(formattedErrors).forEach(([key, value]) => {
      if (key !== "_errors" && value && "_errors" in value) {
        fieldErrors[key] = value._errors[0] || `Invalid ${key}`;
      }
    });

    return {
      error: fieldErrors,
    };
  }

  const { name, email, message, subject } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: {
        email,
        message,
        name,
        subject,
      },
    });

    return {
      success: true,
      message: "Thanks for contacting us! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Database error:", error);

    return {
      error: {
        general: "Failed to send your message. Please try again later.",
      },
    };
  }
};
