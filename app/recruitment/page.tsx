import Link from "next/link";

export default function RecruitmentPage() {
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

<div className="rounded-xl bg-white p-6 shadow">
<h2 className="text-xl font-bold">
サンプル案件
</h2>

<p className="mt-3">
締切：2026/07/10 18:00
</p>

<div className="mt-6 flex gap-3">
<button className="rounded-lg bg-green-600 px-4 py-2 text-white">
📧 メール作成
</button>

<button className="rounded-lg bg-gray-600 px-4 py-2 text-white">
✏ 編集
</button>
</div>
</div>
</main>
);
}
