"use client";

import { cva } from "class-variance-authority";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CheckoutForm } from "../types";

const inputVariants = cva(
  "px-3 py-2 border  block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm transition-colors",
  {
    variants: {
      error: {
        true: "border-red-300 bg-red-50",
        false: "border-gray-300",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export default function Checkout() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const validateForm = () => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    }

    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    }

    if (!formData.address.trim()) {
      newErrors.address = "กรุณากรอกที่อยู่";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^\d{9,10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getItemPrice = (item: (typeof state.items)[0]) => {
    if (item.product.packagingSizes && item.selectedSize) {
      const size = item.product.packagingSizes.find(
        (s) => s.size === item.selectedSize
      );
      return size ? size.price : item.product.basePrice;
    }
    return item.product.basePrice;
  };

  const getItemTotal = (item: (typeof state.items)[0]) => {
    return getItemPrice(item) * item.quantity;
  };

  const cartTotal = state.items.reduce(
    (total, item) => total + getItemTotal(item),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order number
      const orderNum = `MR${Date.now().toString().slice(-6)}`;
      setOrderNumber(orderNum);
      setIsSubmitted(true);
      dispatch({ type: "CLEAR_CART" });

      // Save order to localStorage
      if (typeof window !== "undefined") {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        const newOrder = {
          orderNumber: orderNum,
          items: state.items,
          total: cartTotal,
          customer: formData,
          date: new Date().toISOString(),
        };
        localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
      }
    } catch (error) {
      console.error("Error processing order:", error);
      // Handle error here
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ขอบคุณสำหรับการสั่งซื้อ
          </h2>
          <p className="text-gray-600 mb-4">
            คำสั่งซื้อหมายเลข:{" "}
            <span className="font-medium">{orderNumber}</span>{" "}
            ได้รับการยืนยันแล้ว
          </p>
          <p className="text-gray-600 mb-6">
            เราจะส่งอีเมลยืนยันการสั่งซื้อพร้อมรายละเอียดการจัดส่งให้คุณ
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            กลับไปหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            ไม่มีสินค้าในตะกร้า
          </h2>
          <p className="text-gray-600 mb-6">
            กรุณาเลือกสินค้าก่อนดำเนินการชำระเงิน
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            กลับไปเลือกสินค้า
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              สรุปคำสั่งซื้อ
            </h2>
            {state.items.length === 0 ? (
              <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 flex items-center"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover rounded"
                      />

                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x ฿{getItemPrice(item).toFixed(2)}
                          {item.selectedSize && ` / ${item.selectedSize}`}
                        </p>
                      </div>

                      <div className="text-sm font-medium text-gray-900">
                        ฿{getItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>ยอดรวม</p>
                    <p>฿{cartTotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    ค่าจัดส่งจะคำนวณในขั้นตอนถัดไป
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Checkout form */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              ข้อมูลการจัดส่ง
            </h2>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อ-นามสกุล
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="ชื่อจริง นามสกุล"
                    autoComplete="name"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputVariants({ error: !!errors.name })}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  อีเมล
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    autoComplete="email"
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputVariants({ error: !!errors.email })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  ที่อยู่
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="ที่อยู่สำหรับจัดส่ง"
                    autoComplete="street-address"
                    required
                    aria-invalid={errors.address ? "true" : "false"}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                    className={inputVariants({ error: !!errors.address })}
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600" id="address-error">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  เมือง / อำเภอ
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="เมืองหรืออำเภอ"
                    autoComplete="address-level2"
                    className={inputVariants({ error: !!errors.city })}
                  />
                  {errors.city && (
                    <p className="mt-2 text-sm text-red-600" id="city-error">
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  รหัสไปรษณีย์
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    placeholder="รหัสไปรษณีย์"
                    autoComplete="postal-code"
                    className={inputVariants({ error: !!errors.postalCode })}
                  />
                  {errors.postalCode && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="postalCode-error"
                    >
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  เบอร์โทรศัพท์
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="เบอร์โทรศัพท์"
                    autoComplete="tel"
                    required
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputVariants({ error: !!errors.phone })}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600" id="phone-error">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                วิธีการชำระเงิน
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="payment-method-cod"
                    name="payment-method"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label
                    htmlFor="payment-method-cod"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    เก็บเงินปลายทาง
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="payment-method-transfer"
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label
                    htmlFor="payment-method-transfer"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    โอนเงินผ่านธนาคาร
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  "ยืนยันการสั่งซื้อ"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
