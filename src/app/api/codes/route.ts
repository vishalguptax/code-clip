import prisma from "@/utils/db";

import { NextResponse } from "next/server";

import ShortUniqueId from "short-unique-id";

const { randomUUID } = new ShortUniqueId({ length: 6 });

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const code = await prisma.codes.create({
      data: { ...body, id: randomUUID() },
    });
    return NextResponse.json(code, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
};
