import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = () => {
    setCartItems(cartService.getCart());
    setTotalPrice(cartService.getTotalPrice());
  };

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      cartService.updateQuantity(id, item.quantity + delta);
      refreshCart();
    }
  };


const handleConfirmOrder = () => {
  if (cartItems.length === 0) {
    alert("Keranjang Anda kosong!");
    return;
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );

  navigate("/checkout");
};


console.log(cartItems);

  return (
    <div className="min-h-screen bg-[#C4C4C4] relative overflow-hidden font-roboto pt-[80px]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/cart_bg_new.png" 
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

      <main className="relative z-10 max-w-[1440px] mx-auto p-8 md:px-[170px] py-[60px]">
        {/* Glass Container for Title */}
        <div className="bg-[rgba(217,217,217,0.5)] backdrop-blur-xl border border-white/20 rounded-[15px] p-12 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25),0px_10px_12px_rgba(0,0,0,0.5)] mb-12">
          <h2 className="font-paytone text-5xl md:text-[55px] text-black mb-4 uppercase">Pesanan Anda</h2>
          <p className="text-2xl md:text-[28px] text-black leading-relaxed">
            Yuk! periksa kembali pesananmu <br />
            pastikan sudah benar sebelum melanjutkan pembayaran.
          </p>
        </div>

        {/* Main Cart Content Area */}
        <div className="bg-white/20 backdrop-blur-[246.4px] border border-white/10 rounded-[30px] shadow-[inset_82.1px_-82.1px_82.1px_rgba(165,165,165,0.12),inset_-82.1px_82.1px_82.1px_rgba(255,255,255,0.12)] overflow-hidden p-8 md:p-16">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Section Title */}
            <div className="lg:w-1/3">
              <h3 className="font-bold text-4xl md:text-[45px] text-black mb-4">Total Harga</h3>
              <p className="text-xl md:text-[24px] text-black/70 leading-normal">
                Jumlah total untuk barang-barang yang Anda pilih.
              </p>
            </div>

            {/* Right: List of items */}
            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white/10 rounded-2xl p-8 space-y-8 min-h-[300px]">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="relative pb-6 last:border-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                           <div className="size-20 rounded-lg overflow-hidden border border-white/20 shadow-sm shrink-0">
                              <img
                                src={item?.img_urls?.[0] || import.meta.env.VITE_IMAGE_FALLBACK}
                                alt={item.name}
                                className="size-full object-cover"
                              />
                           </div>
                           <div className="space-y-1">
                              <p className="text-2xl text-black font-medium">{item.name}</p>
                              <p className="text-xl text-black/50 font-medium">Rp {item.price.toLocaleString('id-ID')}</p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="bg-[rgba(222,222,222,0.75)] backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-4 border border-black/5 shadow-inner">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-10 h-10 rounded-full bg-[#FFD900] text-[#743B0E] flex items-center justify-center text-2xl font-bold hover:scale-110 transition-transform shadow-md"
                            >−</button>
                            <span className="text-2xl font-bold text-black min-w-[30px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-10 h-10 rounded-full bg-[#FFD900] text-[#743B0E] flex items-center justify-center text-2xl font-bold hover:scale-110 transition-transform shadow-md"
                            >+</button>
                          </div>
                        </div>
                      </div>
                      {/* Divider Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10">
                         <img src="/divider_line.svg" alt="" className="w-full h-full opacity-20" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                     <p className="text-2xl text-black/40 italic">Keranjang belanja Anda kosong...</p>
                     <button onClick={() => navigate('/home')} className="mt-6 text-primary-red font-bold underline">Cari Menu Sekarang</button>
                  </div>
                )}
              </div>

              {/* Final Total and CTA */}
              <div className="flex flex-col items-center gap-10 mt-12">
                <div className="bg-[rgba(255,255,255,0.03)] border border-white rounded-[15px] p-8 w-full max-w-[450px] shadow-[0_17px_10px_-1px_rgba(0,0,0,0.5),inset_3px_-23px_5.6px_-21px_rgba(0,0,0,0.48)] flex justify-between items-center backdrop-blur-sm">
                  <span className="font-paytone text-2xl text-black/80 uppercase tracking-wider">Total</span>
                  <span className="font-paytone text-2xl text-black/80">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>  
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button 
            onClick={handleConfirmOrder}
            className="bg-[#FFD900] text-[#743B0E] font-paytone text-[25px] py-4 px-12 rounded-[15px] shadow-[0_17px_10px_-1px_rgba(0,0,0,0.5),inset_3px_-23px_5.6px_-21px_rgba(0,0,0,0.48)] border border-white hover:scale-105 active:scale-95 transition-all w-full max-w-[380px]"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </main>
    </div>
  );
};

export default Cart; 

