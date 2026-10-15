import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import "./index.css";
import ProductsRemote from "./pages/ProductsRemote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "products/*", element: <ProductsRemote /> },
      { path: "cart", element: <Placeholder /> },
      { path: "orders/*", element: <Placeholder /> },
      { path: "profile", element: <Placeholder /> },
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
