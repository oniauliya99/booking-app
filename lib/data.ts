import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized Access");
  try {
    return await prisma.amenities.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async () => {
  try {
    return await prisma.room.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    return await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    return await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: { include: { amenities: { select: { name: true } } } },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    return await prisma.reservation.findUnique({
      where: { id },
      include: {
        room: { select: { name: true, image: true, price: true } },
        user: { select: { name: true, email: true, phone: true } },
        Payment: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDisabledRoomById = async (roomId: string) => {
  try {
    return await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      where: { roomId, Payment: { some: { status: { not: "failure" } } } },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReservationByUserId = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("Unauthorized Access");
  try {
    return await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        room: { select: { name: true, image: true, price: true } },
        Payment: true,
        user: {
          select: { name: true, email: true, phone: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
  }
};
