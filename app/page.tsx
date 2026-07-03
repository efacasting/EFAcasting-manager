import Link from "next/link";
import Sidebar from "./components/Sidebar";

export default function Home() {
return (
<div className="flex">
<Sidebar />

<main className="flex-1 min-h-screen bg-gray-100 p-8">
<h1 className="text-4xl font-bold text-blue-700">
EFA Casting Manager
</h1>

<p className="mt-4 text-gray-700">
ようこそ！
</p>

<div className="mt-10 grid grid-cols-2 gap-4">
<Link
href="/recruitment"
className="rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700 text-center"
>
📢 募集案件
</Link>

<Link
href="/talents"
className="rounded-xl bg-green-600 p-4 text-white hover:bg-green-700 text-center"
>
👤 タレント
</Link>

<button className="rounded-xl bg-orange-500 p-4 text-white hover:bg-orange-600">
📧 メール作成
</button>

<button className="rounded-xl bg-purple-600 p-4 text-white hover:bg-purple-700">
📨 応募管理
</button>
</div>
</main>
</div>
);
}
