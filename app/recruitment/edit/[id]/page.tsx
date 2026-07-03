"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditRecruitmentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [shootDate, setShootDate] = useState("");
  const [detail, setDetail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProject() {
      const res = await fetch(`/api/projects/${id}`);

      if (!res.ok) {
        alert("案件が見つかりません。");
        router.push("/recruitment");
        return;
      }

      const data = await res.json();

      setTitle(data.title ?? "");

      setDeadline(
        data.deadline
          ? new Date(data.deadline).toISOString().slice(0, 16)
          : ""
      );

      setShootDate(
        data.shootDate
          ? new Date(data.shootDate).toISOString().slice(0, 10)
          : ""
      );

      setDetail(data.detail ?? "");

      setLoading(false);
    }

    loadProject();
  }, [id, router]);

  async function handleSave() {
    if (!title.trim()) {
      alert("案件名を入力してください。");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          deadline,
          shootDate,
          detail,
        }),
      });

      if (!res.ok) {
        throw new Error("更新失敗");
      }

      alert("更新しました。");

      router.push("/recruitment");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("更新できませんでした。");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        読み込み中...
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

      <h1 className="mb-8 text-3xl font-bold">
        ✏ 募集案件編集
      </h1>

      <div className="space-y-6 rounded-xl bg-white p-6 shadow">

        <div>
          <label className="mb-2 block font-bold">
            案件名
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            締切日時
          </label>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            撮影日
          </label>

          <input
            type="date"
            value={shootDate}
            onChange={(e) => setShootDate(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            案件詳細
          </label>

          <textarea
            rows={8}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "更新中..." : "更新"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/recruitment")}
            className="rounded-xl bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>

      </div>
    </main>
  );
}