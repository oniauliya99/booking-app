import { ReservationProps } from "@/types/reservation";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const reservation: ReservationProps = await req.json();
  const params = {
    transaction_details: {
      order_id: reservation.id,
      gross_amount: reservation.Payment[0].amount || 0,
    },
    credit_card: {
      secure: true,
    },
    customer_detail: {
      first_name: reservation.user.name,
      email: reservation.user.email,
    },
  };
  //   console.log(params);
  const token = await snap.createTransactionToken(params);
  return NextResponse.json({ token });
};
