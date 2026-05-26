import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#0B1220] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link href="/" className="text-2xl font-bold">
          POTREX
        </Link>

        <div className="flex gap-4">
          <Link href="/">الرئيسية</Link>
          <Link href="/store">المتجر</Link>
          <Link href="/cart">السلة</Link>
          <Link href="/account">الحساب</Link>
        </div>
      </div>
    </nav>
  );
}