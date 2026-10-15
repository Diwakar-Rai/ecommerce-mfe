import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRemoteModule } from "../federation";
import LoadingFallback from "../components/LoadingFallback";
import RemoteErrorFallback from "../components/RemoteErrorFallback";

function OrdersRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

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

    window.addEventListener("ecommerce:orders-navigate", handleNavigation);

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

    async function start() {
      setLoaded(false);
      setError("");

      try {
        await loadRemoteModule("angular-orders", "./OrdersElement");

        if (active) setLoaded(true);
      } catch (err) {
        console.error("Orders federation loading failed:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load Orders.",
          );
        }
      }
    }

    void start();

    return () => {
      active = false;
    };
  }, [retryCount]);

  if (error) {
    return (
      <RemoteErrorFallback
        name="Orders"
        message={error}
        onRetry={() => setRetryCount((count) => count + 1)}
      />
    );
  }

  if (!loaded) return <LoadingFallback name="Orders" />;

  return <angular-orders />;
}

export default OrdersRemote;