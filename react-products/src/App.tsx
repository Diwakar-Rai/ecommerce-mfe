
import { Link, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import "./App.css";

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

function App() {
  return (
    <div className="products-app">
      <Routes>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
