"use client";

import React from "react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

interface ProductListProps {
  products: Product[];
  category?: string;
}

export default function ProductList({ products, category }: ProductListProps) {
  const { dispatch } = useCart();
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const getInitialPrice = (product: Product) => {
    if (product.packagingSizes && product.packagingSizes.length > 0) {
      return product.packagingSizes[0].price;
    }
    return product.basePrice;
  };

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        selectedSize: product.packagingSizes?.[0]?.size,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {(product.isNew || product.isBestSeller) && (
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {product.isNew && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    สินค้าใหม่
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    ขายดี
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category === "food"
                    ? "อาหารและเครื่องดื่ม"
                    : "งานฝีมือ"}
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900">
                ฿{getInitialPrice(product).toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-gray-600 text-sm">{product.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.stock > 50
                    ? "bg-green-100 text-green-800"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 50
                  ? "มีสินค้า"
                  : product.stock > 0
                  ? `เหลือ ${product.stock} ชิ้น`
                  : "สินค้าหมด"}
              </span>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
