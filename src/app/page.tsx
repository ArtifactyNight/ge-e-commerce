"use client";

import Cart from "@/components/Cart";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { products } from "@/data/products";
import { useState } from "react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "food", name: "🥥 ผลิตภัณฑ์อาหารและเครื่องดื่ม" },
    { id: "crafts", name: "🏠 ผลิตภัณฑ์จากใบและก้านตาล" },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Hero />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                หมวดหมู่สินค้า
              </h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === null
                      ? "bg-green-100 text-green-800"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ทั้งหมด
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === category.id
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              สินค้าของเรา
            </h2>
            <ProductList products={filteredProducts} />
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
