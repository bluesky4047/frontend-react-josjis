import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { useProducts } from "../../services/adminProducts/productContext";
import { rupiahFormat } from "../../utils/rupiahFormat";
import { useOrders } from "../../services/adminOrders/orderContext";
import NewOrdersButton from "../../components/admin/NewOrdersButton";

const imgVector3 = "/admin/hand_meal.svg";
const imgIcSearch = "/admin/search.svg";
const imgIcon = "/admin/plus.svg";
const imgVector200 = "/admin/graph.svg";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    products,
    meta,
    isLoading,
    addProduct,
    editProduct,
    removeProduct,
    query,
    setQuery,
  } = useProducts();
  const { page, search, limit } = query;

  useEffect(() => {
    setMenuItems(adminService.getMenu());
    setOrders(adminService.getOrders());
  }, []);

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    let matchesTab = true;
    if (selectedTab === "Best Seller") matchesTab = item.isBestSeller;
    else if (selectedTab !== "Semua")
      matchesTab = item.category === selectedTab;

    return matchesSearch && matchesTab;
  });

  const pendingOrdersCount = orders.filter(
    (o) => o.status === "Menunggu",
  ).length;

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[51px]">
          <div className="relative w-[366px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[24px] pl-[29px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Hallo, Admin!
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Ringkasan hari ini
            </p>
          </div>

          <NewOrdersButton />
        </div>

        {/* Products Container */}
        
          {/* Tabs and Search */}
          <div className="flex items-center gap-[23px] mb-[40px]">
            {["Semua", "Makanan", "Minuman", "Best Seller"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-[120px] h-[48px] rounded-[30px] font-roboto font-bold text-[20px] transition-all active:scale-95 border ${
            selectedTab === tab
              ? "bg-[#FFD900] text-[#743B0E] shadow-xl border-white/30"
              : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
          }`}
              >
                {tab}
              </button>
            ))}

            <div className="ml-auto w-[270px] h-[46px] bg-white/10 backdrop-blur-md border border-white/40 rounded-[6px] shadow-lg flex items-center px-[8px] gap-[4px] group focus-within:bg-white/20 transition-all">
              <input
                type="text"
                placeholder="Cari Menu.."
                className="bg-transparent border-none outline-none flex-1 font-roboto text-[14px] text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img alt="" className="size-[20px]" src={imgIcSearch} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-x-[40px] gap-y-[40px]">
            {products
              .filter((product) => !product.is_deleted)
              .map((product, index) => (
              <div
                key={product.id}
                className="h-[420px] rounded-[6px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden relative shadow-[0_26px_42px_rgba(0,0,0,0.5),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_35px_50px_rgba(0,0,0,0.6)]"
              >
                <div className="h-[340px] relative overflow-hidden bg-black/20">
                  <img
                    alt={product.name}
                    className="absolute inset-0 object-cover size-full"
                    src={
                      product?.img_urls[0] ||
                      import.meta.env.VITE_IMAGE_FALLBACK
                    }
                  />
                  <div className="absolute top-0 left-0 bg-[#ffd900]/94 px-[8px] py-[4px] rounded-br-[6px] rounded-tl-[6px]">
                    <span className="font-roboto font-medium text-[12px] text-black">
                      {product.isBestSeller ? "Best Seller" : product.category}
                    </span>
                  </div>
                </div>
                <div className="p-[12px] text-white">
                  <h3 className="font-roboto font-bold text-[16px] leading-normal truncate">
                    {product.name}
                  </h3>
                  <p className="font-paytone text-[20px] leading-normal mt-[4px]">
                    {rupiahFormat(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Vector decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-0">
            <img alt="" className="w-full opacity-30" src={imgVector200} />
          </div>
        </div>
      
    </AdminLayout>
  );
};

export default Dashboard;
