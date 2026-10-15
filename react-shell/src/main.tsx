import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Placeholder />,
      },
      {
        path: "products/:id",
        element: <Placeholder />,
      },
      {
        path: "cart",
        element: <Placeholder />,
      },
      {
        path: "orders",
        element: <Placeholder />,
      },
      {
        path: "orders/:id",
        element: <Placeholder />,
      },
      {
        path: "profile",
        element: <Placeholder />,
      },
      {
        path: "*",
        element: (
          <section className="placeholder">
            <h1>404 — Page Not Found</h1>
            <a href="/" className="button primary">
              Back to Home
            </a>
          </section>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
