"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("このタレントを削除しますか？");

    if (!ok) return;

    const res = await fetch(`/api/talents/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("削除に失敗しました。");
      return;
    }

    alert("削除しました。");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      🗑 削除
    </button>
  );
}