"use server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { ContactSchema, ReserveSchema, RoomSchema } from "./zod";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

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

export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
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
  const { amenities, capacity, description, name, price } =
    validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        price,
        capacity,
        description,
        image,
        RoomAmenities: {
          createMany: {
            data: amenities.map((amenity) => ({
              amenitiesId: amenity,
            })),
          },
        },
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
  redirect("/admin/room");
};

export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/room");
};

export const updateRoom = async (
  image: string,
  roomId: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
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
  const { amenities, capacity, description, name, price } =
    validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      }),
    ]);
  } catch (e: unknown) {
    console.log(e);
  }
  revalidatePath("/admin/room");
  redirect("/admin/room");
};

export const createReserve = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    redirect(`/signin?redirect_url=room/${roomId}`);
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };
  const validatedFields = ReserveSchema.safeParse(rawData);
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
  const { name, phone } = validatedFields.data;
  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0) return { messageDate: "Date must be at least 1 night" };
  const amount = night * price;
  let reservationId: string = "";
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name,
          phone,
        },
        where: { id: session.user.id },
      });
      const reservation = await tx.reservation.create({
        data: {
          startDate,
          endDate,
          price,
          roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount,
              method: "",
            },
          },
        },
      });
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }
  if (reservationId) {
    redirect(`/checkout/${reservationId}`);
  }
};
