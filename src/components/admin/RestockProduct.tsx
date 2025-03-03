"use client";

import { products } from "@/data/products";
import { Product } from "@/types";
import { useState } from "react";

export default function RestockProduct() {
  const [step, setStep] = useState<"select" | "quantity" | "success">("select");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setStep("quantity");
  };

  const handleQuantitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would update the database
    // For now, we'll just show a success message
    setStep("success");
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setQuantityToAdd(1);
    setSearchTerm("");
    setStep("select");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">เติมสต๊อกสินค้า</h2>

      {/* Step indicators */}
      <div className="flex justify-around mb-8">
        {["เลือกสินค้า", "ระบุจำนวน", "อัพเดทสต๊อก"].map((label, index) => {
          const stepNames = ["select", "quantity", "success"];
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
        })}
      </div>

      {/* Step 1: Select Product */}
      {step === "select" && (
        <div>
          <h3 className="text-lg font-medium mb-4">เลือกสินค้าในระบบ</h3>

          <div className="mb-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4 border rounded-md divide-y">
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">ไม่พบสินค้า</div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="p-4 flex items-center hover:bg-gray-50 cursor-pointer"
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/100x100?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      สต๊อกปัจจุบัน: {product.stock} ชิ้น
                    </div>
                  </div>
                  <div className="text-indigo-600">เลือก</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Step 2: Specify Quantity */}
      {step === "quantity" && selectedProduct && (
        <form onSubmit={handleQuantitySubmit}>
          <h3 className="text-lg font-medium mb-4">ระบุจำนวนที่เพิ่ม</h3>

          <div className="p-4 bg-gray-50 rounded-md mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/100x100?text=No+Image";
                  }}
                />
              </div>
              <div className="ml-4">
                <div className="font-medium">{selectedProduct.name}</div>
                <div className="text-sm text-gray-500">
                  รหัสสินค้า: {selectedProduct.id}
                </div>
                <div className="text-sm text-gray-500">
                  สต๊อกปัจจุบัน: {selectedProduct.stock} ชิ้น
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จำนวนที่ต้องการเพิ่ม
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantityToAdd}
                onChange={(e) =>
                  setQuantityToAdd(parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between text-sm">
                <span>สต๊อกปัจจุบัน:</span>
                <span>{selectedProduct.stock} ชิ้น</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>จำนวนที่เพิ่ม:</span>
                <span>{quantityToAdd} ชิ้น</span>
              </div>
              <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                <span>สต๊อกใหม่:</span>
                <span>{selectedProduct.stock + quantityToAdd} ชิ้น</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep("select")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              อัปเดตสต๊อก
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Success */}
      {step === "success" && selectedProduct && (
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
            อัปเดตสต๊อกสำเร็จ!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            เพิ่มสต๊อก {selectedProduct.name} จำนวน {quantityToAdd} ชิ้น
            เรียบร้อยแล้ว
          </p>
          <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50 inline-block">
            <div className="flex justify-between text-sm">
              <span>สต๊อกก่อนหน้า:</span>
              <span>{selectedProduct.stock} ชิ้น</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>จำนวนที่เพิ่ม:</span>
              <span>{quantityToAdd} ชิ้น</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>สต๊อกใหม่:</span>
              <span>{selectedProduct.stock + quantityToAdd} ชิ้น</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              เติมสต๊อกสินค้าอื่น
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
