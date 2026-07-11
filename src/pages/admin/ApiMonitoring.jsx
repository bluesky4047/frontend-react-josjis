import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { rupiahFormat } from "../../utils/rupiahFormat";
import TableFormModal from "./AddEditTable";
import NewOrdersButton from "../../components/admin/NewOrdersButton";

const imgVector7 = "/admin/hand_meal.svg";
const imgGridiconsDropdown = "/admin/dropdown.svg";
const imgIcon1 = "/admin/plus.svg";
const imgVector6 = "/admin/edit.svg";
const imgWeuiDeleteOnFilled = "/admin/delete.svg";

import { useMonitorings } from "../../services/adminApiMonitoring/monitoringContext";

const ManagementMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null); // "add" | "edit"
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { monitorings, isLoading, query, setQuery } = useMonitorings();
  const { page, search, limit } = query;

  useEffect(() => {
    setMenuItems(adminService.getMenu());

    // Get pending orders count
    const orders = adminService.getOrders();
    setPendingOrdersCount(orders.filter((o) => o.status === "Menunggu").length);
  }, []);

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[500px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Monitoring API
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Pantau status API dan performa sistem secara real-time.
            </p>
          </div>

          <NewOrdersButton />
        </div>

        {/* Table Section */}
        <div className="rounded-[15px] border border-white bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)] backdrop-blur-xl shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)] p-[23px] min-h-[855px]">
          <iframe
            src={monitorings}
            width="100%"
            height="900"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ManagementMenu;
