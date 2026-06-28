import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/authContext";
import { useOrders } from "../../services/adminOrders/orderContext";

const imgVector = "/admin/reviews.svg";
const imgGroup = "/admin/status.svg";
const imgVector1 = "/admin/orders.svg";
const imgVector2 = "/admin/logout.svg";
const imgVector4 = "/admin/edit.svg";
const imgVector5 = "/admin/dashboard.svg";

function MaterialSymbolsStarRounded({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector}
      />
    </div>
  );
}

function MingcuteTimeFill({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgGroup}
      />
    </div>
  );
}

function LetsIconsOrderFill({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector1}
      />
    </div>
  );
}

function MaterialSymbolsEdit({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector4}
      />
    </div>
  );
}

function MaterialSymbolsLightDashboardRounded({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector5}
      />
    </div>
  );
}

function EntypoLogOut({ className }) {
  return (
    <div
      className={
        className || "relative size-[30px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector2}
      />
    </div>
  );
}

const Sidebar = () => {
  const navigate = useNavigate();

  const orderContext = useOrders();

  console.log("ORDER CONTEXT:", orderContext);

  const { orders = [] } = orderContext || {};

  const pendingCount = orders.filter(
    (o) => o.status === "pending"
  ).length;
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: MaterialSymbolsLightDashboardRounded },
    { name: "Manajemen Menu", path: "/admin/menu", icon: MaterialSymbolsEdit },
    { name: "Pesanan", path: "/admin/orders", icon: LetsIconsOrderFill, hasBadge: true },
    { name: "Status Pesanan", path: "/admin/status", icon: MingcuteTimeFill },
    { name: "Rating & Review", path: "/admin/reviews", icon: MaterialSymbolsStarRounded },
  ];

  const { user, logout } = useAuth();

  return (
    <div className="w-[360px] bg-gradient-to-b from-[#770001] via-[#770001] via-80% to-[#b30001] h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col justify-between py-10 px-8 text-white z-50">
      
      {/* Bagian Atas: Judul & Navigasi */}
      <div>
        <div className="mb-8">
          <h1 className="font-paytone text-3xl font-black uppercase leading-tight tracking-tight">
            JOS JIS - Dashboard Admin
          </h1>
        </div>

        <nav className="flex flex-col">
          <hr className="border-white/20 mb-3" />

          {menuItems.map((item) => (
            <React.Fragment key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl transition-all text-white ${
                    isActive 
                      ? "bg-white/10 border border-white/20 font-bold" 
                      : "hover:bg-white/5"
                  }`
                }
              >
                <div className="flex items-center gap-5">
                  <item.icon className="size-8 shrink-0" />
                  <span className="font-roboto font-medium text-xl">
                    {item.name}
                  </span>
                </div>

                {item.hasBadge && pendingCount > 0 && (
                  <span className="bg-[#FFD900] text-[#743B0E] font-roboto font-black text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    {pendingCount}
                  </span>
                )}
              </NavLink>

              <hr className="border-white/10 25 my-2.5" />
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Bagian Bawah: Tombol Keluar */}
      <div className="pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-6 py-3 hover:bg-black/60 transition-colors w-full justify-start"
        >
          <EntypoLogOut className="size-6 shrink-0" />
          <span className="font-roboto font-bold text-lg">Keluar</span>
        </button>
      </div>

    </div>
  );};

export default Sidebar;
