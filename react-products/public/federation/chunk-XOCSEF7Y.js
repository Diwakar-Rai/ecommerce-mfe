// src/App.tsx
import { Link as Link3, Route, Routes } from "react-router-dom";

// src/pages/ProductsPage.tsx
import { Link } from "react-router-dom";

// src/data/products.ts
var products = [
  {
    id: "101",
    name: "Wireless Headphones",
    description: "Comfortable headphones with immersive sound and long battery life.",
    price: 2499,
    category: "Electronics",
    emoji: "\u{1F3A7}"
  },
  {
    id: "102",
    name: "Smart Watch",
    description: "Track your activity, monitor your goals, and stay connected.",
    price: 3999,
    category: "Electronics",
    emoji: "\u231A"
  },
  {
    id: "103",
    name: "Running Shoes",
    description: "Lightweight everyday running shoes with cushioned support.",
    price: 2199,
    category: "Fashion",
    emoji: "\u{1F45F}"
  },
  {
    id: "104",
    name: "Travel Backpack",
    description: "A versatile backpack for work, travel, and everyday essentials.",
    price: 1599,
    category: "Accessories",
    emoji: "\u{1F392}"
  },
  {
    id: "105",
    name: "Mechanical Keyboard",
    description: "A responsive keyboard designed for productivity and gaming.",
    price: 3299,
    category: "Electronics",
    emoji: "\u2328\uFE0F"
  },
  {
    id: "106",
    name: "Coffee Maker",
    description: "Make your morning coffee with a compact countertop brewer.",
    price: 2799,
    category: "Home",
    emoji: "\u2615"
  }
];

// src/events/cartEvents.ts
var CART_ADD_EVENT = "ecommerce:cart-add";
function addToCart(detail) {
  window.dispatchEvent(
    new CustomEvent(CART_ADD_EVENT, {
      detail
    })
  );
}

// src/pages/ProductsPage.tsx
function ProductsPage({ onAddToCart }) {
  console.log("[ProductsPage] Rendered; callback:", typeof onAddToCart);
  function handleAddToCart(product) {
    console.log("[ProductsPage] Button clicked:", product.name);
    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    };
    if (onAddToCart) {
      console.log("[ProductsPage] Shell callback exists");
      onAddToCart(item);
    } else {
      console.log("[ProductsPage] Shell callback is missing; using fallback");
      addToCart(item);
    }
  }
  return /* @__PURE__ */ React.createElement("section", { className: "products-page" }, /* @__PURE__ */ React.createElement("div", { className: "page-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "OUR COLLECTION"), /* @__PURE__ */ React.createElement("h1", null, "Discover Products"), /* @__PURE__ */ React.createElement("p", { className: "muted" }, "Find something you'll love.")), /* @__PURE__ */ React.createElement("span", { className: "product-count" }, products.length, " products")), /* @__PURE__ */ React.createElement("div", { className: "product-grid" }, products.map((product) => /* @__PURE__ */ React.createElement("article", { className: "product-card", key: product.id }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: `/${product.id}`,
      className: "product-art",
      "aria-label": `View ${product.name}`
    },
    /* @__PURE__ */ React.createElement("span", null, product.emoji)
  ), /* @__PURE__ */ React.createElement("div", { className: "product-info" }, /* @__PURE__ */ React.createElement("p", { className: "category" }, product.category), /* @__PURE__ */ React.createElement(Link, { to: `/${product.id}`, className: "product-name" }, product.name), /* @__PURE__ */ React.createElement("p", { className: "product-description" }, product.description), /* @__PURE__ */ React.createElement("div", { className: "product-card-footer" }, /* @__PURE__ */ React.createElement("strong", null, "\u20B9", product.price.toLocaleString("en-IN")), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "add-button",
      onClick: () => handleAddToCart(product)
    },
    "Add to Cart"
  )))))));
}
var ProductsPage_default = ProductsPage;

// src/pages/ProductDetailsPage.tsx
import { Link as Link2 } from "react-router-dom";
function ProductsPage2({ onAddToCart }) {
  function handleAddToCart(product) {
    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    };
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      addToCart(item);
    }
  }
  return /* @__PURE__ */ React.createElement("section", { className: "products-page" }, /* @__PURE__ */ React.createElement("div", { className: "page-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "OUR COLLECTION"), /* @__PURE__ */ React.createElement("h1", null, "Discover Products"), /* @__PURE__ */ React.createElement("p", { className: "muted" }, "Find something you'll love.")), /* @__PURE__ */ React.createElement("span", { className: "product-count" }, products.length, " products")), /* @__PURE__ */ React.createElement("div", { className: "product-grid" }, products.map((product) => /* @__PURE__ */ React.createElement("article", { className: "product-card", key: product.id }, /* @__PURE__ */ React.createElement(
    Link2,
    {
      to: `/${product.id}`,
      className: "product-art",
      "aria-label": `View ${product.name}`
    },
    /* @__PURE__ */ React.createElement("span", null, product.emoji)
  ), /* @__PURE__ */ React.createElement("div", { className: "product-info" }, /* @__PURE__ */ React.createElement("p", { className: "category" }, product.category), /* @__PURE__ */ React.createElement(Link2, { to: `/${product.id}`, className: "product-name" }, product.name), /* @__PURE__ */ React.createElement("p", { className: "product-description" }, product.description), /* @__PURE__ */ React.createElement("div", { className: "product-card-footer" }, /* @__PURE__ */ React.createElement("strong", null, "\u20B9", product.price.toLocaleString("en-IN")), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "add-button",
      onClick: () => handleAddToCart(product)
    },
    "Add to Cart"
  )))))));
}
var ProductDetailsPage_default = ProductsPage2;

// src/App.tsx
function NotFound() {
  return /* @__PURE__ */ React.createElement("section", { className: "empty-state" }, /* @__PURE__ */ React.createElement("h1", null, "Page not found"), /* @__PURE__ */ React.createElement(Link3, { to: "/products", className: "primary-button" }, "View Products"));
}
function App({ onAddToCart }) {
  return /* @__PURE__ */ React.createElement("div", { className: "products-app" }, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { index: true, element: /* @__PURE__ */ React.createElement(ProductsPage_default, { onAddToCart }) }), /* @__PURE__ */ React.createElement(Route, { path: ":id", element: /* @__PURE__ */ React.createElement(ProductDetailsPage_default, null) }), /* @__PURE__ */ React.createElement(Route, { path: "*", element: /* @__PURE__ */ React.createElement(NotFound, null) })));
}
var App_default = App;

export {
  App_default
};
//# sourceMappingURL=chunk-XOCSEF7Y.js.map
