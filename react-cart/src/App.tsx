
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/cartPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="cart-app">
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<CartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
