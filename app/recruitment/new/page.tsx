import Link from "next/link";
export default function NewRecruitmentPage() {
return (
<main className="min-h-screen bg-gray-100 p-8">
    <Link
    href="/recruitment"
    className="mb6 inline-block text-blue-600 hover:underline"
    >
        ←　募集案件一覧に戻る
        </Link>
        
<h1 className="mb-8 text-3xl font-bold">
📢 新しい募集案件
</h1>

<div className="space-y-6 rounded-xl bg-white p-6 shadow">

<div>
<label className="mb-2 block font-bold">
案件名
</label>

<input
type="text"
className="w-full rounded-lg border p-3"
placeholder="案件名を入力"
/>
</div>

<div>
<label className="mb-2 block font-bold">
締切日時
</label>

<input
type="datetime-local"
className="w-full rounded-lg border p-3"
/>
</div>

<div>
<label className="mb-2 block font-bold">
案件詳細
</label>

<textarea
rows={8}
className="w-full rounded-lg border p-3"
placeholder="募集内容を入力"
/>
</div>

<button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
保存
</button>

</div>
</main>
);
}
