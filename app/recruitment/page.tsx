import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export default async function RecruitmentPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📢 募集案件</h1>

          <p className="mt-2 text-gray-500">
            募集中の案件一覧
          </p>
        </div>

        <Link
          href="/recruitment/new"
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          ＋ 新しい募集案件
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
          募集案件がありません。
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-xl font-bold">
                {project.title}
              </h2>

              <p className="mt-3 text-gray-600">
                <strong>締切：</strong>
                {project.deadline
                  ? new Date(project.deadline).toLocaleString("ja-JP")
                  : "未設定"}
              </p>

              <p className="mt-2 text-gray-600">
                <strong>撮影日：</strong>
                {project.shootDate
                  ? new Date(project.shootDate).toLocaleDateString("ja-JP")
                  : "未設定"}
              </p>

              <p className="mt-3 whitespace-pre-wrap">
                {project.detail || "詳細なし"}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  href={`/recruitment/${project.id}`}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  👥 案件管理
                </Link>

                <Link
                  href={`/recruitment/edit/${project.id}`}
                  className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  ✏ 編集
                </Link>

                <DeleteButton id={project.id} />

              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}