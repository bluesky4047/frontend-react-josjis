import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tables, setTables] = useState([]); 
   const [selectedTable, setSelectedTable] = useState("");
   const [customerName, setCustomerName] = useState("");

   const [orderType, setOrderType] = useState("dine_in"); // default: Dine In
   const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchTables();

    const cartData = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    setOrder({
      order_items: cartData,
      total_amount: cartData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    setLoading(false);
  }, []);


  const handleQty = async (itemId, type) => {
    // NOTE: ini optional (kalau backend support update order)
    // kalau belum ada endpoint update → bisa dihapus dulu
    console.log(itemId, type);
  };


const fetchTables = async () => {
  try {
    const res = await api.get("/tables"); // Menembak endpoint GET /tables
    const tableData = res.data?.data || res.data;
    if (Array.isArray(tableData)) {
      setTables(tableData.filter(t => t.is_active)); // Hanya ambil meja yang aktif
    }
  } catch (err) {
    console.error("Gagal mengambil daftar meja:", err);
  }
};

const createOrder = async () => {
  try {
    if (!customerName.trim()) {
      alert("Nama pemesan wajib diisi");
      return null;
    }

    if (orderType === "dine_in" && !selectedTable) {
      alert("Silakan pilih nomor meja");
      return null;
    }

    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

  const payload = {
    customerName,
    items: cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      notes: notes || "",
    })),
  };

  if (orderType === "dine_in") {
    payload.tableId = selectedTable;
  }

    console.log("ORDER PAYLOAD:", payload);

    const res = await api.post("/orders", payload);

    const orderId = res.data?.data?.id;

    if (!orderId) {
      throw new Error("Order ID tidak ditemukan");
    }

    localStorage.setItem("orderId", orderId);

    console.log("ORDER ID:", orderId);

    return orderId;


  } catch (err) {
  console.log("ERROR OBJECT:", err);
  console.log("ERROR RESPONSE:", err?.response);
  console.log(
  "ERROR DATA:",
  JSON.stringify(err?.response?.data, null, 2)
);
  console.log("ERROR MESSAGE:", err?.message);

  return null;
}
};

const handleNonTunai = async () => {
  try {
    const orderId = await createOrder();

    if (!orderId) return;

    const res = await api.post("/payments", {
      orderId,
      method: "midtrans",
    });

    const redirectUrl = res.data?.data?.redirect_url;

    if (!redirectUrl) {
      throw new Error("Redirect URL tidak ditemukan");
    }

    window.location.href = redirectUrl;
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Gagal membuat pembayaran"
    );
  }
};

const handleCash = async () => {
  try {
    const orderId = await createOrder();

    if (!orderId) return;

    navigate("/payment/cash");
  } catch (error) {
    console.error(error);

    alert("Gagal membuat pesanan");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }



  return (
    <div
      className="min-h-screen relative overflow-hidden font-roboto pt-[80px]"
      style={{
        backgroundImage:
          "linear-gradient(56.7deg, rgb(210, 1, 2) 0%, rgb(119, 0, 1) 39.2%)",
      }}
    >
      {/* HERO */}
      <div className="relative h-[480px] w-full flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="/checkout_bg_full.png"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative text-white">
          <h1 className="font-paytone text-5xl">PEMBAYARAN</h1>
          <p className="text-xl mt-2">Cek ulang pesanan kamu</p>
        </div>
      </div>

      {/* TOP BAR */}
      <Navbar showBackButton={true} />

      {/* CONTENT */}
      <main className="relative z-10 flex justify-center pb-20 mt-10">
        <div className="w-full max-w-[900px] bg-white/70 rounded-2xl p-8">

          {/* ORDER ITEMS */}
          <div className="max-w-[750px] mx-auto space-y-4">
            {order?.order_items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="text-xl font-bold text-black">
                    {item.name}
                  </p>
                  <p className="text-sm text-black/60">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-black">
                    x{item.quantity}
                  </p>

                  
                </div>
              </div>
            ))}
          </div>


          {/* FORM */}
            <div className="mt-8 space-y-4 text-black max-w-[650px] mx-auto">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Nama Pemesan</label>
              <input
                type="text"
                placeholder="Masukkan Nama Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#770001]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Tipe Pesanan</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Tombol Makan Sini (Dine In) */}
                <button
                  type="button"
                  onClick={() => setOrderType("dine_in")}
                  className={`p-3 rounded-lg font-bold border transition-all shadow-sm ${
                    orderType === "dine_in"
                      ? "bg-accent-yellow text-brown border-accent-yellow" // Warna saat aktif
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Makan Sini
                </button>

                {/* Tombol Bungkus (Take Away) */}
                <button
                  type="button"
                  onClick={() => {
                    setOrderType("take_away");
                    setSelectedTable(""); 
                  }}
                  className={`p-3 rounded-lg font-bold border transition-all shadow-sm ${
                    orderType === "take_away"
                      ? "bg-accent-yellow text-brown border-accent-yellow" // Warna saat aktif
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 font-extrabold"
                  }`}
                >
                  Bungkus
                </button>
              </div>
            </div>

            {/* Dropdown Meja */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Nomor Meja</label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                disabled={orderType === "take_away"} // 🚀 OTOMATIS GA BISA DIKLIK JIKA BUNGKUS
                className={`w-full p-2.5 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#770001] ${
                  orderType === "take_away" ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60" : "text-black"
                }`}
              >
                <option value="">
                  {orderType === "take_away" ? "Tidak memerlukan nomor meja" : "Masukkan nomor meja yang ditempati"}
                </option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} (Kapasitas: {table.capacity})
                  </option>
                ))}
              </select>
            </div>


            {/* Catatan Tambahan */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Catatan Tambahan (Optional)</label>
              <input
                type="text"
                placeholder="Contoh: Sambal dipisah, es teh jangan terlalu manis."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#770001]"
              />
            </div>

          </div>

          {/* TOTAL */}
          <div className="max-w-[650px] mx-auto mt-10">
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-black">
                Total Pembayaran
              </span>

              <span className="text-2xl font-bold text-[#770001]">
                Rp {Number(order?.total_amount || 0).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

              
          {/* PAYMENT BUTTON */}
         <div className="max-w-[500px] mx-auto mt-8">
            <h3 className="text-center text-xl font-bold text-black mb-4">
              Pilih Pembayaran
            </h3>

            <div className="flex justify-center gap-6">
            {/* QRIS / NON TUNAI */}
            <button
              onClick={handleNonTunai}
              className="
                w-[220px]
                py-4
                bg-[#FFD900]
                text-[#743B0E]
                rounded-[8px]
                font-roboto
                font-black
                text-xl
                shadow-[0_17px_10px_-1px_rgba(0,0,0,0.25)]
                hover:scale-110
                transition-all
                active:scale-95
                border border-white/20
              "
            >
              NON TUNAI
            </button>

            {/* CASH */}
            <button
              onClick={handleCash}
              className="
                w-[220px]
                py-4
                text-[#FFD900]
                bg-[#743B0E]
                rounded-[8px]
                font-roboto
                font-black
                text-xl
                shadow-[0_17px_10px_-1px_rgba(0,0,0,0.25)]
                hover:scale-110
                transition-all
                active:scale-95
                border border-white/20
              "
            >
              TUNAI
            </button>
          </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;