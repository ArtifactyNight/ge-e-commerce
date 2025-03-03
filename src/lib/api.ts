export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Sample data - in a real app, this would be fetched from a database or API
const products: Product[] = [
  {
    id: "1",
    name: "มะม่วงน้ำดอกไม้",
    description: "มะม่วงน้ำดอกไม้สดจากสวน รสชาติหวานอร่อย เนื้อเหนียวนุ่ม",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผลไม้",
  },
  {
    id: "2",
    name: "มะพร้าวน้ำหอม",
    description: "มะพร้าวน้ำหอมสด หวานฉ่ำ น้ำเยอะ เก็บสดจากสวน",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1581337204873-1a68fa1c4ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผลไม้",
  },
  {
    id: "3",
    name: "มะเขือเทศราชินี",
    description: "มะเขือเทศราชินีสด ปลูกแบบออร์แกนิค ไร้สารเคมี",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1577281747309-343a48aed858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผัก",
  },
  {
    id: "4",
    name: "มะเขือยาว",
    description: "มะเขือยาวออร์แกนิค สด สะอาด ปลอดภัย",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1635282404702-9dff33395c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผัก",
  },
  {
    id: "5",
    name: "มะนาวแป้น",
    description: "มะนาวแป้นพันธุ์ดี น้ำเยอะ เปลือกบาง",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผลไม้",
  },
  {
    id: "6",
    name: "มะเฟือง",
    description: "มะเฟืองหวานฉ่ำ เนื้อกรอบ รสชาติหวานอมเปรี้ยว",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1600649618200-6d42212edfc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "ผลไม้",
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products.find((product) => product.id === id) || null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.filter((product) => product.category === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
  );
}
