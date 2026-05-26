"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function login() {
    try {
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      );

      alert("تم تسجيل الدخول بنجاح");

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("فشل تسجيل الدخول");
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl w-[400px]">
        <h1 className="text-3xl font-bold mb-3 text-center">
          تسجيل الدخول
        </h1>

        <p className="text-center text-white/70 mb-6">
          سجل الدخول بحساب Google
        </p>

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-bold"
        >
          تسجيل الدخول بواسطة Google
        </button>
      </div>
    </main>
  );
}