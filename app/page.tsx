import UserMenu from "@/components/UserMenu";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <nav className="border-b border-white/10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            POTREX STORE
          </h1>

          <div className="flex gap-3">
            <Link
              href="/store"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition"
            >
              المتجر
            </Link>

<UserMenu />
 </div> 
</div> 
</nav>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-[35px] p-10 bg-gradient-to-r from-blue-700 to-blue-500 shadow-2xl">
          <h2 className="text-6xl font-bold mb-5">
            POTREX STORE
          </h2>

          <p className="text-xl opacity-90 max-w-2xl">
            متجر متخصص في الخدمات الرقمية، منتجات ديسكورد،
            إعداد السيرفرات، التصاميم والخدمات التقنية.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/store"
              className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
            >
              دخول المتجر
            </Link>

            <Link
              href="/cart"
              className="bg-black/20 px-6 py-3 rounded-2xl hover:bg-black/30 transition"
            >
              السلة
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h3 className="text-4xl font-bold mb-8">
          الخدمات الأكثر طلباً
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
            <div className="h-40 rounded-2xl bg-blue-600/30 mb-4"></div>

            <h4 className="text-2xl font-bold">
              Discord Nitro
            </h4>

            <p className="text-white/70 mt-3">
              اشتراك نيترو شهر كامل
            </p>

            <p className="text-3xl font-bold mt-4">
              10 DT
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
            <div className="h-40 rounded-2xl bg-blue-600/30 mb-4"></div>

            <h4 className="text-2xl font-bold">
              Server Setup
            </h4>

            <p className="text-white/70 mt-3">
              إعداد سيرفر احترافي كامل
            </p>

            <p className="text-3xl font-bold mt-4">
              20 DT
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
            <div className="h-40 rounded-2xl bg-blue-600/30 mb-4"></div>

            <h4 className="text-2xl font-bold">
              Logo Design
            </h4>

            <p className="text-white/70 mt-3">
              تصميم شعار احترافي
            </p>

            <p className="text-3xl font-bold mt-4">
              15 DT
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}