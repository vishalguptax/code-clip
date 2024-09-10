import prisma from "@/utils/db";

import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  // const origin = req.headers.get("origin");

  // const validSource = origin === process.env.NEXT_PUBLIC_API_URL;

  // if (!validSource) {
  //   return NextResponse.json({ error: "Invalid source" }, { status: 401 });
  // }

  const id = params.id;

  try {
    const code = await prisma.codes.findUnique({
      where: { id },
    });

    console.log(code, "api-resp");
    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
