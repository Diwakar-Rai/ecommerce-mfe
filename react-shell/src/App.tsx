import { NavLink, Outlet } from "react-router-dom";
import "./app.css";
const navigation = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Cart", path: "/cart" },
  { label: "Orders", path: "/orders" },
  { label: "Profile", path: "/profile" },
];

function App() {
  // Temporary value. We will connect this to shared cart state later.
  const cartCount = 0;

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">E</span>
          <span>Ecommerce MFE</span>
        </NavLink>

        <nav className="navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
              {item.path === "/cart" && (
                <span className="cart-count">{cartCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Ecommerce MFE · React · Angular · Native Federation</p>
      </footer>
    </div>
  );
}

export default App;
