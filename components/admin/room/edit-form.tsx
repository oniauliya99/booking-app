"use client";

import { updateRoom } from "@/lib/actions";
import { RoomProps } from "@/types/room";
import type { Amenities } from "@prisma/client";
import type { PutBlobResult } from "@vercel/blob";
import clsx from "clsx";
import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";

const EditForm = ({
  amenities,
  room,
}: {
  amenities: Amenities[];
  room: RoomProps;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await res.json();
        if (res.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const [state, formAction, isPending] = useActionState(
    updateRoom.bind(null, image!, room.id),
    null
  );
  const deleteImage = async (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };
  const checkAmenities = room.RoomAmenities.map((item) => item.amenitiesId);
  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4">
          <div className="mb-4 ">
            <input
              type="text"
              name="name"
              defaultValue={room.name}
              placeholder="Room Name"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic={true}>
              <span className="text-sm text-red-500 mt-2 ">
                {state?.error?.name}
              </span>
            </div>
          </div>
          <div className="mb-4 ">
            <textarea
              rows={8}
              defaultValue={room.description || ""}
              placeholder="Room Description"
              name="description"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            ></textarea>
            <div aria-live="polite" aria-atomic={true}>
              <span className="text-sm text-red-500 mt-2 ">
                {" "}
                {state?.error?.description}
              </span>
            </div>
          </div>
          <div className="mb-4 grid md:grid-cols-3 ">
            {amenities.map((amenity) => (
              <div className="flex items-center mb-4" key={amenity.id}>
                <input
                  type="checkbox"
                  name="amenities"
                  defaultChecked={checkAmenities.includes(amenity.id)}
                  defaultValue={amenity.id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                />
                {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className="ms-2 text-sm font-medium text-gray-900 capitalize">
                  {amenity.name}
                </label>
              </div>
            ))}

            <div aria-live="polite" aria-atomic={true}>
              <span className="text-sm text-red-500 mt-2 ">
                {" "}
                {state?.error?.amenities}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-white p-4">
          {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
          <label
            htmlFor="input-file"
            className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
              {pending ? <BarLoader /> : null}
              {image ? (
                <button
                  type="button"
                  className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-400 "
                  onClick={() => deleteImage(image)}
                >
                  <IoTrashOutline className="size-4 text-transparent hover:text-white" />
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="size-8" />
                  <p className="mb-1 text-sm font-bold">Select Image</p>
                  {message ? (
                    <p className="text-xs text-red-500">{message}</p>
                  ) : (
                    <p className="text-xs">
                      SVG, PNG, JPEG, GIF, or other (max: 4 MB)
                    </p>
                  )}
                </div>
              )}
            </div>
            {!image ? (
              <input
                type="file"
                onChange={handleUpload}
                ref={inputFileRef}
                className="hidden"
                id="input-file"
              />
            ) : (
              <Image
                src={image}
                alt="image"
                width={640}
                height={360}
                className="rounded-md absolute aspect-video object-cover"
              />
            )}
          </label>
          <div className="mb-4 ">
            <input
              type="text"
              defaultValue={room.capacity}
              name="capacity"
              placeholder="Capacity"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic={true}>
              <span className="text-sm text-red-500 mt-2 ">
                {" "}
                {state?.error?.capacity}
              </span>
            </div>
          </div>
          <div className="mb-4 ">
            <input
              type="text"
              name="price"
              defaultValue={room.price}
              placeholder="Price"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic={true}>
              <span className="text-sm text-red-500 mt-2 ">
                {state?.error?.price}
              </span>
            </div>
          </div>
          {/* General Message */}
          {state?.message ? (
            <div className="mb-4 bg-red-200 p-2">
              <span className="text-sm text-gray-700 mt-2">
                {state.message}
              </span>
            </div>
          ) : null}

          <button
            type="submit"
            className={clsx(
              "bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer",
              {
                "opacity-50 cursor-progress animate-pulse": isPending,
              }
            )}
            disabled={isPending}
          >
            {isPending ? "Updating" : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
