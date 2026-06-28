import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../services/cartService";
import { rupiahFormat } from "../utils/rupiahFormat";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    cartService.addToCart(product);
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white/1 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col relative group transition-all hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] cursor-pointer h-full"
    >
      <div className="h-[280px] w-full overflow-hidden relative border-b border-white/20">
        <img
          src={product?.img_urls[0] || import.meta.env.VITE_IMAGE_FALLBACK}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.category === "Best Seller" && (
          <div className="absolute top-0 left-0 bg-accent-yellow px-3 py-1 rounded-br-lg font-roboto font-bold text-xs text-black shadow-md z-10 uppercase">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2  bg-white/10">
        <h3 className="font-roboto font-black text-xl text-white truncate drop-shadow-sm">
          {product.name}
        </h3>
        <p className="font-paytone text-2xl text-white">
          {rupiahFormat(product.price)}
        </p>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-5 right-5 bg-accent-yellow flex items-center gap-1 px-4 py-2 rounded-lg text-brown font-roboto font-black text-xs hover:bg-brown transition-colors shadow-lg active:scale-95 hover:text-accent-yellow"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
