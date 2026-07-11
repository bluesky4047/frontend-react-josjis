import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { rupiahFormat } from "../../utils/rupiahFormat";
import ProductFormModal from "./AddEditMenu";
import NewOrdersButton from "../../components/admin/NewOrdersButton";

const imgVector7 = "/admin/hand_meal.svg";
const imgGridiconsDropdown = "/admin/dropdown.svg";
const imgIcon1 = "/admin/plus.svg";
const imgVector6 = "/admin/edit.svg";
const imgWeuiDeleteOnFilled = "/admin/delete.svg";

import { useProducts } from "../../services/adminProducts/productContext";

const ManagementMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null); // "add" | "edit"
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
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

    // Get pending orders count
    const orders = adminService.getOrders();
    setPendingOrdersCount(orders.filter((o) => o.status === "Menunggu").length);
  }, []);

  const handleDelete = async (product) => {
    if (window.confirm("Yakin ingin menghapus menu ini?")) {
      try {
        await removeProduct(product.id);

        alert(`Produk "${product.name}" berhasil dihapus`);
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus produk");
      }
    }
  };

  const filteredMenu = products.filter((item) => {
    const matchesDeleted = item.is_deleted === isDeleted;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua Kategori" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory && matchesDeleted;
  });

  const stats = {
    total: menuItems.length,
    makanan: menuItems.filter((i) => i.category === "Makanan").length,
    minuman: menuItems.filter((i) => i.category === "Minuman").length,
  };

  const changePage = (newPage) => {
    setQuery((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Manajemen Menu
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Kelola semua menu makanan dan minuman
            </p>
          </div>

          <NewOrdersButton />
        </div>
        {/* Stats Section */}
        <div className="flex gap-[120px] mb-[35px]">
          <div
            className="w-[380px] h-[120px] rounded-[15px]
              border border-white/20
              bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)]
              backdrop-blur-xl
              shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)]
              overflow-hidden relative flex items-center gap-[21px] p-[24px] pl-[31px]"
          >
            <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.1)] border border-white rounded-[15px] flex items-center justify-center">
              <img src="/admin/orders.svg" className="w-[43px] h-[43px]" />
            </div>
            <div>
              <p className="font-roboto font-medium text-[18px] text-white">
                Total Menu
              </p>
              <p className="font-roboto font-extrabold text-[20px] text-white">
                {stats.total}
              </p>
            </div>
          </div>
          <div
            className="w-[380px] h-[120px] rounded-[15px]
              border border-white/20
              bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)]
              backdrop-blur-xl
              shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)]
              overflow-hidden relative flex items-center gap-[21px] p-[24px] pl-[31px]"
          >
            <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.1)] border border-white rounded-[15px] flex items-center justify-center">
              <img src="/admin/makanan.svg" className="w-[46px] h-[46px]" />
            </div>
            <div>
              <p className="font-roboto font-medium text-[18px] text-white">
                Makanan
              </p>
              <p className="font-roboto font-extrabold text-[20px] text-white">
                {stats.makanan}
              </p>
            </div>
          </div>
          <div
            className="w-[380px] h-[120px] rounded-[15px] border border-white/20
              bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)]
              backdrop-blur-xl
              shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)]
              overflow-hidden relative flex items-center gap-[21px] p-[24px] pl-[31px]"
          >
            <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.1)] border border-white rounded-[15px] flex items-center justify-center">
              <img src="/admin/minuman.svg" className="w-[46px] h-[46px]" />
            </div>
            <div>
              <p className="font-roboto font-medium text-[18px] text-white">
                Minuman
              </p>
              <p className="font-roboto font-extrabold text-[20px] text-white">
                {stats.minuman}
              </p>
            </div>
          </div>
        </div>
        {/* Table Section */}
        <div className="rounded-[15px] border border-white bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)] backdrop-blur-xl shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.1)] p-[23px] min-h-[1355px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h3 className="font-roboto font-bold text-[20px] text-white">
              Daftar Menu
            </h3>
            <div className="flex gap-[8px]">
              <div className="relative w-[115px] h-[30px]">
                <select
                  className="w-full h-full bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] px-[13px] font-roboto font-medium text-[18px] text-white outline-none appearance-none cursor-pointer"
                  value={isDeleted}
                  onChange={(e) => setIsDeleted(e.target.value === "true")}
                >
                  <option value={false}>Aktif</option>
                  <option value={true}>Dihapus</option>
                </select>
                <img
                  alt=""
                  className="absolute right-2 top-1 size-[24px] pointer-events-none"
                  src="/admin/dropdownn.svg"
                />
              </div>
              <div className="relative w-[215px] h-[30px]">
                <select
                  className="w-full h-full bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] px-[13px] font-roboto font-medium text-[18px] text-white outline-none appearance-none cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Semua Kategori">Semua Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                </select>
                <img
                  alt=""
                  className="absolute right-2 top-1 size-[24px] pointer-events-none"
                  src="/admin/dropdownn.svg"
                />
              </div>
              <div className="relative w-[200px] h-[30px] bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] flex items-center px-[13px]">
                <img
                  src="/admin/search.svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] brightness-0 invert opacity-80"
                  alt="search"
                />

                <input
                  type="text"
                  placeholder="Cari Menu..."
                  className="bg-transparent border-none outline-none font-roboto font-medium text-[15px] text-white placeholder:text-white/120   w-full pl-[28px]"
                  value={searchTerm}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setSelected(null);
                  setModalType("add");
                }}
                className="group w-[114px] h-[30px] rounded-[10px] flex items-center justify-center gap-[15px] px-[11px] bg-[#FFD900] text-[#743B0E] hover:bg-[#743B0E] hover:text-[#FFD900] transition-all duration-300 active:scale-95 shadow-[0px_10px_6px_rgba(0,0,0,0.25)]"
              >
                <span className="font-roboto font-extrabold text-[18px]">
                  Tambah
                </span>

                <img
                  alt=""
                  src="/admin/plus new.svg"
                  className="size-[12px] group-hover:brightness-0 group-hover:invert transition-all duration-300"
                />
              </button>
            </div>
          </div>
          {/* Table Header */}
          <div className="grid grid-cols-[90px_1fr_120px_100px_100px_100px] gap-[40px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-[15px] h-[54px] items-center px-[26px] shadow-[0_26px_42px_rgba(0,0,0,0.15)] text-white">
            <span className="font-roboto font-medium text-[18px]">Gambar</span>
            <span className="font-roboto font-medium text-[18px]">Nama</span>
            <span className="font-roboto font-medium text-[18px]">
              Kategori
            </span>
            <span className="font-roboto font-medium text-[18px]">Harga</span>
            <span className="font-roboto font-medium text-[18px]">Stok</span>
            <span className="font-roboto font-medium text-[18px]">Aksi</span>
          </div>
          {/* Table Rows */}
          <div className="space-y-0 mt-0">
            {filteredMenu.map((product, index) => (
              <div
                key={product.id}
                className="grid grid-cols-[90px_1fr_120px_100px_100px_100px] gap-[40px] bg-white/5 backdrop-blur-md border border-white/10 h-[96px] items-center px-[26px] hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="w-[90px] h-[80px] relative">
                  <img
                    alt=""
                    className="size-full object-cover"
                    src={
                      product.img_urls[0] || import.meta.env.VITE_IMAGE_FALLBACK
                    }
                  />
                  {/* {item.isBestSeller && (
                    <div className="absolute top-0 left-0 bg-[#ffd900] px-[2px] py-[1px]">
                      <span className="text-[5px] font-roboto font-medium">
                        Best Seller
                      </span>
                    </div>
                  )} */}
                </div>
                <span className="font-roboto font-medium text-[18px] text-white">
                  {product.name}
                </span>
                <div className="bg-gradient-to-r from-[#d20102]/65 to-[#760001]/65 px-[10px] py-[4px] rounded-[5px] text-center translate-x-[-15px]">
                  <span className="font-roboto font-medium text-[18px] text-white">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </span>
                </div>
                <span className="font-roboto font-medium text-[18px] text-white">
                  {rupiahFormat(product.price)}
                </span>

                <div
                  className={`px-[10px] py-[4px] rounded-[5px] text-center inline-block translate-x-[-30px] ${
                    product.is_deleted === true
                      ? "bg-[#d20102]/85"
                      : product.is_active === true
                        ? "bg-accent-yellow/85"
                        : "bg-[#d20102]/85"
                  }`}
                >
                  <span
                    className={`font-roboto font-medium text-[18px] ${
                      product.is_deleted === true
                        ? "text-white"
                        : product.is_active === true
                          ? "text-[#743B0E]"
                          : "text-white"
                    }`}
                  >
                    {product.is_deleted === true
                      ? "Deleted"
                      : product.is_active === true
                        ? "Tersedia"
                        : "Habis"}
                  </span>
                </div>

                <div className="flex gap-[8px] items-center">
                  <div
                    className="w-[20px] h-[20px] cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                      setSelected(product);
                      setModalType("edit");
                    }}
                  >
                    <img alt="Edit" src={imgVector6} className="size-full" />
                  </div>
                  {isDeleted === false && (
                    <div
                      className="size-[35px] cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleDelete(product)}
                    >
                      <img
                        alt="Delete"
                        src={imgWeuiDeleteOnFilled}
                        className="size-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-5 shadow-lg">
            {/* Limit */}
            <div className="flex items-center gap-3 text-white font-roboto">
              <span className="text-lg">Tampilkan</span>

              <select
                value={query.limit}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    limit: Number(e.target.value),
                    page: 1,
                  }))
                }
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-[#FFD900]"
              >
                <option className="text-black" value={5}>
                  5
                </option>
                <option className="text-black" value={10}>
                  10
                </option>
                <option className="text-black" value={20}>
                  20
                </option>
                <option className="text-black" value={50}>
                  50
                </option>
                <option className="text-black" value={100}>
                  100
                </option>
              </select>

              <span className="text-lg">menu</span>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  page === 1
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20 active:scale-95"
                }`}
              >
                ← Prev
              </button>

              <div className="px-6 py-3 rounded-full bg-[#FFD900] text-[#743B0E] font-black shadow-lg">
                {meta?.page} / {meta?.totalPages}
              </div>

              <button
                disabled={page >= (meta?.totalPages || 1)}
                onClick={() => changePage(page + 1)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  page >= (meta?.totalPages || 1)
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20 active:scale-95"
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {(modalType === "add" || modalType === "edit") && (
        <ProductFormModal
          product={selected}
          onClose={() => {
            setModalType(null);
            setSelected(null);
          }}
          onSave={async (data) => {
            try {
              if (modalType === "add") {
                await addProduct(data);
              } else {
                await editProduct(data.id, data);
              }

              setModalType(null);
              setSelected(null);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </AdminLayout>
  );
};
export default ManagementMenu;
