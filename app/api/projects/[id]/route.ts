import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// 1件取得（編集画面用）
export async function GET(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return NextResponse.json(
      { message: "案件が見つかりません。" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}

// 更新
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const body = await request.json();

  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
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
}

// 削除
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "OK",
  });
}