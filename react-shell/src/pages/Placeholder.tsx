import { Link, useLocation } from "react-router-dom";

function Placeholder() {
  const location = useLocation();

  const pageNames: Record<string, string> = {
    "/products": "Products",
    "/cart": "Shopping Cart",
    "/orders": "Orders",
    "/profile": "Profile",
  };

  const pageName = pageNames[location.pathname] ?? "This page";

  return (
    <section className="placeholder">
      <span className="placeholder-icon">🚧</span>
      <h1>{pageName}</h1>
      <p>
        The React shell is ready. We will connect this feature to its
        microfrontend in the next steps.
      </p>
      <Link to="/" className="button primary">
        Back to Home
      </Link>
    </section>
  );
}

export default Placeholder;
