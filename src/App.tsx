import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { products } from "./data/products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "food", name: "🥥 ผลิตภัณฑ์อาหารและเครื่องดื่ม" },
    { id: "crafts", name: "🏠 ผลิตภัณฑ์จากใบและก้านตาล" },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const HomePage = () => (
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

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <footer className="bg-white mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  เกี่ยวกับเรา
                </h3>
                <p className="text-gray-600">
                  ผลิตภัณฑ์คุณภาพจากชุมชนตำบลมะเริง
                  เน้นการผลิตที่ยั่งยืนและคุณภาพที่เป็นเลิศ
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ติดต่อเรา
                </h3>
                <p className="text-gray-600">
                  อีเมล: info@maroeng.com
                  <br />
                  โทร: 044-123-4567
                  <br />
                  ที่อยู่: ตำบลมะเริง อำเภอเมือง จังหวัดนครราชสีมา
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ติดตามเรา
                </h3>
                <div className="space-x-4">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Line
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
              © 2024 ผลิตภัณฑ์ชุมชนตำบลมะเริง. สงวนลิขสิทธิ์.
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
