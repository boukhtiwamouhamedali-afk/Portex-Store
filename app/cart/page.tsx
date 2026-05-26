"use client";

import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(items);
  }, []);

  function removeFromCart(index: number) {
    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  }

  async function createOrder() {
    if (!name || !age || !country) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const newOrderId =
      "ORD-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000);

    await addDoc(collection(db, "orders"), {
      orderId: newOrderId,
      name,
      age,
      country,
      products: cart,
      total,
      createdAt: Date.now(),
    });

    setOrderId(newOrderId);

    localStorage.removeItem("cart");
    setCart([]);
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <main className="min-h-screen bg-[#07111f] text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        السلة
      </h1>

      {orderId ? (
        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">
            تم إنشاء الطلب بنجاح
          </h2>

          <p className="mb-3">
            رقم الطلب:
            <strong> {orderId}</strong>
          </p>

          <p>
            الرجاء فتح تذكرة في:
          </p>

          <a
            href="https://discord.gg/CPMdUX9GyD"
            target="_blank"
            className="text-blue-400"
          >
            https://discord.gg/CPMdUX9GyD
          </a>

          <p className="mt-3">
            وأرسل رقم الطلب للدعم.
          </p>
        </div>
      ) : (
        <>
          {cart.length === 0 ? (
            <p>السلة فارغة</p>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-xl font-bold">
                        {item.name}
                      </h2>

                      <p>{item.price} DT</p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(index)
                      }
                      className="bg-red-600 px-4 py-2 rounded-xl"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-3xl font-bold">
                المجموع: {total} DT
              </div>

              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
                >
                  طلب الآن
                </button>
              ) : (
                <div className="mt-6 flex flex-col gap-4 max-w-md">
                  <input
                    className="bg-white/10 p-3 rounded-xl"
                    placeholder="الاسم"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                  <input
                    className="bg-white/10 p-3 rounded-xl"
                    placeholder="العمر"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value)
                    }
                  />

                  <input
                    className="bg-white/10 p-3 rounded-xl"
                    placeholder="البلد"
                    value={country}
                    onChange={(e) =>
                      setCountry(e.target.value)
                    }
                  />

                  <button
                    onClick={createOrder}
                    className="bg-green-600 p-3 rounded-xl"
                  >
                    تأكيد الطلب
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}