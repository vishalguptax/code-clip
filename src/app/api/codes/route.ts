import prisma from "@/utils/db";

import { NextResponse } from "next/server";

import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 6 });

export const POST = async (req: Request) => {
  // const origin = req.headers.get("origin");

  // const validSource = origin === process.env.NEXT_PUBLIC_API_URL;

  // if (!validSource) {
  //   return NextResponse.json({ error: "Invalid source" }, { status: 401 });
  // }

  try {
    const body = await req.json();

    const code = await prisma.codes.create({
      data: { ...body, id: randomUUID() },
    });
    console.log(code);
    return NextResponse.json(code, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
};
