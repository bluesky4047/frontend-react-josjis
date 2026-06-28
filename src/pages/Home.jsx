import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { adminService } from "../services/adminService";
import { useProducts } from "../services/customerProducts/customerProductContext";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
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

  const filteredProducts = products.filter((product) => {
    // Filter soft delete
    if (product.is_deleted) return false;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" ||
      (selectedCategory === "Best Seller"
        ? product.isBestSeller
        : product.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[1000px] flex flex-col items-center justify-center overflow-hidden pb-20">
          <div className="max-w-[1200px] w-full mx-4 mt-20 p-12 md:p-20 rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_26px_42px_rgba(0,0,0,0.5),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] text-center text-white relative z-20">
            <h1 className="font-paytone text-7xl md:text-8xl mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight uppercase tracking-tight">
              PEDASNYA MANTAP,
              <br />
              HARGANYA PAS!
            </h1>
            <p className="font-roboto text-xl md:text-3xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed font-light">
              Penyetan kelas atas, harga kelas bawah. <br /> Dijamin dompet
              aman, perut kenyang!
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("menu-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#FFD900] text-[#743B0E] px-16 py-5 rounded-full font-roboto font-black text-3xl shadow-[0_17px_10px_-1px_rgba(0,0,0,0.4)] hover:scale-110 transition-all active:scale-95 border border-white/20"
            >
              LIHAT MENU
            </button>
          </div>

          {/* Wave Transition - absolute to parent section */}
          <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0] z-30"></div>
        </section>

        {/* Product Section (Transparent) */}
        <section
          id="menu-section"
          className="py-24 px-8 md:px-20 relative bg-transparent mt-[-100px] pt-[150px]"
        >
          {/* Overlay to ensure smooth transition from hero */}

          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative z-10">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {["Semua", "Makanan", "Minuman", "Best Seller"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat
                      ? "bg-[#FFD900] text-[#743B0E] shadow-xl border-white/30"
                      : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                  } px-10 py-3 rounded-full font-roboto font-bold text-xl transition-all active:scale-95 border`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-[350px]">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center px-5 py-3 shadow-lg group focus-within:bg-white/20 transition-all">
                <input
                  type="text"
                  placeholder="Cari Menu.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 relative z-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/5 backdrop-blur-sm rounded-[30px] border border-white/10 relative z-10">
              <p className="text-3xl font-roboto text-white/40 italic font-light">
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

export default Home;
