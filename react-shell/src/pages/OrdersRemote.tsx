
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRemoteModule } from "../federation";

function OrdersRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const detail = (
        event as CustomEvent<{ pathname: string }>
      ).detail;

      if (detail?.pathname && detail.pathname !== location.pathname) {
        navigate(detail.pathname);
      }
    };

    window.addEventListener(
      "ecommerce:orders-navigate",
      handleNavigation,
    );

    window.dispatchEvent(
      new CustomEvent("ecommerce:shell-navigation", {
        detail: { pathname: location.pathname },
      }),
    );

    return () => {
      window.removeEventListener(
        "ecommerce:orders-navigate",
        handleNavigation,
      );
    };
  }, [location.pathname, navigate]);

  useEffect(() => {
    let active = true;

    loadRemoteModule("angular-orders", "./OrdersElement")
      .then(() => {
        if (active) setLoaded(true);
      }).catch((err: unknown) => {
  console.error("Orders federation loading failed:", err);

  if (active) {
    setError(
      err instanceof Error
        ? `${err.message}. Check the browser console for details.`
        : String(err),
    );
  }
});

    return () => {
      active = false;
    };
  }, []);

  if (error) return <p>Could not load Orders: {error}</p>;
  if (!loaded) return <p>Loading Orders...</p>;

  return <angular-orders />;
}

export default OrdersRemote;
