import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
export const PUT = async (req: Request) => {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (file.size === 0 || file.size === undefined)
    return NextResponse.json({ message: "File Required", status: 400 });

  if (file.size > 4000000)
    return NextResponse.json({ message: "File must be less 4MB", status: 400 });

  if (!file.type.startsWith("image/"))
    return NextResponse.json({ message: "File must be an image", status: 400 });

  const blob = await put(file.name, file, {
    access: "public",
    multipart: true,
  });
  return NextResponse.json(blob);
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl") as string;
  await del(imageUrl);
  return NextResponse.json({ status: 200 });
};
