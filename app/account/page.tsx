import Navbar from "@/components/Navbar";

export default function AccountPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B1220] text-white p-6">
        <h1 className="text-4xl font-bold mb-6">
          الحساب
        </h1>

        <div className="bg-white/5 p-6 rounded-3xl">
          لم يتم تسجيل الدخول
        </div>
      </main>
    </>
  );
}