import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">CROSS-FRAMEWORK MICROSERVICES UI</p>
      <h1>Everything you need, in one place.</h1>
      <p className="hero-description">
        Explore products, manage your shopping cart, view your orders, and
        update your profile in our microfrontend application.
      </p>

      <div className="hero-actions">
        <Link to="/products" className="button primary">
          Explore Products
        </Link>

        <Link to="/cart" className="button secondary">
          View Cart
        </Link>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <span className="feature-icon">🛍️</span>
          <h2>Products</h2>
          <p>Browse products and add items to your cart.</p>
        </article>

        <article className="feature-card">
          <span className="feature-icon">🛒</span>
          <h2>Shopping Cart</h2>
          <p>Manage quantities and calculate your total.</p>
        </article>

        <article className="feature-card">
          <span className="feature-icon">📦</span>
          <h2>Orders</h2>
          <p>Review your order history and order details.</p>
        </article>

        <article className="feature-card">
          <span className="feature-icon">👤</span>
          <h2>Profile</h2>
          <p>View and edit your account information.</p>
        </article>
      </div>
    </section>
  );
}

export default Home;
