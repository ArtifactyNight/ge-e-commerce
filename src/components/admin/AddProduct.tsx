"use client";

import { Product } from "@/types";
import { useState } from "react";

export default function AddProduct() {
  const [step, setStep] = useState<
    "category" | "details" | "image" | "price" | "success"
  >("category");
  const [formData, setFormData] = useState<Partial<Product>>({
    category: "food",
    name: "",
    description: "",
    imageUrl: "",
    basePrice: 0,
    stock: 1,
  });

  const categories = [
    { id: "food", name: "อาหาร" },
    { id: "crafts", name: "หัตถกรรม" },
  ];

  const handleCategorySelect = (category: "food" | "crafts") => {
    setFormData({ ...formData, category });
    setStep("details");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("image");
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("price");
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally we would send this to the API, but for mock purposes
    // we'll just mark as success
    setStep("success");
  };

  const resetForm = () => {
    setFormData({
      category: "food",
      name: "",
      description: "",
      imageUrl: "",
      basePrice: 0,
      stock: 1,
    });
    setStep("category");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">เพิ่มสินค้าใหม่</h2>

      {/* Step indicators */}
      <div className="flex justify-between mb-8">
        {["เลือกหมวดหมู่", "ใส่รายละเอียด", "อัปโหลดรูปภาพ", "กำหนดราคา"].map(
          (label, index) => {
            const stepNames = ["category", "details", "image", "price"];
            const isCurrent = step === stepNames[index];
            const isCompleted =
              stepNames.indexOf(step) > stepNames.indexOf(stepNames[index]);

            return (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    isCurrent
                      ? "bg-indigo-600 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <div
                  className={`mt-2 text-sm ${
                    isCurrent || isCompleted
                      ? "font-medium text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Step 1: Category selection */}
      {step === "category" && (
        <div>
          <h3 className="text-lg font-medium mb-4">เลือกหมวดหมู่</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  handleCategorySelect(category.id as "food" | "crafts")
                }
                className={`p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all ${
                  formData.category === category.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
              >
                <div className="font-medium text-gray-900">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Product details */}
      {step === "details" && (
        <form onSubmit={handleDetailsSubmit}>
          <h3 className="text-lg font-medium mb-4">ใส่รายละเอียดสินค้า</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อสินค้า
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รายละเอียดสินค้า
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จำนวนเริ่มต้น
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("category")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              ถัดไป
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Image Upload */}
      {step === "image" && (
        <form onSubmit={handleImageSubmit}>
          <h3 className="text-lg font-medium mb-4">อัปโหลดรูปภาพสินค้า</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL รูปภาพ
              </label>
              <input
                type="text"
                required
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {formData.imageUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-2">ภาพตัวอย่าง:</p>
                <img
                  src={formData.imageUrl}
                  alt="Product preview"
                  className="max-w-xs max-h-48 object-contain border border-gray-200 rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x300?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              ถัดไป
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Price */}
      {step === "price" && (
        <form onSubmit={handlePriceSubmit}>
          <h3 className="text-lg font-medium mb-4">กำหนดราคาสินค้า</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคาพื้นฐาน (บาท)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basePrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {formData.category === "food" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตัวเลือกขนาดบรรจุภัณฑ์ (ถ้ามี)
                </label>
                <div className="space-y-2">
                  {["100g", "250g", "500g", "1kg"].map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="text-sm text-gray-700"
                      >
                        {size}
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="ราคา"
                        className="px-2 py-1 text-sm border border-gray-300 rounded-md w-24"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("image")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              เพิ่มสินค้า
            </button>
          </div>
        </form>
      )}

      {/* Success message */}
      {step === "success" && (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            เพิ่มสินค้าสำเร็จ!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {formData.name} ได้ถูกเพิ่มเข้าสู่ระบบเรียบร้อยแล้ว
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              เพิ่มสินค้าใหม่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
