"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTalentPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      alert("氏名を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/talents", {
        method: "POST",
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
        throw new Error("保存失敗");
      }

      alert("保存しました！");
      router.push("/talents");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("保存できませんでした。");
    } finally {
      setLoading(false);
    }
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
        👤 新しいタレントを登録
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
            placeholder="氏名を入力"
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
            placeholder="メールアドレスを入力"
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
            placeholder="電話番号を入力"
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
            placeholder="備考を入力"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "保存中..." : "保存"}
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