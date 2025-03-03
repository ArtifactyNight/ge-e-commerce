"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { Minus, Plus, X } from "lucide-react";

export default function Cart() {
  const router = useRouter();
  const { state, dispatch } = useCart();

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">ตะกร้าสินค้า</h2>

      {state.items.length === 0 ? (
        <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {state.items.map((item) => (
              <div key={item.product.id} className="py-4 flex items-center">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover rounded"
                />

                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-500">
                    ฿{getItemPrice(item).toFixed(2)}
                    {item.selectedSize && ` / ${item.selectedSize}`}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          productId: item.product.id,
                          quantity: Math.max(0, item.quantity - 1),
                        },
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          productId: item.product.id,
                          quantity: item.quantity + 1,
                        },
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: item.product.id,
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-100 ml-4"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>ยอดรวม</span>
              <span>฿{cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              ดำเนินการสั่งซื้อ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
