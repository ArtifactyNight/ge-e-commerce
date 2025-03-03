import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "น้ำตาลตาลผง",
    category: "food",
    basePrice: 35,
    description:
      "น้ำตาลตาลผงบริสุทธิ์ 100% จากต้นตาลโตนดธรรมชาติ หวานละมุน กลิ่นหอม",
    imageUrl: "https://images.unsplash.com/photo-1581929955747-00673a04f2c8",
    stock: 150,
    isBestSeller: true,
    packagingSizes: [
      { size: "100g", price: 35 },
      { size: "250g", price: 80 },
      { size: "500g", price: 150 },
      { size: "1kg", price: 280 },
    ],
  },
  {
    id: "2",
    name: "น้ำผึ้งดอกตาล",
    category: "food",
    basePrice: 120,
    description: "น้ำผึ้งดอกตาลแท้ 100% เก็บจากดอกตาลธรรมชาติ รสชาติหวานละมุน",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    stock: 80,
    isNew: true,
    packagingSizes: [
      { size: "250g", price: 120 },
      { size: "500g", price: 230 },
      { size: "1kg", price: 450 },
    ],
  },
  {
    id: "3",
    name: "ตาลอบแห้ง",
    category: "food",
    basePrice: 45,
    description:
      "ลูกตาลอบแห้ง หวานธรรมชาติ ไม่เติมน้ำตาล อุดมด้วยวิตามินและแร่ธาตุ",
    imageUrl: "https://images.unsplash.com/photo-1596073419667-9d77d59f033f",
    stock: 100,
    packagingSizes: [
      { size: "100g", price: 45 },
      { size: "250g", price: 100 },
      { size: "500g", price: 190 },
    ],
  },
  {
    id: "4",
    name: "กระเป๋าสานจากใบตาล",
    category: "crafts",
    basePrice: 590,
    description: "กระเป๋าสานจากใบตาลแท้ ทำด้วยมือ ดีไซน์ทันสมัย ทนทาน",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 25,
    isNew: true,
  },
  {
    id: "5",
    name: "หมวกสานจากใบตาล",
    category: "crafts",
    basePrice: 290,
    description: "หมวกสานจากใบตาล ระบายอากาศดี น้ำหนักเบา เหมาะกับทุกโอกาส",
    imageUrl: "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f",
    stock: 45,
    isBestSeller: true,
  },
];
