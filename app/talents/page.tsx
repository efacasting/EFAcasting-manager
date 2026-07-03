import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export default async function TalentsPage() {
  const talents = await prisma.talent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            👤 タレント一覧
          </h1>

          <p className="mt-2 text-gray-500">
            登録されているタレント一覧
          </p>
        </div>

        <Link
          href="/talents/new"
          className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          ＋ 新しいタレント
        </Link>
      </div>

      {talents.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
          タレントが登録されていません。
        </div>
      ) : (
        <div className="space-y-6">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-xl font-bold">
                {talent.name}
              </h2>

              <p className="mt-2">
                📧 {talent.email || "-"}
              </p>

              <p className="mt-2">
                📞 {talent.phone || "-"}
              </p>

              <p className="mt-4 whitespace-pre-wrap">
                {talent.note || "備考なし"}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  href={`/talents/edit/${talent.id}`}
                  className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  ✏ 編集
                </Link>

                <DeleteButton id={talent.id} />

              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}