import { getReservations } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";

const ReservationList = async () => {
  const reservations = await getReservations();
  if (!reservations) return <p>No Reservation Found</p>;

  return (
    <div className="bg-white shadow-sm p-4 mt-5 ">
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Name
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Arrival
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Departure
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700 uppercase ">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations?.map((reserve) => (
            <tr className="hover:bg-gray-100 " key={reserve.id}>
              <td className="px-6 py-4">
                <div className="h-20 w-32 relative">
                  <Image
                    src={reserve.room.image!}
                    fill
                    sizes="20vw"
                    alt="room image"
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{reserve.user.name}</td>
              <td className="px-6 py-4">
                {formatDate(reserve.startDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {formatDate(reserve.endDate.toISOString())}
              </td>
              <td className="px-6 py-4">{reserve.room.name}</td>
              <td className="px-6 py-4">
                {formatCurrency(reserve.room.price)}
              </td>
              <td className="px-6 py-4">
                {formatDate(reserve.createdAt.toString())}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="capitalize">{reserve.Payment[0].status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
