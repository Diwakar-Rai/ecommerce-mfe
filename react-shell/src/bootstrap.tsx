import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const ProductsRemote = lazy(() => import("./pages/ProductsRemote"));
const CartRemote = lazy(() => import("./pages/CartRemote"));
const OrdersRemote = lazy(() => import("./pages/OrdersRemote"));
const ProfileRemote = lazy(() => import("./pages/ProfileRemote"));

function withLoadingFallback(
  name: string,
  element: React.ReactNode,
) {
  return (
    <ErrorBoundary name={name}>
      <Suspense fallback={<LoadingFallback name={name} />}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: withLoadingFallback("Home", <Home />),
      },
      {
        path: "products/*",
        element: withLoadingFallback("Products", <ProductsRemote />),
      },
      {
        path: "cart",
        element: withLoadingFallback("Cart", <CartRemote />),
      },
      {
        path: "orders/*",
        element: withLoadingFallback("Orders", <OrdersRemote />),
      },
      {
        path: "profile",
        element: withLoadingFallback("Profile", <ProfileRemote />),
      },
      {
        path: "*",
        element: <h1>404 — Page Not Found</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
