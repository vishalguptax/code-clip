import prisma from "@/utils/db";

import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    const code = await prisma.codes.findUnique({
      where: { id },
    });
    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
