
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped";
  items: OrderItem[];
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    date: "2026-10-10",
    status: "Delivered",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 2499 },
      { name: "Travel Backpack", quantity: 1, price: 1599 },
    ],
  },
  {
    id: "ORD-1002",
    date: "2026-10-12",
    status: "Processing",
    items: [
      { name: "Smart Watch", quantity: 1, price: 3999 },
    ],
  },
  {
    id: "ORD-1003",
    date: "2026-10-14",
    status: "Shipped",
    items: [
      { name: "Running Shoes", quantity: 2, price: 2199 },
    ],
  },
];
