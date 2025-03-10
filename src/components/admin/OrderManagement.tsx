"use client";

import { products } from "@/data/products";
import { CartItem } from "@/types";
import { useState } from "react";

// Mock order status based on the flowchart
type OrderStatus =
  | "pending_payment_verification"
  | "payment_failed"
  | "order_created"
  | "checking_stock"
  | "stock_insufficient"
  | "waiting_for_restock"
  | "preparing_products"
  | "packing"
  | "tracking_added"
  | "shipped"
  | "delivered";

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  paymentMethod: string;
  notes?: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2023-05-10",
    customer: {
      name: "สมศักดิ์ มีทรัพย์",
      email: "somsak@example.com",
      address: "123 ถนนสุขุมวิท, กรุงเทพฯ 10110",
      phone: "081-234-5678",
    },
    items: [
      {
        product: products[0],
        quantity: 2,
        selectedSize: "250g",
      },
      {
        product: products[2],
        quantity: 1,
        selectedSize: "100g",
      },
    ],
    total: 225,
    status: "order_created",
    paymentMethod: "โอนเงิน",
    notes: "ส่งให้เร็วที่สุด",
  },
  {
    id: "ORD-002",
    date: "2023-05-11",
    customer: {
      name: "วรรณา ใจดี",
      email: "wanna@example.com",
      address: "456 ถนนเพชรเกษม, กรุงเทพฯ 10160",
      phone: "089-876-5432",
    },
    items: [
      {
        product: products[3],
        quantity: 1,
      },
    ],
    total: 590,
    status: "pending_payment_verification",
    paymentMethod: "โอนเงิน",
  },
  {
    id: "ORD-003",
    date: "2023-05-09",
    customer: {
      name: "ชัยวัฒน์ วงศ์ขาว",
      email: "chaiwat@example.com",
      address: "789 ถนนรัชดาภิเษก, กรุงเทพฯ 10400",
      phone: "086-543-2109",
    },
    items: [
      {
        product: products[4],
        quantity: 2,
      },
      {
        product: products[5],
        quantity: 3,
      },
    ],
    total: 1030,
    status: "checking_stock",
    paymentMethod: "เก็บเงินปลายทาง",
  },
  {
    id: "ORD-004",
    date: "2023-05-08",
    customer: {
      name: "นภา แก้วใส",
      email: "napa@example.com",
      address: "101 ถนนพหลโยธิน, กรุงเทพฯ 10900",
      phone: "084-321-9876",
    },
    items: [
      {
        product: products[1],
        quantity: 1,
        selectedSize: "500g",
      },
    ],
    total: 230,
    status: "stock_insufficient",
    paymentMethod: "โอนเงิน",
  },
  {
    id: "ORD-005",
    date: "2023-05-07",
    customer: {
      name: "กรรณิการ์ ดอกไม้",
      email: "kannika@example.com",
      address: "202 ถนนสีลม, กรุงเทพฯ 10500",
      phone: "082-109-8765",
    },
    items: [
      {
        product: products[6],
        quantity: 1,
      },
    ],
    total: 500,
    status: "packing",
    paymentMethod: "โอนเงิน",
  },
  {
    id: "ORD-006",
    date: "2023-05-06",
    customer: {
      name: "มนัส ปลอดภัย",
      email: "manat@example.com",
      address: "303 ถนนเจริญกรุง, กรุงเทพฯ 10120",
      phone: "087-654-3210",
    },
    items: [
      {
        product: products[7],
        quantity: 2,
      },
    ],
    total: 460,
    status: "tracking_added",
    trackingNumber: "TH123456789",
    paymentMethod: "โอนเงิน",
  },
  {
    id: "ORD-007",
    date: "2023-05-05",
    customer: {
      name: "รัตนา สุขสมบูรณ์",
      email: "rattana@example.com",
      address: "404 ถนนวิภาวดี, กรุงเทพฯ 10900",
      phone: "083-210-9876",
    },
    items: [
      {
        product: products[0],
        quantity: 3,
        selectedSize: "1kg",
      },
    ],
    total: 840,
    status: "shipped",
    trackingNumber: "TH987654321",
    paymentMethod: "โอนเงิน",
  },
  {
    id: "ORD-008",
    date: "2023-05-04",
    customer: {
      name: "ประภา ผ่องใส",
      email: "prapa@example.com",
      address: "505 ถนนลาดพร้าว, กรุงเทพฯ 10230",
      phone: "085-432-1098",
    },
    items: [
      {
        product: products[2],
        quantity: 2,
        selectedSize: "250g",
      },
      {
        product: products[4],
        quantity: 1,
      },
    ],
    total: 490,
    status: "delivered",
    trackingNumber: "TH567891234",
    paymentMethod: "โอนเงิน",
  },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<OrderStatus | "">("");
  const [isTrackingModal, setIsTrackingModal] = useState<boolean>(true);

  // Filter orders based on selected status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Get human-readable status text
  const getStatusText = (status: OrderStatus): string => {
    const statusMap: Record<OrderStatus, string> = {
      pending_payment_verification: "รอตรวจสอบการชำระเงิน",
      payment_failed: "ชำระเงินไม่สำเร็จ",
      order_created: "สร้างคำสั่งซื้อแล้ว",
      checking_stock: "กำลังตรวจสอบสต๊อก",
      stock_insufficient: "สต๊อกไม่เพียงพอ",
      waiting_for_restock: "รอเติมสต๊อก",
      preparing_products: "กำลังจัดเตรียมสินค้า",
      packing: "กำลังแพ็คสินค้า",
      tracking_added: "เพิ่มเลขติดตามแล้ว",
      shipped: "จัดส่งแล้ว",
      delivered: "ได้รับสินค้าแล้ว",
    };
    return statusMap[status];
  };

  // Get status badge color
  const getStatusColor = (status: OrderStatus): string => {
    const colorMap: Record<OrderStatus, string> = {
      pending_payment_verification: "bg-yellow-100 text-yellow-800",
      payment_failed: "bg-red-100 text-red-800",
      order_created: "bg-blue-100 text-blue-800",
      checking_stock: "bg-purple-100 text-purple-800",
      stock_insufficient: "bg-red-100 text-red-800",
      waiting_for_restock: "bg-orange-100 text-orange-800",
      preparing_products: "bg-indigo-100 text-indigo-800",
      packing: "bg-blue-100 text-blue-800",
      tracking_added: "bg-teal-100 text-teal-800",
      shipped: "bg-green-100 text-green-800",
      delivered: "bg-green-100 text-green-800",
    };
    return colorMap[status];
  };

  // Get next possible statuses based on current status
  const getNextPossibleStatuses = (status: OrderStatus): OrderStatus[] => {
    const statusFlow: Record<OrderStatus, OrderStatus[]> = {
      pending_payment_verification: ["payment_failed", "order_created"],
      payment_failed: ["order_created"],
      order_created: ["checking_stock"],
      checking_stock: ["stock_insufficient", "preparing_products"],
      stock_insufficient: ["waiting_for_restock"],
      waiting_for_restock: ["checking_stock"],
      preparing_products: ["packing"],
      packing: ["tracking_added"],
      tracking_added: ["shipped"],
      shipped: ["delivered"],
      delivered: [],
    };
    return statusFlow[status] || [];
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Add tracking number
  const addTrackingNumber = (orderId: string) => {
    if (!trackingNumber.trim()) return;

    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              trackingNumber: trackingNumber,
              status: "tracking_added",
            }
          : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        trackingNumber: trackingNumber,
        status: "tracking_added",
      });
    }

    setTrackingNumber("");
    setIsModalOpen(false);
  };

  // Check if all items are in stock
  const areAllItemsInStock = (orderItems: CartItem[]): boolean => {
    return orderItems.every((item) => item.product.stock >= item.quantity);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">จัดการคำสั่งซื้อ</h2>

      {/* Filter controls */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          กรองตามสถานะ:
        </label>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as OrderStatus | "all")
          }
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">ทั้งหมด</option>
          <option value="pending_payment_verification">
            รอตรวจสอบการชำระเงิน
          </option>
          <option value="payment_failed">ชำระเงินไม่สำเร็จ</option>
          <option value="order_created">สร้างคำสั่งซื้อแล้ว</option>
          <option value="checking_stock">กำลังตรวจสอบสต๊อก</option>
          <option value="stock_insufficient">สต๊อกไม่เพียงพอ</option>
          <option value="waiting_for_restock">รอเติมสต๊อก</option>
          <option value="preparing_products">กำลังจัดเตรียมสินค้า</option>
          <option value="packing">กำลังแพ็คสินค้า</option>
          <option value="tracking_added">เพิ่มเลขติดตามแล้ว</option>
          <option value="shipped">จัดส่งแล้ว</option>
          <option value="delivered">ได้รับสินค้าแล้ว</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Orders list */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-medium mb-4">รายการคำสั่งซื้อ</h3>

          <div className="overflow-x-auto border border-gray-100 rounded-md shadow-sm">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ลูกค้า
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ยอดรวม
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-2 sm:px-4 py-4 text-center text-sm text-gray-500"
                    >
                      ไม่พบรายการคำสั่งซื้อ
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedOrder?.id === order.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {order.customer.name}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        ฿{order.total.toLocaleString()}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order details */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-medium mb-4">รายละเอียดคำสั่งซื้อ</h3>

          {!selectedOrder ? (
            <div className="border border-gray-100 rounded-md p-4 sm:p-6 text-center text-gray-500 shadow-sm">
              เลือกคำสั่งซื้อเพื่อดูรายละเอียด
            </div>
          ) : (
            <div className="border border-gray-100 rounded-md p-4 sm:p-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                <div>
                  <h4 className="text-lg font-medium">{selectedOrder.id}</h4>
                  <p className="text-sm text-gray-500">
                    วันที่: {selectedOrder.date}
                  </p>
                </div>
                <div className="flex items-center">
                  {isEditingStatus ? (
                    <div className="flex items-center">
                      <select
                        value={editStatus}
                        onChange={(e) =>
                          setEditStatus(e.target.value as OrderStatus)
                        }
                        className="text-xs border border-gray-200 rounded-md mr-2 p-1"
                      >
                        <option value="" disabled>
                          เลือกสถานะ
                        </option>
                        <option value="pending_payment_verification">
                          รอตรวจสอบการชำระเงิน
                        </option>
                        <option value="payment_failed">
                          ชำระเงินไม่สำเร็จ
                        </option>
                        <option value="order_created">
                          สร้างคำสั่งซื้อแล้ว
                        </option>
                        <option value="checking_stock">
                          กำลังตรวจสอบสต๊อก
                        </option>
                        <option value="stock_insufficient">
                          สต๊อกไม่เพียงพอ
                        </option>
                        <option value="waiting_for_restock">รอเติมสต๊อก</option>
                        <option value="preparing_products">
                          กำลังจัดเตรียมสินค้า
                        </option>
                        <option value="packing">กำลังแพ็คสินค้า</option>
                        <option value="tracking_added">
                          เพิ่มเลขติดตามแล้ว
                        </option>
                        <option value="shipped">จัดส่งแล้ว</option>
                        <option value="delivered">ได้รับสินค้าแล้ว</option>
                      </select>
                      <button
                        onClick={() => {
                          if (editStatus !== "") {
                            updateOrderStatus(
                              selectedOrder.id,
                              editStatus as OrderStatus
                            );
                            setIsEditingStatus(false);
                          }
                        }}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => setIsEditingStatus(false)}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded ml-1"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {getStatusText(selectedOrder.status)}
                      </span>
                      <button
                        onClick={() => {
                          setEditStatus(selectedOrder.status);
                          setIsEditingStatus(true);
                        }}
                        className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Customer info */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h5 className="font-medium mb-2">ข้อมูลลูกค้า</h5>
                <div className="space-y-1">
                  <p className="text-sm">{selectedOrder.customer.name}</p>
                  <p className="text-sm">{selectedOrder.customer.email}</p>
                  <p className="text-sm">{selectedOrder.customer.phone}</p>
                  <p className="text-sm break-words">
                    {selectedOrder.customer.address}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h5 className="font-medium mb-2">รายการสินค้า</h5>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 flex-shrink-0 mr-3">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/100x100?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} ชิ้น{" "}
                          {item.selectedSize ? `(${item.selectedSize})` : ""}
                        </p>
                      </div>
                      <p className="text-sm font-medium ml-2">
                        ฿
                        {(
                          item.product.basePrice * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                  <p className="font-medium">ยอดรวม</p>
                  <p className="font-medium">
                    ฿{selectedOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h5 className="font-medium mb-2">ดำเนินการ</h5>
                <div className="flex flex-wrap gap-2">
                  {/* Update status buttons based on flow */}
                  {getNextPossibleStatuses(selectedOrder.status).map(
                    (nextStatus) => (
                      <button
                        key={nextStatus}
                        onClick={() =>
                          updateOrderStatus(selectedOrder.id, nextStatus)
                        }
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                      >
                        {nextStatus === "preparing_products"
                          ? "เตรียมสินค้า"
                          : nextStatus === "packing"
                          ? "แพ็คสินค้า"
                          : nextStatus === "tracking_added"
                          ? "เพิ่มเลขติดตาม"
                          : nextStatus === "shipped"
                          ? "จัดส่งสินค้า"
                          : nextStatus === "delivered"
                          ? "ยืนยันการรับสินค้า"
                          : nextStatus === "payment_failed"
                          ? "แจ้งปัญหาการชำระเงิน"
                          : nextStatus === "order_created"
                          ? "ยืนยันการชำระเงิน"
                          : nextStatus === "checking_stock"
                          ? "ตรวจสอบสต๊อก"
                          : nextStatus === "stock_insufficient"
                          ? "แจ้งสต๊อกไม่พอ"
                          : nextStatus === "waiting_for_restock"
                          ? "รอเติมสต๊อก"
                          : "อัพเดทสถานะ"}
                      </button>
                    )
                  )}

                  {/* Special case for tracking number */}
                  {selectedOrder.status === "packing" &&
                    !selectedOrder.trackingNumber && (
                      <button
                        onClick={() => {
                          setTrackingNumber("");
                          setIsTrackingModal(true);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        เพิ่มเลขติดตาม
                      </button>
                    )}
                </div>

                {/* Automated stock check */}
                {selectedOrder.status === "checking_stock" && (
                  <div className="mt-3 p-3 border border-gray-100 rounded-md bg-gray-50">
                    <p className="text-sm font-medium mb-2">
                      ผลการตรวจสอบสต๊อก:
                    </p>
                    {areAllItemsInStock(selectedOrder.items) ? (
                      <div className="flex items-center text-green-600">
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-sm">สินค้ามีเพียงพอในสต๊อก</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-sm">
                          สินค้าบางรายการมีไม่เพียงพอในสต๊อก
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          selectedOrder.id,
                          areAllItemsInStock(selectedOrder.items)
                            ? "preparing_products"
                            : "stock_insufficient"
                        )
                      }
                      className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                    >
                      อัพเดทสถานะอัตโนมัติ
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for tracking number */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md shadow-md">
            <h3 className="text-lg font-medium mb-4">
              {isTrackingModal
                ? selectedOrder.trackingNumber
                  ? "แก้ไขเลขติดตามพัสดุ"
                  : "เพิ่มเลขติดตามพัสดุ"
                : "แก้ไขสถานะ"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลขติดตามพัสดุ
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="กรอกเลขติดตามพัสดุ"
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => addTrackingNumber(selectedOrder.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
