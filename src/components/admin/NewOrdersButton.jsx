import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../services/adminOrders/ordersApi";

const NewOrdersButton = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetOrdersQuery({
    page: 1,
    limit: 100,
  });

  const orders = data?.data?.orders || [];

  const pendingCount = orders.filter(
    (o) => o.status === "pending"
  ).length;

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/admin/orders")}
    >
      <div className="w-[173px] h-[45px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm overflow-hidden flex items-center pl-[11px] gap-2">
        <img
          src="/admin/hand_meal.svg"
          alt=""
          className="size-[24px]"
        />

        <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">
          Pesanan Baru
        </span>
      </div>

      <div className="absolute -top-[10px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
        <span className="font-roboto font-medium text-[18px] text-[#743b0e]">
          {isLoading ? "..." : pendingCount}
        </span>
      </div>
    </div>
  );
};

export default NewOrdersButton;