import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../services/adminOrders/ordersApi";
import { useOrders } from "../../services/adminOrders/orderContext";
import { rupiahFormat } from "../../utils/rupiahFormat";
import { wibFormat } from "../../utils/wibFormat";

const imgVector4 = "/admin/hand_meal.svg";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: res = [], isLoading, isError } = useGetOrderByIdQuery(id);
  const order = res?.data;

  console.log(
  "ORDER DETAIL FULL:",
  JSON.stringify(order, null, 2)
);

  console.log("ORDER DETAIL:", order);
  console.log("PAYMENTS:", order?.payments);
  
  const { editOrder } = useOrders();

  const handleUpdateStatus = async (id, newStatus) => {
    const updatedOrders = await editOrder(id, newStatus);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Detail Pesanan
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              ID Order: {order.id.slice(0, 8)}
            </p>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            <div className="w-[173px] h-[45px] mt-[10px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm relative overflow-hidden flex items-center pl-[11px] gap-2">
              <div className="size-[24px]">
                <img
                  alt=""
                  src={imgVector4}
                  className="size-full object-contain"
                />
              </div>
              <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">
                Pesanan Baru
              </span>
            </div>
            {/* <div className="absolute -top-[10px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
              <span className="font-roboto font-medium text-[18px] text-[#743b0e]">
                2
              </span>
            </div> */}
          </div>
        </div>

        {/* Detail Content */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_26px_42px_rgba(0,0,0,0.5),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] p-[40px] min-h-[600px] rounded-2xl">
          <div className="grid grid-cols-2 gap-[40px]">
            <div className="space-y-[20px]">
              <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2">
                Informasi Customer
              </h3>
              <p className="font-roboto text-[18px] text-white/90">
                Nama:{" "}
                <span className="font-medium">
                  {order?.customer_name ?? "N/A"}
                </span>
              </p>
              <p className="font-roboto text-[18px] text-white/90">
                {order.table_id ? (
                  <>
                    Meja:{" "}
                    <span className="font-medium">{order.tables.name}</span>
                  </>
                ) : (
                  <>Take Away</>
                )}
              </p>
              <p className="font-roboto text-[18px] text-white/90">
                Waktu:{" "}
                <span className="font-medium">
                  {wibFormat(order?.created_at)}
                </span>
              </p>
            </div>
            <div className="space-y-[20px]">
              <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2">
                Status Pembayaran
              </h3>
              <p className="font-roboto text-[18px] text-white/90">
                Metode:{" "}
                <span className="font-medium">
                  {order.payments[0]?.method?.toUpperCase() || "N/A"}
                </span>
              </p>
              <p
                className={`font-roboto text-[18px] font-bold ${
                  order?.payments?.[0]?.status === "paid"
                    ? "text-[#58E85A]"
                    : "text-[#ffd900]"
                }`}
              >
                {order?.payments?.[0]?.status === "paid"
                  ? "Lunas"
                  : order?.payments?.[0]?.status === "pending"
                    ? "Menunggu Pembayaran"
                    : ""}
              </p>
            </div>
          </div>

          <div className="mt-[40px]">
            <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2 mb-[20px]">
              Daftar Menu
            </h3>
            <div className="space-y-[15px]">
              {order.order_items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white/10 p-[15px] rounded-[10px]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-roboto font-bold text-white">
                      {item.qty}x
                    </span>
                    <span className="font-roboto text-white">{item.name}</span>
                  </div>
                  <span className="font-roboto font-medium text-white">
                    {rupiahFormat(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[30px] border-t border-white/20 pt-[20px] flex justify-between items-center">
              <span className="font-roboto font-extrabold text-[24px] text-white">
                Total
              </span>
              <span className="font-paytone text-[28px] text-white">
                {rupiahFormat(order.total_amount)}
              </span>
            </div>
          </div>

          {order.status == "pending" && (
            <div className="mt-[50px] flex gap-[20px]">
              <button
                className="flex-1 h-[60px] bg-[#06b139] rounded-[10px] font-roboto font-bold text-white text-[18px]"
                onClick={() => handleUpdateStatus(order.id, "in_progress")}
              >
                Terima Pesanan
              </button>
              <button
                className="flex-1 h-[60px] bg-[#d20102] rounded-[10px] font-roboto font-bold text-white text-[18px]"
                onClick={() => handleUpdateStatus(order.id, "cancelled")}
              >
                Tolak Pesanan
              </button>
            </div>
          )}
          {order.status == "in_progress" && (
            <div className="mt-[50px] flex gap-[20px]">
              <button
                className="flex-1 h-[60px] bg-[#06b139] rounded-[10px] font-roboto font-bold text-white text-[18px]"
                onClick={() => handleUpdateStatus(order.id, "completed")}
              >
                Selesaikan Pesanan
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;
