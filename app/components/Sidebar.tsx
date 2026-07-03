import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white p-5">
      <h1 className="mb-8 text-2xl font-bold">
        EFA Casting Manager
      </h1>

      <nav className="space-y-3">

        <Link
          href="/"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          🏠 ホーム
        </Link>

        <Link
          href="/recruitment"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          📢 募集案件
        </Link>

        <Link
          href="/talents"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          👤 タレント
        </Link>

        <Link
          href="/applications"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          📨 応募管理
        </Link>

        <Link
          href="/schedule"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          📅 スケジュール
        </Link>

        <Link
          href="/settings"
          className="block rounded-lg px-3 py-2 hover:bg-blue-600"
        >
          ⚙️ 設定
        </Link>

      </nav>
    </div>
  );
}