import { Metadata } from "next";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";
import HeaderSection from "@/components/header-section";

export const metadata: Metadata = {
  title: "About ",
  description: "Learn more about Hotel Hebat, our mission, vision, and values.",
};
const AboutPage = () => {
  return (
    <div>
      <HeaderSection
        title={"About Us"}
        subtitle={"Lorem ipsum dolor sit amet."}
      />
      <div className="max-w-screen mx h-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Image
            src={"/about-image.jpg"}
            width={650}
            height={579}
            alt="About Image"
          />
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              {" "}
              Who We Are
            </h1>
            <p className="text-gray-700 pt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              repudiandae ducimus in tenetur laboriosam veritatis similique esse
              earum, voluptas quis.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores non, delectus nesciunt alias suscipit ratione?
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mision :</h4>
                  <p className="text-gray-600">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, delectus harum ipsum repellat cum praesentium
                    inventore tenetur qui? Ducimus, ipsa.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
