import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์ชุมชนตำบลมะเริง",
  description:
    "ผลิตภัณฑ์คุณภาพจากชุมชนตำบลมะเริง เน้นการผลิตที่ยั่งยืนและคุณภาพที่เป็นเลิศ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gray-100">
        <CartProvider>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <main>{children}</main>
          </Suspense>
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
        </CartProvider>
      </body>
    </html>
  );
}
