import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

const OrderStatusCustomer = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = localStorage.getItem('orderId');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        if (res.data?.data) {
          setOrder(res.data.data);
          setError(null);
        }
      } catch (err) {
        console.error("Gagal mengambil data order:", err);
        setError("Gagal memperbarui status pesanan");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          title: "Menunggu",
          desc: "Pesanan baru masuk dan sedang menunggu konfirmasi dari kasir.",
          badge: "Menunggu Konfirmasi",
          est: "15–20 menit"
        };
      case "in_progress":
        return {
          title: "Sedang Diproses",
          desc: "Makananmu sedang dimasak sekarang.",
          badge: "Sedang Diproses",
          est: "10–15 menit"
        };
      case "completed":
        return {
          title: "Selesai",
          desc: "Pesanan selesai. Silakan menikmati makanan Anda!",
          badge: "Pesanan Selesai",
          est: "0 menit"
        };
      case "cancelled":
        return {
          title: "Dibatalkan",
          desc: "Pesanan Anda telah dibatalkan.",
          badge: "Dibatalkan",
          est: "—"
        };
      default:
        return {
          title: "Status Tidak Diketahui",
          desc: "Menghubungkan ke dapur...",
          badge: "Memproses",
          est: "—"
        };
    }
  };

  const getStepStatus = (step) => {
    const status = order?.status;
    if (status === 'pending') {
      if (step === 1) return { label: 'Sekarang', sub: 'pulse', active: true };
      return { label: 'Berikutnya', sub: 'dash', active: false };
    }
    if (status === 'in_progress') {
      if (step === 1) return { label: 'Selesai', sub: 'check', active: true };
      if (step === 2) return { label: 'Sekarang', sub: 'pulse', active: true };
      return { label: 'Berikutnya', sub: 'dash', active: false };
    }
    if (status === 'completed') {
      return { label: 'Selesai', sub: 'check', active: true };
    }
    return { label: '—', sub: 'dash', active: false };
  };

  const getProgressWidth = () => {
    const status = order?.status;
    if (status === 'pending') return '33%';
    if (status === 'in_progress') return '66%';
    if (status === 'completed') return '100%';
    return '0%';
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-roboto font-bold text-3xl mb-4 text-[#FFD900]">Belum Ada Pesanan Aktif</h2>
        <p className="text-gray-400 mb-8 max-w-md">Kamu belum melakukan pemesanan makanan. Silakan pesan makanan terlebih dahulu di menu utama.</p>
        <button 
          onClick={() => navigate('/menu')} 
          className="bg-[#FFD900] text-[#743b0e] px-8 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform"
        >
          Lihat Menu
        </button>
      </div>
    );
  }

  if (loading && !order) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#FFD900] border-white/20 rounded-full animate-spin mb-4" />
        <p className="text-gray-400">Memuat status pesanan...</p>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order?.status);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden font-roboto pt-[80px]">
      <Navbar showBackButton={true} />
      
      {/* Background Main */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/order_status_bg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#770001]/50 mix-blend-multiply" />
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[373px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-8">
        <div className="absolute inset-0 z-0">
          <img src="/order_status_hero_bg.png" alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-white space-y-6">
          <h2 className="font-roboto font-bold text-[48px] leading-tight drop-shadow-lg uppercase tracking-tight">Lacak Pesananmu</h2>
          <p className="text-[24px] font-normal leading-relaxed opacity-90 max-w-2xl">Pantau setiap langkah, dari dapur ke mejamu.</p>
        </div>

        {/* Divider Vector */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20">
           <img src="/wave_bottom.svg" alt="" className="w-full opacity-30" />
        </div>
      </div>

      {/* CONTENT AREA */}
      <main className="relative z-10 py-20 px-8 md:px-[170px] flex flex-col items-center">
        
        {/* Ringkasan Pesanan Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white text-center mb-12">Ringkasan Pesanan</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Row 1: Order Number & Status */}
              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_order.png" alt="Order" className="size-full object-contain" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-[20px] font-medium text-white break-all">Order #{order?.id?.slice(0, 8).toUpperCase()}</p>
                    <span className="inline-block bg-[#FFD464]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">Nomor Pesanan</span>
                 </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_status.png" alt="Status" className="size-full object-contain" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[20px] font-medium text-white">Status</p>
                    <p className="text-[16px] text-white/80">{statusInfo.desc}</p>
                    <span className="inline-block bg-[#FFD900]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">{statusInfo.badge}</span>
                 </div>
              </div>

              {/* Row 2: Table & Estimation */}
              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_table.png" alt="Table" className="size-full object-contain" />
                 </div>
                 <div className="space-y-1 text-white">
                    <p className="text-[20px] font-medium">Meja</p>
                    <p className="text-[16px] opacity-80">{order?.tables?.name || "Take Away"}</p>
                 </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_wait.png" alt="Wait" className="size-full object-contain" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-[20px] font-medium text-white">Estimasi Waktu Tunggu</p>
                    <p className="text-[16px] text-white/80">{statusInfo.est}</p>
                    <span className="inline-block bg-[#FFD900]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">Estimasi Langsung</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Indikator Status Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white text-center mb-12">Indikator Status Pesanan</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              {(() => {
                const s = getStepStatus(1);
                return (
                  <div className={`text-center space-y-2 border-r border-white/10 last:border-0 p-4 ${s.label === 'Sekarang' ? 'bg-white/5 rounded-xl' : ''} ${!s.active ? 'opacity-40' : ''}`}>
                     <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Diterima</p>
                     <p className="text-white text-3xl font-bold">{s.label}</p>
                     {s.sub === 'pulse' && (
                        <div className="flex justify-center">
                           <div className="size-6 bg-[#FFD900] rounded-full animate-pulse" />
                        </div>
                     )}
                     {s.sub === 'check' && <p className="text-[#FFD900] text-4xl">✓</p>}
                     {s.sub === 'dash' && <p className="text-white text-4xl">—</p>}
                  </div>
                );
              })()}
              
              {/* Step 2 */}
              {(() => {
                const s = getStepStatus(2);
                return (
                  <div className={`text-center space-y-2 border-r border-white/10 last:border-0 p-4 ${s.label === 'Sekarang' ? 'bg-white/5 rounded-xl' : ''} ${!s.active ? 'opacity-40' : ''}`}>
                     <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Sedang Diproses</p>
                     <p className="text-white text-3xl font-bold">{s.label}</p>
                     {s.sub === 'pulse' && (
                        <div className="flex justify-center">
                           <div className="size-6 bg-[#FFD900] rounded-full animate-pulse" />
                        </div>
                     )}
                     {s.sub === 'check' && <p className="text-[#FFD900] text-4xl">✓</p>}
                     {s.sub === 'dash' && <p className="text-white text-4xl">—</p>}
                  </div>
                );
              })()}

              {/* Step 3 */}
              {(() => {
                const s = getStepStatus(3);
                return (
                  <div className={`text-center space-y-2 border-r border-white/10 last:border-0 p-4 ${s.label === 'Sekarang' ? 'bg-white/5 rounded-xl' : ''} ${!s.active ? 'opacity-40' : ''}`}>
                     <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Siap</p>
                     <p className="text-white text-3xl font-bold">{s.label}</p>
                     {s.sub === 'pulse' && (
                        <div className="flex justify-center">
                           <div className="size-6 bg-[#FFD900] rounded-full animate-pulse" />
                        </div>
                     )}
                     {s.sub === 'check' && <p className="text-[#FFD900] text-4xl">✓</p>}
                     {s.sub === 'dash' && <p className="text-white text-4xl">—</p>}
                  </div>
                );
              })()}
           </div>
        </div>

        {/* Progres Status Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="font-roboto font-bold text-[40px] text-white">Progres Status</h3>
                 <p className="text-white/80 text-[20px] font-medium italic">
                    Pesanan Anda sedang kami siapkan dengan sepenuh hati.
                 </p>
              </div>
              
              <div className="flex-[1.5] w-full bg-black/30 rounded-2xl p-8 border border-white/10 flex items-center gap-8">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_progress.png" alt="Progress" className="size-full object-contain" />
                 </div>
                 <div className="flex-1 space-y-4">
                    <div className="relative w-full h-4 bg-white/20 rounded-full overflow-hidden">
                       <div 
                         className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD900] to-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,217,0,0.5)] transition-all duration-500 ease-out" 
                         style={{ width: getProgressWidth() }}
                       />
                    </div>
                    <div className="flex justify-between text-white/60 text-xs font-bold uppercase tracking-wider">
                       <span>Diterima</span>
                       <span className="text-[#FFD900]">Diproses</span>
                       <span>Siap</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Item yang Dipesan Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white mb-12">Item yang Dipesan</h3>
           
           <div className="space-y-6">
              {order?.order_items?.map((item, idx) => (
                <div key={item.id || idx} className="flex justify-between items-center py-6 border-b border-white/10 last:border-0 group hover:bg-white/5 transition-colors px-4 rounded-lg">
                   <div className="space-y-1">
                      <p className="text-[24px] font-medium text-white">{item.products?.name}</p>
                      <p className="text-[18px] text-white/60 italic font-light">Jumlah {item.qty}</p>
                   </div>
                   <p className="text-[24px] font-bold text-[#FFD900] drop-shadow-md">
                      Rp {Number(item.price * item.qty).toLocaleString('id-ID')}
                   </p>
                </div>
              ))}
              {(!order?.order_items || order.order_items.length === 0) && (
                <div className="text-white/60 text-center py-6">Tidak ada item pesanan.</div>
              )}
           </div>
        </div>
      </main>

      {/* Decorative Wave Bottom */}
      <div className="relative h-[200px] w-full mt-20 opacity-40 pointer-events-none">
         <img src="/wave_bottom.svg" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default OrderStatusCustomer;
