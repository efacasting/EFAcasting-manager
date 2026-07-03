"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditTalentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadTalent() {
      const res = await fetch(`/api/talents/${id}`);

      if (!res.ok) {
        alert("タレントが見つかりません。");
        router.push("/talents");
        return;
      }

      const data = await res.json();

      setName(data.name ?? "");
      setEmail(data.email ?? "");
      setPhone(data.phone ?? "");
      setNote(data.note ?? "");

      setLoading(false);
    }

    loadTalent();
  }, [id, router]);

  async function handleSave() {
    if (!name.trim()) {
      alert("氏名を入力してください。");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/talents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          note,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("更新しました。");

      router.push("/talents");
      router.refresh();
    } catch {
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
        href="/talents"
        className="mb-6 inline-block text-green-600 hover:underline"
      >
        ← タレント一覧へ戻る
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-green-700">
        👤 タレント編集
      </h1>

      <div className="space-y-6 rounded-xl bg-white p-6 shadow">

        <div>
          <label className="mb-2 block font-bold">
            氏名
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            メールアドレス
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            電話番号
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            備考
          </label>

          <textarea
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {saving ? "更新中..." : "更新"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/talents")}
            className="rounded-xl bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>

      </div>
    </main>
  );
}