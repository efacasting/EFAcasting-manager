import Link from "next/link";

export default function Sidebar() {
return (
<div className="w-64 min-h-screen bg-blue-700 text-white p-5">
<h1 className="text-2xl font-bold mb-8">
EFA Casting Manager
</h1>

<nav className="space-y-3">
<Link href="/" className="block hover:underline">
🏠 ホーム
</Link>

<Link href="/recruitment" className="block hover:underline">
📢 募集案件
</Link>

<Link href="#" className="block hover:underline">
👤 タレント
</Link>

<Link href="#" className="block hover:underline">
📨 応募管理
</Link>

<Link href="#" className="block hover:underline">
📅 スケジュール
</Link>

<Link href="#" className="block hover:underline">
⚙️ 設定
</Link>
</nav>
</div>
);
}
