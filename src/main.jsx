import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { router } from "./app/router";
import { AuthProvider } from "./services/auth/authContext.jsx";
import { ProductProvider } from "./services/adminProducts/productContext";
import { OrderProvider } from "./services/adminOrders/orderContext";
import { RatingProvider } from "./services/adminRating/ratingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
