"use client";
import { ReservationProps } from "@/types/reservation";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}
export const PaymentButton = ({
  reservation,
}: {
  reservation: ReservationProps;
}) => {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });
        const { token } = await response.json();
        if (token) window.snap.pay(token);
      } catch (error) {
        console.dir(error, { depth: null });
      }
    });
  };
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer"
    >
      Process Payment
    </button>
  );
};

export default PaymentButton;
