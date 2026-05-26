"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  async function loadProducts() {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    const items = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data(),
    }));

    setProducts(items);
  }

  async function loadOrders() {
    const snapshot = await getDocs(
      collection(db, "orders")
    );

    const items = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data(),
    }));

    setOrders(items);
  }

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (!saved) return;

    const user = JSON.parse(saved);

    if (
      user.email ===
      "boukhtiwamouhamedali@gmail.com"
    ) {
      setAllowed(true);
      loadProducts();
      loadOrders();
    }
  }, []);

  async function addProduct() {
    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        description,
        image,
        createdAt: Date.now(),
      });

      setName("");
      setPrice("");
      setDescription("");
      setImage("");

      loadProducts();

      alert("تمت إضافة المنتج");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ");
    }
  }

  async function removeProduct(id: string) {
    try {
      await deleteDoc(doc(db, "products", id));

      loadProducts();

      alert("تم حذف المنتج");
    } catch (error) {
      console.error(error);
    }
  }

  async function removeOrder(id: string) {
    try {
      await deleteDoc(doc(db, "orders", id));

      loadOrders();

      alert("تم حذف الطلب");
    } catch (error) {
      console.error(error);
    }
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          غير مصرح لك بالدخول
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        لوحة الإدارة
      </h1>

      <div className="max-w-xl flex flex-col gap-4">
        <input
          className="bg-white/10 p-3 rounded-xl"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="bg-white/10 p-3 rounded-xl"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="bg-white/10 p-3 rounded-xl"
          placeholder="رابط الصورة"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="bg-white/10 p-3 rounded-xl"
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addProduct}
          className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl"
        >
          إضافة المنتج
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">
          المنتجات
        </h2>

        <div className="flex flex-col gap-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-xl">
                  {product.name}
                </h3>

                <p>{product.price} DT</p>

                <p className="text-white/70">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() =>
                  removeProduct(product.id)
                }
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"
              >
                حذف المنتج
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          الطلبات
        </h2>

        <div className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white/5 p-5 rounded-xl"
            >
              <h3 className="text-xl font-bold">
                {order.orderId}
              </h3>

              <p>الاسم: {order.name}</p>
              <p>العمر: {order.age}</p>
              <p>البلد: {order.country}</p>

              <p className="font-bold mt-2">
                المجموع: {order.total} DT
              </p>

              <div className="mt-3">
                <p className="font-bold">
                  المنتجات:
                </p>

                {order.products?.map(
                  (product: any, index: number) => (
                    <div key={index}>
                      • {product.name} - {product.price} DT
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() => removeOrder(order.id)}
                className="mt-4 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"
              >
                حذف الطلب
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}