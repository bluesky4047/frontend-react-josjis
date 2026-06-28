import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ratingService } from '../services/ratingService';
import { api } from "../services/api";
import Navbar from '../components/Navbar';

// Figma Assets
const imgIcon = "/back button.svg";
const imgImage14 = "/bg success black.png";
const imgSection = "/section header success.png";
const imgImage22 = "/food in container.png";
const imgImage27 = "/cook image.png";
const imgVector200 = "https://www.figma.com/api/mcp/asset/c17b78f8-3e19-48f9-9ca9-f0454ec3fcc7";
const imgVector201 = "https://www.figma.com/api/mcp/asset/a20f1ab2-f678-4c2f-acd2-b9f1135fee01";
const imgVector202 = "https://www.figma.com/api/mcp/asset/fc55a6e9-1efe-49b2-b037-2a33bec3e0db";
const imgTableVector = "/meja.svg";
const imgOrderVector = "/ordericon.svg";
const imgRatingSuccessBack = "https://www.figma.com/api/mcp/asset/b240f67a-9bf4-462b-99f2-1affa1c64b46";

const RatingModal = ({ isOpen, onClose, orderId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    try {
      await ratingService.submitRating({ orderId, rating, comment: review });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Gagal mengirim ulasan:", err);
      alert("Gagal mengirim ulasan ke server. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[670px] bg-gradient-to-b from-[#770001] to-[#d20102] rounded-[20px] shadow-2xl overflow-hidden border border-white/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10"
        >
          <img src={imgIcon} alt="back" className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div className="p-8 pt-16 flex flex-col items-center text-center">
            <h2 className="font-paytone text-4xl text-white mb-4">Ulasan</h2>
            <p className="font-roboto font-medium text-white/90 text-lg mb-8 max-w-[440px]">
              Gimana menurut kamu makanannya? Yuk kasih rating dan ceritakan pengalamanmu agar kami bisa jadi lebih baik lagi!
            </p>

            {/* Stars */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-110"
                >
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill={star <= rating ? "#FFD900" : "none"} 
                    stroke={star <= rating ? "#FFD900" : "#FFFFFF"} 
                    strokeWidth="1"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div className="w-full max-w-[557px] bg-white rounded-[20px] p-4 mb-8">
              <textarea 
                className="w-full h-[120px] outline-none text-black font-roboto placeholder:text-black/50 resize-none"
                placeholder="Beritahu kami pengalamanmu!"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-full max-w-[331px] h-[50px] rounded-[20px] font-paytone  transition-all shadow-lg ${
                rating === 0 ? 'bg-gray-500 cursor-not-allowed opacity-50 text-white' : 'bg-[#88391F] text-[#FFD900] hover:bg-[#58E85A]/50 active:scale-95'
              }`}
            >
              Kirim Ulasan
            </button>
          </div>
        ) : (
          <div className="p-8 pt-16 flex flex-col items-center text-center animate-fadeIn">
            <h2 className="font-paytone text-[64px] text-white leading-tight mb-8">Terima Kasih!</h2>
            <div className="text-[128px] mb-8 drop-shadow-lg">😍</div>
            <p className="font-roboto font-bold text-white text-xl max-w-[470px]">
              Kami akan terus berusaha memberikan pelayanan yang lebih baik agar kamu semakin puas.
            </p>
            <button 
              onClick={onClose}
              className="mt-12 font-paytone text-[#FFD900] text-xl hover:underline"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Success = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);


  console.log("ORDER STATE:", order);
  console.log("TABLE DATA:", order?.tables);


      useEffect(() => {
    const fetchOrder = async () => {
      const orderId = localStorage.getItem("orderId");

      console.log("ORDER ID:", orderId);

      if (!orderId) return;

      try {
        const res = await api.get(`/orders/${orderId}`);

        console.log("ORDER RESPONSE:", res.data);

        setOrder(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil data order:", err);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Background Decor Bottom */}
      <div className="absolute inset-0 top-[598px] z-0 pointer-events-none">
        <img
          src={imgImage14}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <Navbar showBackButton={true} />

      <main className="relative z-10 pt-[80px]">
        {/* Banner Section */}
        <section className="relative min-h-[520px] bg-black/60 overflow-hidden flex items-center justify-center px-6 md:px-[100px] lg:px-[170px] py-12 md:py-0">
          {/* Section BG */}
          <div className="absolute inset-0 z-0">
             <img src={imgSection} alt="" className="w-full h-[500] object-cover opacity-90" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row w-full items-center gap-[40px] lg:gap-[60px]">
            <div className="w-full md:flex-1 text-center md:text-left">
              <h1 className="font-roboto font-bold text-3xl md:text-[40px] text-white leading-tight">
                Pesanan Berhasil!🎉
              </h1>
              <p className="font-roboto text-[16px] text-white mt-2 mb-8">
                Pesanan anda telah dikirim ke dapur.
              </p>
              <button 
                onClick={() => navigate('/status')} 
                className="w-full max-w-[271px] h-[70px] bg-[#ffd900] rounded-[15px] shadow-[0px_9px_4px_rgba(0,0,0,0.25)] flex items-center justify-center font-paytone text-[#743b0e] text-[20px] active:scale-95 transition-transform mx-auto md:mx-0"
              >
                CEK PESANAN
              </button>
            </div>
            
            <div className="inline-flex justify-center translate-x-[-250px] h-[300px] md:h-[360px] rounded-[20px] border border-black overflow-hidden shadow-2xl flex items-center justify-center">
            <img 
              src={imgImage22} 
              alt="" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          </div>
          
        </section>

        {/* Confirmation Card Section */}
        <section className="min-h-[400px] md:h-[508px] flex items-center justify-center relative px-6 py-12 md:py-0">
          <div className="w-full max-w-[1100px] bg-white/10 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
            <div className="h-[250px] md:h-[340px] overflow-hidden">
               <img src={imgImage27} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-[12px] bg-black/20">
               <p className="font-roboto font-bold text-xl md:text-[24px] text-white text-center">
                 ✅ Pesanan Dikirim ke Dapur
               </p>
            </div>
          </div>
          <img src={imgVector201} alt="" className="absolute bottom-0 left-0 w-full" />
        </section>

        {/* Order Details Section */}
        <section className="py-[60px] flex justify-center px-6">
           <div className="w-full max-w-[1100px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[20px] flex flex-col md:flex-row gap-8 md:gap-[60px] p-8 md:p-[60px] items-center relative shadow-2xl overflow-hidden border border-white/10">
              <div className="w-full md:flex-1 text-center md:text-left">
                 <h2 className="font-roboto font-bold text-3xl md:text-[40px] text-white leading-tight">Rincian Pesanan</h2>
                 <p className="font-roboto text-[16px] text-white mt-4 opacity-80">Pantau pesanan Anda.</p>
              </div>

              <div className="w-full md:flex-1 flex flex-col gap-6 md:gap-[40px]">
                 {/* Table Number */}
                 <div className="flex items-center gap-[16px] p-[16px] border border-white rounded-[6px] bg-white/5 backdrop-blur-sm">
                    <img src={imgTableVector} alt="" className="size-[40px] md:size-[54px]" />
                    <div className="text-white text-left">
                       <p className="font-roboto font-medium text-lg md:text-[20px]">Nomor Meja</p>
                       <p className="font-roboto text-sm md:text-[16px] opacity-80">
                          {order?.tables?.name}
                        </p>
                    </div>
                 </div>

                 {/* Order ID */}
                 <div className="flex items-center gap-[16px] p-[16px] border border-white rounded-[6px] bg-white/5 backdrop-blur-sm">
                    <img src={imgOrderVector} alt="" className="size-[40px] md:size-[54px]" />
                    <div className="text-white text-left">
                       <p className="font-roboto font-medium text-lg md:text-[20px]">ID Pesanan</p>
                       <p className="font-roboto text-sm md:text-[16px] opacity-80 break-all">
                          {order?.id}
                        </p>
                    </div>
                 </div>
              </div>
              
           </div>
        </section>

        {/* Rating Button Section */}
        <section className="pb-[100px] flex justify-center md:justify-end px-6 md:px-[100px] lg:px-[400px]">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full max-w-[271px] h-[70px] bg-[#88391f] rounded-[15px] font-paytone text-[#ffd900] text-[20px] shadow-xl hover:scale-105 active:scale-95 transition-transform"
           >
             Rating Pesanan
           </button>
        </section>
      </main>

      {/* Modal Rating */}
      <RatingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        orderId={order?.id}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default Success;
