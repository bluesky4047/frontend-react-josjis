import React from 'react';
import Sidebar from './Sidebar';
import { OrderProvider } from "../../services/adminOrders/orderContext";

const AdminLayout = ({ children }) => {
  return (
    <OrderProvider>

      <div className="min-h-screen bg-black flex">
        <Sidebar />

        <main className="ml-[360px] flex-1 min-h-screen relative overflow-hidden">
          <img
            alt=""
            className="absolute inset-0 object-cover opacity-30 pointer-events-none size-full"
            src="/admin/admin_bg.png"
          />

          <div className="relative z-10">
            {children}
          </div>
        </main>

      </div>

    </OrderProvider>
  );
};

export default AdminLayout;
