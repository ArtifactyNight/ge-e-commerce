import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.packagingSizes?.[0]?.size
  );

  const getCurrentPrice = () => {
    if (!product.packagingSizes) return product.basePrice;
    const size = product.packagingSizes.find(s => s.size === selectedSize);
    return size ? size.price : product.basePrice;
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, selectedSize }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>

        {product.packagingSizes && (
          <div className="mt-4">
            <label htmlFor={`size-${product.id}`} className="block text-sm font-medium text-gray-700">
              เลือกขนาด
            </label>
            <select
              id={`size-${product.id}`}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500"
            >
              {product.packagingSizes.map((size) => (
                <option key={size.size} value={size.size}>
                  {size.size} - ฿{size.price}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ฿{getCurrentPrice()}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            เพิ่มลงตะกร้า
          </button>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${
            product.stock > 50 ? 'bg-green-500' :
            product.stock > 0 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></span>
          <span className="text-sm text-gray-600">
            {product.stock > 50 ? 'มีสินค้า' :
             product.stock > 0 ? `เหลือ ${product.stock} ชิ้น` :
             'สินค้าหมด'}
          </span>
        </div>
      </div>
    </div>
  );
}