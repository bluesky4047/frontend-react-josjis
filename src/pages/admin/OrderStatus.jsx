import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { rupiahFormat } from "../../utils/rupiahFormat";
import NewOrdersButton from "../../components/admin/NewOrdersButton";

// Figma Assets
const imgVector6 = "/admin/hand_meal.svg"; // Hand meal
const imgVector7 = "/admin/hand_meal.svg"; // Hand meal vector
const imgGridiconsDropdown = "/admin/black dropdwon.svg";
const imgGridiconsDropdownWhite = "/admin/black dropdwon.svg";
const imgMaterialSymbolsSearch = "/admin/search.svg";
const imgArrow1 = "/admin/Arrow right.svg";

// Alur Pesanan Icons
const imgMingcuteTimeFill = "/admin/status.svg";
const imgFluentTextChangeAccept = "/admin/diterima.svg";
const imgSolarHourglassBold = "/admin/diproses.svg";
const imgWeuiDone2Filled = "/admin/selesai.svg";

import { useOrders } from "../../services/adminOrders/orderContext";

const OrderStatus = () => {
  //   const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const { orders, meta, isLoading, editOrder, query, setQuery } = useOrders();
  const { page, search, limit } = query;

  //   useEffect(() => {
  //     setOrders(adminService.getOrders());
  //   }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatedOrders = await editOrder(id, newStatus);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Semua" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    menunggu: orders.filter((o) => o.status === "pending").length,
    diproses: orders.filter((o) => o.status === "in_progress").length,
    selesai: orders.filter((o) => o.status === "completed").length,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-[rgba(210,1,2,0.85)] text-white";
      case "in_progress":
        return "bg-[#ffd900] text-[#743b0e]";
      case "completed":
        return "bg-brown text-white";
      case "cancelled":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <AdminLayout>
      <div className="p-[37px] pb-[60px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[35px]">
          <div className="w-[409px] min-h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[24px] pl-[29px] flex flex-col justify-center shadow-lg">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Status Pesanan
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Pantau dan kelola semua status pesanan
            </p>
          </div>

          <NewOrdersButton />
        </div>

        {/* Stats Section */}
          <div className="flex gap-4 md:gap-[32px] mb-[40px] overflow-x-auto pb-4 scrollbar-hide">
          {[
            { label: "Total Pesanan", val: stats.total },
            { label: "Baru", val: stats.menunggu },
            { label: "Diproses", val: stats.diproses },
            { label: "Selesai", val: stats.selesai },
          ].map((stat, i) => (
            <div
              key={i}
              className="min-w-[180px] md:min-w-[210px] flex-1 h-[109px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_26px_42px_rgba(0,0,0,0.5),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] p-[19px] flex flex-col justify-between rounded-[15px]"
            >
              <p className="font-roboto font-semibold text-[18px] md:text-[20px] text-white whitespace-nowrap"
>
                {stat.label}
              </p>
              <p className="font-roboto font-extrabold text-[25px] text-white leading-none">
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="rounded-[15px] border border-white bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)] backdrop-blur-xl shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)] p-[23px] min-h-[600px] overflow-x-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-[24px] gap-4">
            <h3 className="font-roboto font-bold text-[20px] text-white">
              Daftar Status Pesanan
            </h3>
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <div className="relative w-full sm:w-[141px] h-[35px] sm:h-[30px] rounded-[10px] overflow-hidden">
                <select
                  className="w-full h-full bg-white/10 backdrop-blur-md border border-white/20 px-[13px] font-roboto font-medium text-[15px] text-white outline-none appearance-none cursor-pointer pr-[30px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">Diproses</option>
                  <option value="completed">Selesai</option>
                </select>
                <img
                  src={imgGridiconsDropdown}
                  alt=""
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-[24px] pointer-events-none"
                />
              </div>
              <div className="w-full sm:w-[241px] h-[35px] sm:h-[30px] bg-white/10 backdrop-blur-md border border-white/20 rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] flex items-center px-[13px] justify-between">
                <input
                  type="text"
                  placeholder="Cari ID Order/Customer..."
                  className="bg-transparent border-none outline-none font-roboto font-medium text-[15px] text-white placeholder:text-white/70 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  src={imgMaterialSymbolsSearch}
                  alt=""
                  className="size-[24px]"
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-[120px_1fr_100px_80px_150px_180px] gap-[10px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-[15px] h-[54px] items-center px-[26px] shadow-[0_26px_42px_rgba(0,0,0,0.15)] text-white">
              <span className="font-roboto font-medium text-[18px] text-white">
                ID Order
              </span>
              <span className="font-roboto font-medium text-[18px] text-white">
                Customer
              </span>
              <span className="font-roboto font-medium text-[18px] text-white text-center">
                No Meja
              </span>
              <span className="font-roboto font-medium text-[18px] text-white text-center">
                Items
              </span>
              <span className="font-roboto font-medium text-[18px] text-white text-center">
                Total Harga
              </span>
              <span className="font-roboto font-medium text-[18px] text-white text-center">
                Status Pesanan
              </span>
            </div>

            {/* Table Body */}
            <div className="mt-1 space-y-1">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                   className="
                    grid grid-cols-[120px_1fr_100px_80px_150px_180px] gap-[10px] bg-white/5 backdrop-blur-md border border-white/10 h-[55px] items-center px-[26px]
                    hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
                >
                  <span className="font-roboto font-medium text-[18px] text-white">
                    {order.id.slice(0, 8)}
                  </span>
                  <span
                    className="font-roboto font-medium text-[18px] text-white truncate pr-4"
                    title={order.customer}
                  >
                    {order?.customer_name ?? "N/A"}
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-white text-center">
                    {order?.tables?.name ?? "Take Away"}
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-white text-center">
                    {order.order_items?.length ?? 0}
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-white text-center">
                    {rupiahFormat(order.total_amount ?? 0)}
                  </span>
                  <div className="flex justify-center">
                    <div
                      className={`relative ${getStatusStyle(order.status)} h-[30px] rounded-[5px] flex items-center px-[10px] gap-2 min-w-[140px]`}
                    >
                      <select
                        className="w-full bg-transparent border-none outline-none font-roboto font-medium text-[16px] appearance-none cursor-pointer pr-[20px]"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">Diproses</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                      <img
                        src={
                          order.status === "in_progress"
                            ? imgGridiconsDropdown
                            : imgGridiconsDropdownWhite
                        }
                        alt=""
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-[20px] pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="h-[100px] flex items-center justify-center text-white/70 font-roboto text-[18px]">
                  Tidak ada data pesanan.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alur Pesanan Section */}
        <div className="mt-[40px] rounded-[15px] border border-white bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)] backdrop-blur-xl shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)] p-[25px]">
          <h3 className="font-roboto font-bold text-[20px] text-white mb-[35px]">
            Alur Pesanan
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[10px] py-[10px]">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <img
                src={imgMingcuteTimeFill}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-white text-center leading-tight">
                pending
              </p>
              <p className="font-inter text-[14px] text-white text-center mt-1">
                Order baru masuk
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <img
                src={imgFluentTextChangeAccept}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-white text-center leading-tight">
                Diterima
              </p>
              <p className="font-inter text-[14px] text-white text-center mt-1 leading-tight">
                Pesanan diterima
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <img
                src={imgSolarHourglassBold}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-white text-center leading-tight">
                in_progress
              </p>
              <p className="font-inter text-[14px] text-white text-center mt-1 leading-tight">
                Sedang disiapkan
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <img
                src={imgWeuiDone2Filled}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-white text-center leading-tight">
                completed
              </p>
              <p className="font-inter text-[14px] text-white text-center mt-1 leading-tight">
                Pesanan selesai
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderStatus;
