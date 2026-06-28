import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { rupiahFormat } from "../../utils/rupiahFormat";

// Figma Assets
const imgVector6 = "/admin/hand_meal.svg"; // Hand meal
const imgVector7 = "/admin/tick.svg"; // Check
const imgVectorArrow = "/admin/arrow_up_right.svg"; // Arrow right up

import { useOrders } from "../../services/adminOrders/orderContext";

const OrderCard = ({ order, onUpdateStatus, onDetail }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Baru",
          color: "bg-[#ffd900]",
          textColor: "text-[#743b0e]",
        };
      case "in_progress":
        return {
          label: "Diproses",
          color: "bg-blue-500",
          textColor: "text-white",
        };
      case "completed":
        return {
          label: "Selesai",
          color: "bg-green-500",
          textColor: "text-white",
        };
      case "cancelled":
        return {
          label: "Dibatalkan",
          color: "bg-red-500",
          textColor: "text-white",
        };
      default:
        return { label: status, color: "bg-gray-400", textColor: "text-white" };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="bg-white border border-black rounded-[15px] p-[20px] flex flex-col min-h-[323px] shadow-lg transition-transform hover:scale-[1.02]">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-2">
        <div
          className={`${statusInfo.color} px-[12px] py-[2px] rounded-[10px] shadow-sm`}
        >
          <span
            className={`font-inter font-bold ${statusInfo.textColor} text-[12px]`}
          >
            {statusInfo.label}
          </span>
        </div>
        <div className="text-right">
          <p className="font-inter font-bold text-[#5f5f60] text-[16px] truncate max-w-[150px]">
            {order.customer}
          </p>
          <p className="font-inter text-[#343436] text-[11px] uppercase">
            Order {order.id}
          </p>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 space-y-2 my-4">
        {order.order_items?.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="font-inter font-bold text-[12px] text-black shrink-0">
                {item.qty} x
              </span>
              <span className="font-inter font-bold text-[12px] text-black line-clamp-1">
                {item.products.name}
              </span>
            </div>
            <span className="font-inter text-[11px] text-black font-medium shrink-0">
              {rupiahFormat(item.products.price)}
            </span>
          </div>
        ))}
        {order.items > (order.items_list?.length || 0) && (
          <p className="font-inter text-[#c1c4ce] text-[11px] mt-1">
            +{order.items - (order.items_list?.length || 0)} more items
          </p>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        <div>
          {order.table_id ? (
            <>
              <p className="font-inter text-[#343436] text-[11px]">
                Nomor Meja
              </p>
              <p className="font-inter font-bold text-[#636364] text-[16px]">
                {order?.tables?.name}
              </p>
            </>
          ) : (
            <>
              <p className="font-inter text-[#343436] text-[11px]">Pesanan</p>
              <p className="font-inter font-bold text-[#636364] text-[16px]">
                Take Away
              </p>
            </>
          )}
        </div>
        <div>
          <p className="font-inter text-[#343436] text-[11px]">
            Total Pembayaran
          </p>
          <p className="font-inter font-bold text-[#5e5e5f] text-[16px]">
            {rupiahFormat(order.total_amount)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {order?.order_items?.[0]?.notes && (
        <div className="mt-3">
          <p className="font-inter text-[#babcc7] text-[11px]">Order Notes</p>
          <p className="font-inter text-[#747576] text-[12px] italic line-clamp-2 leading-tight">
            {order?.order_items?.[0]?.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        {order.status === "pending" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(order.id, "in_progress");
            }}
            className="flex-1 bg-[#88391f] h-[40px] rounded-[13px] flex items-center justify-center gap-2 hover:bg-[#6d2d18] transition-colors"
          >
            <img src="/admin/check yellow.svg" alt="" className="size-[20px]" />
            <span className="font-roboto font-medium text-[#ffd900] text-[13px]">
              Terima
            </span>
          </button>
        )}
        {order.status === "in_progress" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(order.id, "completed");
            }}
            className="flex-1 bg-green-700 h-[40px] rounded-[13px] flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
          >
            <img src="/admin/check white.svg" alt="" className="size-[20px]" />
            <span className="font-roboto font-medium text-white text-[13px]">
              Selesaikan
            </span>
          </button>
        )}
        <button
          onClick={() => onDetail(order.id)}
          className={`bg-[#ffd900] h-[40px] rounded-[13px] flex items-center justify-center gap-2 hover:bg-[#e6c400] transition-colors ${order.status === "completed" ? "w-full" : "flex-[1.5]"}`}
        >
          <span className="font-roboto font-medium text-black text-[13px]">
            Detail Pesanan
          </span>
          <img src={imgVectorArrow} alt="" className="size-[16px]" />
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  // const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const navigate = useNavigate();
  const { orders, meta, isLoading, editOrder, query, setQuery } = useOrders();
  const { page, search, limit } = query;

  // useEffect(() => {
  //   setOrders(adminService.getOrders());
  // }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const updatedOrders = await editOrder(id, newStatus);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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

  return (
    <AdminLayout>
      <div className="p-[20px] md:p-[37px] pb-[100px]">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-[35px]">
          <div className="w-full sm:w-[366px] min-h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[24px] pl-[29px] flex flex-col justify-center shadow-lg">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Pesanan
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Daftar semua pesanan
            </p>
          </div>

          <div
            className="relative mt-[5px] sm:mt-[15px] self-end sm:self-auto cursor-pointer"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            <div className="w-[173px] h-[45px] relative bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm overflow-hidden flex items-center pl-[11px] gap-2">
              <img src={imgVector6} alt="" className="size-[24px]" />
              <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">
                Pesanan Baru
              </span>
            </div>
            <div className="absolute -top-[18px] -right-[9px] size-[30px] flex items-center justify-center bg-[#ffd900] rounded-full border border-black/20 shadow-md">
              <span className="relative z-10 font-roboto font-medium text-[18px] text-[#743b0e] pt-[2px]">
                {stats.menunggu}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 md:gap-[32px] mb-[40px] overflow-x-auto pb-4 scrollbar-hide">
          {[
            { label: "Total Pesanan", val: stats.total },
            { label: "Baru", val: stats.menunggu },
            { label: "Diproses", val: stats.diproses },
            { label: "Selesai", val: stats.selesai },
          ].map((stat, i) => (
            <div
              key={i}
              className="min-w-[180px] md:min-w-[210px] flex-1 h-[129px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_26px_42px_rgba(0,0,0,0.5),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] p-[19px] flex flex-col justify-between rounded-[15px]"
            >
              <p className="font-roboto font-semibold text-[18px] md:text-[20px] text-white whitespace-nowrap">
                {stat.label}
              </p>
              <p className="font-roboto font-extrabold text-[22px] md:text-[25px] text-white leading-none">
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="space-y-[25px]">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="bg-gradient-to-r from-[#d20102] to-[#770001] h-[72px] w-full xl:w-[500px] flex items-center px-[29px] rounded-[15px] border border-black shadow-md">
              <h3 className="font-roboto font-semibold text-[20px] text-white uppercase tracking-wider">
                Pesanan Masuk
              </h3>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row gap-[12px] w-full xl:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  className="h-[45px] w-full px-[20px] rounded-[10px] font-roboto font-medium text-[16px] text-white outline-none appearance-none cursor-pointer sm:min-w-[180px] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.25)] pr-[40px] focus:bg-white/15 transition-all"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="pending">Baru</option>
                  <option value="in_progress">Diproses</option>
                  <option value="completed">Selesai</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Cari ID/Customer..."
                  className="h-[45px] w-full sm:w-[300px] pl-[20px] pr-[45px] rounded-[10px] font-roboto font-medium text-[16px] text-white placeholder:text-white/60 outline-none bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.25)] focus:bg-white/15 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[25px]">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onUpdateStatus={handleUpdateStatus}
                  onDetail={(id) =>
                    navigate(`/admin/order/${id.replace("#", "")}`)
                  }
                />
              ))
            ) : (
              <div className="col-span-full py-[100px] text-center bg-white/10 rounded-[15px] border border-white/20 backdrop-blur-sm shadow-inner">
                <p className="font-roboto text-white text-[20px] opacity-70">
                  Tidak ada pesanan ditemukan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
