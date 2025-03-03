"use client";

import AddProduct from "@/components/admin/AddProduct";
import RestockProduct from "@/components/admin/RestockProduct";
import { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"add" | "restock">("add");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("add")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "add"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              เพิ่มสินค้า
            </button>
            <button
              onClick={() => setActiveTab("restock")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "restock"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              เติมสต๊อก
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === "add" ? <AddProduct /> : <RestockProduct />}
      </div>
    </div>
  );
}
