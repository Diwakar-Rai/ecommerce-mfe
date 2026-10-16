import { Link, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import type { AddToCartDetail } from "./events/cartEvents";
import "./index.css";
import "./App.css";

type AppProps = {
  onAddToCart?: (item: AddToCartDetail) => void;
};

function NotFound() {
  return (
    <section className="empty-state">
      <h1>Page not found</h1>
      <Link to="/products" className="primary-button">
        View Products
      </Link>
    </section>
  );
}

function App({ onAddToCart }: AppProps) {
  return (
    <div className="products-app">
      <Routes>
        <Route index element={<ProductsPage onAddToCart={onAddToCart} />} />
        <Route path=":id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
