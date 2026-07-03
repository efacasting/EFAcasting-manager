import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        title: body.title,
        deadline: body.deadline
          ? new Date(body.deadline)
          : null,

        shootDate: body.shootDate
          ? new Date(body.shootDate)
          : null,

        detail: body.detail,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "保存に失敗しました。" },
      { status: 500 }
    );
  }
}