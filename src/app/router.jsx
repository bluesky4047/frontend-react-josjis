import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Auth
import PrivateAuth from "../services/auth/PrivateAuth";
import PublicAuth from "../services/auth/PublicAuth";

// Customer Pages
const Login = React.lazy(() => import("../pages/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const Menu = React.lazy(() => import("../pages/Menu"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Checkout = React.lazy(() => import("../pages/Checkout"));
const PaymentQRIS = React.lazy(() => import("../pages/PaymentQRIS"));
const PaymentCash = React.lazy(() => import("../pages/PaymentCash"));
const OrderStatusCustomer = React.lazy(
  () => import("../pages/OrderStatusCustomer"),
);
const Success = React.lazy(() => import("../pages/Success"));

// Admin Pages
const AdminLogin = React.lazy(() => import("../pages/admin/AdminLogin"));
const Dashboard = React.lazy(() => import("../pages/admin/Dashboard"));
const ManagementMenu = React.lazy(
  () => import("../pages/admin/ManagementMenu"),
);
const AddEditMenu = React.lazy(() => import("../pages/admin/AddEditMenu"));
const Orders = React.lazy(() => import("../pages/admin/Orders"));
const OrderDetail = React.lazy(() => import("../pages/admin/OrderDetail"));
const OrderStatus = React.lazy(() => import("../pages/admin/OrderStatus"));
const RatingReview = React.lazy(() => import("../pages/admin/RatingReview"));

const Unauthorized = React.lazy(() => import("../pages/Unauthorized"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

// Provider
import { ProductProvider } from "../services/adminProducts/productContext";
import { OrderProvider } from "../services/adminOrders/orderContext";
import { RatingProvider } from "../services/adminRating/ratingsContext";

import { CustomerProductProvider } from "../services/customerProducts/customerProductContext";

export const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: (
      <PublicAuth>
        <Login />
      </PublicAuth>
    ),
  },

  {
    path: "/admin/login",
    element: (
      <PublicAuth>
        <AdminLogin />
      </PublicAuth>
    ),
  },

  // CUSTOMER ROUTES
  {
    children: [
      {
        path: "/home",
        element: (
          <CustomerProductProvider>
            <Home />
          </CustomerProductProvider>
        ),
      },
      {
        path: "/menu",
        element: (
          <CustomerProductProvider>
            <Menu />
          </CustomerProductProvider>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <CustomerProductProvider>
            <ProductDetail />
          </CustomerProductProvider>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment/qris",
        element: <PaymentQRIS />,
      },
      {
        path: "/payment/cash",
        element: <PaymentCash />,
      },
      {
        path: "/status",
        element: <OrderStatusCustomer />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    element: (
      <PrivateAuth>
        <ProductProvider>
          <Dashboard />
        </ProductProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/menu",
    element: (
      <PrivateAuth>
        <ProductProvider>
          <ManagementMenu />
        </ProductProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/menu/add",
    element: (
      <PrivateAuth>
        <ProductProvider>
          <AddEditMenu />
        </ProductProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/menu/edit/:id",
    element: (
      <PrivateAuth>
        <ProductProvider>
          <AddEditMenu />
        </ProductProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <PrivateAuth>
        <OrderProvider>
          <Orders />
        </OrderProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/order/:id",
    element: (
      <PrivateAuth>
        <OrderProvider>
          <OrderDetail />
        </OrderProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/status",
    element: (
      <PrivateAuth>
        <OrderProvider>
          <OrderStatus />
        </OrderProvider>
      </PrivateAuth>
    ),
  },
  {
    path: "/admin/reviews",
    element: (
      <PrivateAuth>
        <RatingProvider>
          <RatingReview />
        </RatingProvider>
      </PrivateAuth>
    ),
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
