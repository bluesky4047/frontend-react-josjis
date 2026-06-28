import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const PaymentQRIS = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-roboto">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.figma.com/api/mcp/asset/b9d5426b-6cc4-4f99-8be2-be80de5e22c6" 
          alt="" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[#770001]/40 mix-blend-multiply" />
      </div>

      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#dc0002] to-[#770001] h-[80px] flex items-center px-6 shadow-lg">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <img src="https://www.figma.com/api/mcp/asset/a70c2a39-877f-4624-8da9-8427bbd99dfc" alt="back" className="w-6 h-6" />
        </button>
        <h1 className="font-paytone text-2xl text-white ml-4">
          JOS JIS - Halaman Pembayaran
        </h1>

        <div className="hidden md:flex ml-auto items-center gap-10 bg-[#770101] px-6 py-2 rounded-full">
          <button onClick={() => navigate('/home')} className="text-white hover:text-accent-yellow">Beranda</button>
          <button onClick={() => navigate('/menu')} className="text-white hover:text-accent-yellow">Menu</button>
          <button onClick={() => navigate('/')} className="text-white hover:text-accent-yellow">Keluar</button>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Banner Section */}
        <section className="bg-black/60 backdrop-blur-md h-[382px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 opacity-30">
             <img src="https://www.figma.com/api/mcp/asset/dee7c216-88ba-4982-babf-ff13c3ede10c" alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
             <h2 className="font-paytone text-5xl text-white">Pembayaran QRIS</h2>
             <p className="text-xl text-white/80">Scan QR Code di bawah untuk menyelesaikan pesanan Anda.</p>
             <div className="bg-white px-6 py-2 rounded-lg font-bold text-sm text-gray-500">
               Mohon konfirmasi setelah melakukan pembayaran
             </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-1/3 opacity-30 rotate-12">
             <img src="https://www.figma.com/api/mcp/asset/dee7c216-88ba-4982-babf-ff13c3ede10c" alt="" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* QR Section */}
        <section className="bg-white/10 backdrop-blur-3xl min-h-[625px] flex items-center justify-center py-20">
           <div className="max-w-[1282px] w-full px-8 md:px-20 flex flex-col md:flex-row gap-20 items-center">
              <div className="flex-1 space-y-6 text-black">
                 <h3 className="font-bold text-5xl">Silahkan Scan QRIS</h3>
                 <p className="text-xl text-gray-600">Selesaikan pembayaran Anda dalam waktu:</p>
                 <div className="flex items-center gap-3 bg-red-100 text-[#D20102] px-6 py-3 rounded-full font-bold text-2xl w-fit shadow-inner">
                    <Clock size={28} />
                    <span>{formatTime(timeLeft)}</span>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-8">
                 <div className="bg-white p-8 rounded-[30px] shadow-2xl border-4 border-[#D20102]">
                    <img src="https://www.figma.com/api/mcp/asset/c81ff330-f50d-4499-af42-0cb7eda1d83f" alt="QR Code" className="w-64 h-64 grayscale contrast-125" />
                 </div>
                 
                 <div className="text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-1">Total Tagihan</p>
                    <p className="font-paytone text-5xl text-[#D20102]">Rp 54.000</p>
                 </div>

                 <button 
                    onClick={() => navigate('/success')}
                    className="w-full max-w-[400px] bg-[#D20102] text-white py-5 rounded-2xl font-paytone text-2xl shadow-xl hover:scale-105 transition-transform"
                 >
                    KONFIRMASI BAYAR
                 </button>
              </div>
           </div>
        </section>

        {/* Footer Thanks Section */}
        <section className="bg-black/40 backdrop-blur-md h-[333px] flex items-center justify-center relative overflow-hidden">
           <div className="max-w-[1282px] w-full flex flex-col md:flex-row items-center gap-12 px-20">
              <div className="flex-1 h-[234px] rounded-xl overflow-hidden opacity-80">
                 <img src="https://www.figma.com/api/mcp/asset/7ecea8c2-dc60-434a-90fb-22dacfde786a" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                 <h2 className="font-paytone text-4xl text-white">TERIMA KASIH! 🎉</h2>
                 <p className="text-2xl text-white/90 leading-relaxed">
                    Anda sudah menjadi bagian dari <br />
                    pengalaman kuliner bersama Josjis!
                 </p>
              </div>
           </div>
        </section>
      </main>

      {/* Decorative Vector Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <img src="https://www.figma.com/api/mcp/asset/4cab2f25-c64f-4a47-bdde-274cee3a44c7" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default PaymentQRIS;
