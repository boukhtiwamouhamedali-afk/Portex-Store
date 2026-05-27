"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ترتيب حسب الأحدث
      items.sort(
        (a: any, b: any) =>
          (b.createdAt || 0) - (a.createdAt || 0)
      );

      setProducts(items);
    }

    loadProducts();
  }, []);

  function addToCart(product: any) {
    const currentCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    currentCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(currentCart)
    );

    alert("تمت إضافة المنتج إلى السلة");
  }

  const filteredProducts = products.filter(
    (product: any) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#07111f] text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        المتجر
      </h1>

      <input
        type="text"
        placeholder="ابحث عن منتج..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full mb-8 p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product: any) => (
          <div
            key={product.id}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-white/70 mt-2">
                {product.description}
              </p>

              <p className="text-3xl font-bold mt-4">
                {product.price} DT
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 py-3 rounded-xl hover:bg-blue-500"
              >
                أضف للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}