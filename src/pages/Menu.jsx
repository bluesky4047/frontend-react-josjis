import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { adminService } from "../services/adminService";
import { useProducts } from "../services/customerProducts/customerProductContext";

const Menu = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
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
    setAllProducts(adminService.getMenu());
  }, []);

  const filteredProducts = products.filter((p) => {
    // Soft Delete Filter
    if (p.is_deleted) return false;

    const matchesCategory =
      activeCategory === "semua" ||
      (activeCategory === "makanan" && p.category === "Makanan") ||
      (activeCategory === "minuman" && p.category === "Minuman") ||
      (activeCategory === "bestseller" && p.isBestSeller);

    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const changePage = (newPage) => {
    setQuery((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />

      {/* Global Background Image (Fixed) */}
      <div className="fixed inset-0 z-0">
        <img
          src="/checkout_bg_full.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* Menu Title Section */}
        <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
          <div className="text-center text-white px-4">
            <h1 className="font-paytone text-6xl md:text-8xl mb-4 uppercase tracking-widest drop-shadow-2xl">
              DAFTAR MENU
            </h1>
            <p className="font-roboto text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-light italic">
              Pilih menu favoritmu dan rasakan sensasi pedas yang nampol!
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <img
              src="https://www.figma.com/api/mcp/asset/10c5f909-5996-4ed9-a0a8-db92d9dc8641"
              alt=""
              className="w-full opacity-60"
            />
          </div>
        </section>

        {/* Filter and Products Area */}
        <section className="py-20 px-8 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                { id: "semua", label: "Semua" },
                { id: "makanan", label: "Makanan" },
                { id: "minuman", label: "Minuman" },
                { id: "bestseller", label: "Best Seller" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-10 py-3 rounded-full font-roboto font-bold text-xl transition-all active:scale-95 border ${
                    activeCategory === cat.id
                      ? "bg-[#FFD900] text-[#743B0E] shadow-xl border-white/30"
                      : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-[350px]">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center px-5 py-3 shadow-lg group focus-within:bg-white/20 transition-all">
                <input
                  type="text"
                  placeholder="Cari Menu.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 font-roboto text-xl text-white placeholder:text-white/60"
                />
                <Search
                  className="text-white/60 group-focus-within:text-white transition-colors"
                  size={24}
                />
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
            </>
          ) : isLoading ? (
            <div className="text-center py-32 bg-white/5 backdrop-blur-sm rounded-[30px] border border-white/10">
              <p className="font-roboto text-3xl text-white/40 italic font-light">
                Memuat menu...
              </p>
            </div>
          ) : (
            <div className="text-center py-32 bg-white/5 backdrop-blur-sm rounded-[30px] border border-white/10">
              <p className="font-roboto text-3xl text-white/40 italic font-light">
                Menu tidak ditemukan...
              </p>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Menu;
