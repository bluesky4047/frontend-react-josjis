import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from "../services/adminService";
import { cartService } from "../services/cartService";
import { rupiahFormat } from "../utils/rupiahFormat";
import { useGetProductByIdQuery } from "../services/customerProducts/customerProductsApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data: res = [], isLoading, isError } = useGetProductByIdQuery(id);
  const product = res?.data;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Menu tidak ditemukan
          </h1>
          <button
            onClick={() => navigate("/home")}
            className="bg-primary-red text-white px-6 py-2 rounded-full"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    cartService.addToCart(product, quantity);
    alert(`${product.name} (${quantity} porsi) ditambahkan ke keranjang!`);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#c4c4c4] relative overflow-hidden font-roboto">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          src="/product_detail_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        {/* Wave Vector at bottom */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <img src="/wave_bottom.svg" alt="" className="w-full" />
        </div>
      </div>

      {/* TOP BAR */}
      <Navbar showBackButton={true} />

      <main className="relative z-10 pt-20 pb-20 px-8 md:px-[170px] max-w-[1440px] mx-auto space-y-24">
        {/* Main Product Glass Section */}
        <div className="relative mt-[143px]">
          {/* Large Glass Background - Width equalized to other sections */}
          <div
          className="
            absolute inset-0 -inset-y-24
            rounded-[20px]
            border border-white/20
            bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_100%)]
            backdrop-blur-xl
            shadow-[inset_0_30px_12px_-21px_rgba(0,0,0,0.32),0_0_42px_0_rgba(0,0,0,0.15)]
            pointer-events-none
          "
        />

          <div className="relative flex flex-col lg:flex-row gap-20  px-20 items-center justify-between">
            <div className="flex-1 space-y-6">
              <h2 className="font-paytone text-6xl md:text-[45px] text-white uppercase tracking-tight">
                {product.name}
              </h2>
              <p className="text-2xl md:text-[28px] text-white leading-relaxed max-w-2xl">
                {product.description ||
                  "Penyetan lezat khas Josjis dengan sambal pilihan."}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <span className="bg-accent-yellow px-6 py-2 rounded-full font-bold text-brown text-2xl">
                  {rupiahFormat(product.price)}
                </span>
                {product.isBestSeller && (
                  <span className="bg-primary-red text-white px-6 py-2 rounded-full font-bold text-2xl shadow-lg">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            <div className="w-full lg:w-[349px] shrink-0">
              <div className="relative shadow-[11px_21px_10px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden aspect-[3/2] border-4 border-white/20">
                <img
                  src={
                    product.img_urls[0] || import.meta.env.VITE_IMAGE_FALLBACK
                  }
                  alt={product.name}
                  className="w-full h-full  object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-3"></div>

        {/* Description & Ingredients Section */}
        <div className="bg-white/20 backdrop-blur-[175.3px] border border-white/10 rounded-[30px] p-12 shadow-[0px_16px_10px_rgba(0,0,0,0.5),inset_58.4px_-58.4px_58.4px_rgba(165,165,165,0.08)] flex flex-col lg:flex-row gap-20">
          <div className="flex-1 space-y-6">
            <h3 className="font-bold text-4xl md:text-[40px] text-black">
              Deskripsi Hidangan
            </h3>
            <p className="text-xl md:text-[20px] text-black leading-relaxed">
              {product.description ||
                "Hidangan istimewa Josjis yang dibuat dengan hati dan rempah pilihan untuk menjamin kepuasan rasa Anda."}
            </p>
          </div>

          <div className="flex-1">
            <div className="border border-black/10 bg-white/40 p-6 rounded-xl flex gap-6 items-center">
              <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-white/20 shrink-0">
                <img
                  src="/ingredient_icon.png"
                  alt="Bahan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-xl">Bahan</p>
                <p className="text-lg opacity-70">
                  {product.category === "Makanan"
                    ? "Ayam, Bumbu rempah khas Indonesia, lalapan segar, dan sambal jos."
                    : "Bahan minuman segar pilihan."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Section */}
        <div className="bg-white/20 backdrop-blur-[246.4px] border border-white/10 rounded-[30px] p-12 shadow-[inset_82.1px_-82.1px_82.1px_rgba(165,165,165,0.12),inset_-82.1px_82.1px_82.1px_rgba(255,255,255,0.12)] flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1">
            <h3 className="font-bold text-4xl md:text-[40px] text-black">
              Jumlah Porsi
            </h3>
          </div>

          <div className="flex-1 w-full space-y-10">
            <div className="space-y-4">
              <p className="font-medium text-[14px]">Jumlah</p>
              <div className="bg-white border border-black/10 rounded-[6px] px-6 py-4 flex items-center justify-between shadow-inner">
                <span className="text-gray-400 font-medium">
                  Isi jumlah porsi
                </span>
                <div className="flex items-center gap-6 bg-gray-100 rounded-full px-6 py-2 border border-black/5 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="font-bold text-2xl text-primary-red hover:scale-125 transition-transform"
                  >
                    −
                  </button>
                  <span className="font-bold text-2xl w-8 text-center text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="font-bold text-2xl text-primary-red hover:scale-125 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-black/50 italic">
                Pilih berapa banyak hidangan yang ingin Anda pesan.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 h-[48px] rounded-[8px] bg-[#d20102] text-white font-medium text-[16px] shadow-[inset_0px_-6px_6.8px_rgba(0,0,0,0.33)] hover:brightness-110 active:translate-y-1 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-[48px] rounded-[8px] bg-[#ffd900] text-[#743b0e] font-medium text-[16px] shadow-[inset_0px_-6px_6.8px_rgba(0,0,0,0.33)] hover:brightness-110 active:translate-y-1 transition-all"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
