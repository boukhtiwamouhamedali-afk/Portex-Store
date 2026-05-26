"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition"
      >
        تسجيل الدخول
      </Link>
    );
  }

  const isAdmin =
    user.email === "boukhtiwamouhamedali@gmail.com";

  return (
    <div className="flex items-center gap-3">
      {user.photo && (
        <img
          src={user.photo}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      )}

      <span>{user.name}</span>

      {isAdmin && (
        <Link
          href="/admin"
          className="bg-yellow-600 px-4 py-2 rounded-xl"
        >
          لوحة الإدارة
        </Link>
      )}
    </div>
  );
}