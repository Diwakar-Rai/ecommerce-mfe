
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
}

export const products: Product[] = [
  {
    id: "101",
    name: "Wireless Headphones",
    description: "Comfortable headphones with immersive sound and long battery life.",
    price: 2499,
    category: "Electronics",
    emoji: "🎧",
  },
  {
    id: "102",
    name: "Smart Watch",
    description: "Track your activity, monitor your goals, and stay connected.",
    price: 3999,
    category: "Electronics",
    emoji: "⌚",
  },
  {
    id: "103",
    name: "Running Shoes",
    description: "Lightweight everyday running shoes with cushioned support.",
    price: 2199,
    category: "Fashion",
    emoji: "👟",
  },
  {
    id: "104",
    name: "Travel Backpack",
    description: "A versatile backpack for work, travel, and everyday essentials.",
    price: 1599,
    category: "Accessories",
    emoji: "🎒",
  },
  {
    id: "105",
    name: "Mechanical Keyboard",
    description: "A responsive keyboard designed for productivity and gaming.",
    price: 3299,
    category: "Electronics",
    emoji: "⌨️",
  },
  {
    id: "106",
    name: "Coffee Maker",
    description: "Make your morning coffee with a compact countertop brewer.",
    price: 2799,
    category: "Home",
    emoji: "☕",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
