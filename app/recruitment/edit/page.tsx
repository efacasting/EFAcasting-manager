import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecruitmentDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          案件が見つかりません
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <Link
        href="/recruitment"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← 募集案件一覧へ戻る
      </Link>

      <div className="rounded-xl bg-white p-6 shadow">

        <h1 className="text-3xl font-bold">
          👥 案件管理
        </h1>

        <div className="mt-8 space-y-3">

          <p>
            <strong>案件名：</strong>
            {project.title}
          </p>

          <p>
            <strong>締切：</strong>
            {project.deadline
              ? new Date(project.deadline).toLocaleString("ja-JP")
              : "未設定"}
          </p>

          <p>
            <strong>撮影日：</strong>
            {project.shootDate
              ? new Date(project.shootDate).toLocaleDateString("ja-JP")
              : "未設定"}
          </p>

          <p className="whitespace-pre-wrap">
            <strong>案件詳細：</strong>

            <br />

            {project.detail || "詳細なし"}
          </p>

        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold">
          👥 応募管理
        </h2>

        <div className="mt-6 rounded-xl bg-gray-100 p-6">

          <p className="text-gray-600">
            まだ応募者はいません。
          </p>

        </div>

      </div>

    </main>
  );
}