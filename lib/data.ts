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
