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
    include: {
      applications: {
        include: {
          talent: true,
        },
      },
    },
  });

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        案件が見つかりません。
      </main>
    );
  }

  const count = (status: string) =>
    project.applications.filter((a) => a.status === status).length;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link
        href="/recruitment"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← 募集案件一覧へ戻る
      </Link>

      <div className="rounded-xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            👥 案件管理
          </h1>

          <Link
            href={`/recruitment/edit/${project.id}`}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            ✏ 案件編集
          </Link>

        </div>

        <div className="mt-8 space-y-3">

          <p>
            <strong>案件名：</strong>
            {project.title}
          </p>

          <p>
            <strong>締切：</strong>{" "}
            {project.deadline
              ? new Date(project.deadline).toLocaleString("ja-JP")
              : "未設定"}
          </p>

          <p>
            <strong>撮影日：</strong>{" "}
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

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            👥 応募管理
          </h2>

          <button
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            📧 募集メール作成
          </button>

        </div>

        <div className="mt-8 grid grid-cols-5 gap-4">

          <div className="rounded-xl bg-yellow-100 p-4 text-center">
            <div className="text-lg font-bold">確認中</div>
            <div className="mt-2 text-3xl font-bold">
              {count("確認中")}
            </div>
          </div>

          <div className="rounded-xl bg-blue-100 p-4 text-center">
            <div className="text-lg font-bold">応募</div>
            <div className="mt-2 text-3xl font-bold">
              {count("応募")}
            </div>
          </div>

          <div className="rounded-xl bg-red-100 p-4 text-center">
            <div className="text-lg font-bold">日程NG</div>
            <div className="mt-2 text-3xl font-bold">
              {count("日程NG")}
            </div>
          </div>

          <div className="rounded-xl bg-gray-200 p-4 text-center">
            <div className="text-lg font-bold">案件NG</div>
            <div className="mt-2 text-3xl font-bold">
              {count("案件NG")}
            </div>
          </div>

          <div className="rounded-xl bg-green-100 p-4 text-center">
            <div className="text-lg font-bold">決定</div>
            <div className="mt-2 text-3xl font-bold">
              {count("決定")}
            </div>
          </div>

        </div>

        <div className="mt-8 rounded-xl border p-6">

          <p className="text-gray-500">
            まだ応募者はいません。
          </p>

        </div>

      </div>
    </main>
  );
}