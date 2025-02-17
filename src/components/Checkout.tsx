import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckoutForm } from "../types";
import { Check, Loader2 } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
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
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        orderNumber: orderNum,
        items: state.items,
        total: cartTotal,
        customer: formData,
        date: new Date().toISOString(),
      };
      localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
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

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ขอบคุณสำหรับการสั่งซื้อ
          </h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">หมายเลขคำสั่งซื้อของคุณคือ</p>
            <p className="text-xl font-semibold text-green-600">
              {orderNumber}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">
              รายละเอียดการจัดส่ง
            </h3>
            <p className="text-gray-600">{formData.name}</p>
            <p className="text-gray-600">{formData.address}</p>
            <p className="text-gray-600">{formData.phone}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">คาดว่าจะได้รับสินค้าภายในวันที่</p>
            <p className="font-medium text-gray-900">
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            กลับสู่หน้าหลัก
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
            onClick={() => navigate("/")}
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            กลับไปเลือกสินค้า
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ชำระเงิน</h2>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            สรุปรายการสั่งซื้อ
          </h3>
          <div className="border-t border-gray-200 pt-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-2">
                <span className="text-gray-600">
                  {item.product.name} × {item.quantity}
                  {item.selectedSize && ` (${item.selectedSize})`}
                </span>
                <span className="font-medium">
                  ฿{getItemTotal(item).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between font-medium text-lg">
                <span>ยอดรวมทั้งหมด</span>
                <span>฿{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.name ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-green-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.email ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-green-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              ที่อยู่จัดส่ง
            </label>
            <textarea
              id="address"
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.address ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-green-500`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } focus:border-green-500 focus:ring-green-500`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

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
        </form>
      </div>
    </div>
  );
}
