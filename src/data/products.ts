import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "น้ำตาลตาลผง",
    category: "food",
    basePrice: 35,
    description:
      "น้ำตาลตาลผงบริสุทธิ์ 100% จากต้นตาลโตนดธรรมชาติ หวานละมุน กลิ่นหอม",
    imageUrl:
      "https://www.ตลาดเกษตรกรออนไลน์.com/uploads/products/cover_63d24c8972ec8.jpg",
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
    name: "น้ำช่อดอกตาล",
    category: "food",
    basePrice: 80,
    description:
      "น้ำตาลบริสุทธิ์ 100% จากต้นตาลโตนดธรรมชาติ หวานละมุน กลิ่นหอม",
    imageUrl: "/images/water.jpeg",
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
    imageUrl:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t1.6435-9/56191415_1974373376006584_95315992997003264_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CNk_i9DBVD4Q7kNvgGqapzK&_nc_oc=Adi_31wQezce3SpSRLNgl934lA8FS5zoRSakOWTAAUICBQVAjVqWZE5bdmJZCBUfkZU&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=AlwUHTK_AQCk-4dutLlcuHy&oh=00_AYAuIIRLuKedBAmjySGBy904ZOyAphzV1Bn2TjxZM0rgkA&oe=67ECDA93",
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
    imageUrl:
      "https://archive-api.sacit.or.th/images/handicraft/sacict-handicraft-0743-002655.jpg",
    stock: 25,
    isNew: true,
  },
  {
    id: "5",
    name: "หมวกสานจากใบตาล",
    category: "crafts",
    basePrice: 290,
    description: "หมวกสานจากใบตาล ระบายอากาศดี น้ำหนักเบา เหมาะกับทุกโอกาส",
    imageUrl:
      "https://down-th.img.susercontent.com/file/77b5b46f3ebced299d29a6c2cb71956b",
    stock: 45,
    isBestSeller: true,
  },
  {
    id: "6",
    name: "พัดใบตาล",
    category: "crafts",
    basePrice: 150,
    description: "กระเป๋าสานจากใบตาลแท้ ทำด้วยมือ ดีไซน์ทันสมัย ทนทาน",
    imageUrl:
      "https://souvenirbuu.wordpress.com/wp-content/uploads/2011/08/e0b983e0b89ae0b895e0b8b2e0b8a5.jpg",
    stock: 25,
    isNew: true,
  },
  {
    id: "7",
    name: "เสื่อจากใบตาล",
    category: "crafts",
    basePrice: 500,
    description: "เสื่อที่ทอมาจากใบตาล",
    imageUrl:
      "https://media.istockphoto.com/id/2193526500/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%81%E0%B8%9C%E0%B9%88%E0%B8%99%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%96%E0%B8%B1%E0%B8%81%E0%B8%9A%E0%B8%99%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0.jpg?s=2048x2048&w=is&k=20&c=HL_F4sTot4-Cg-2nAXE4SgbHfa2QJ7yBcLm6KFvjpmY=",
    stock: 25,
    isNew: true,
  },
  {
    id: "8",
    name: "กระติ๊บข้าวใบตาล",
    category: "crafts",
    basePrice: 230,
    description: "ใช้ใบตาลมาทำกระติ๊บข้าว โดยจะมีความแข็งแรงและทนทาน",
    imageUrl:
      "https://www.baanmaha.com/blog/wp-content/uploads/2013/12/kratip.jpg",
    stock: 80,
    isNew: true,
  },
];
