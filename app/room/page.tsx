import { Metadata } from "next";
import HeaderSection from "@/components/header-section";
import Main from "@/components/main";
import { Suspense } from "react";
import RoomSkeleton from "@/components/room-skeleton";

export const metadata: Metadata = {
  title: "Room & Rates",
  description: "Choose Your Best Room Today",
};
const RoomPage = () => {
  return (
    <div>
      <HeaderSection
        title="Room & Rates"
        subtitle="Lorem ipsum dolor sit amet"
      />
      <div className="mt-10 px-4 ">
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
