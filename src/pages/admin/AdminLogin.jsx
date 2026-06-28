import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../services/auth/authContext";

const AdminLogin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      return setError("Email dan password wajib diisi");
    }

    setLoading(true);
    try {
      await signin(form);
      navigate("/admin");
    } catch (err) {
      setError("Login gagal. Cek kembali akun kamu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/Login admin.png"
        alt=""
        className="absolute inset-0 size-full object-cover pointer-events-none"
      />

      
      {/* Login Card */}
      <div className="relative z-20 w-full max-w-[588px] h-[718px] rounded-[40px] border border-white/0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-[0_0_42px_rgba(0,0,0,0.58),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] flex flex-col items-center pt-[100px] px-12 animate-slide-up">
        <h1 className="font-poppins font-semibold text-[36px] text-white mb-[75px] drop-shadow-md">
          Login Admin
        </h1>

        <form className="w-full flex flex-col items-center gap-[42px]">
          <div className="w-full space-y-[42px]">
            <div className="relative w-[452px] mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="w-full h-[66px] bg-white border border-black rounded-[20px] px-[29px] font-poppins font-medium text-[20px] text-black placeholder:text-black/50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="relative w-[452px] mx-auto">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-[66px] bg-white border border-black rounded-[20px] px-[29px] font-poppins font-medium text-[20px] text-black placeholder:text-black/50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-yellow-400 font-bold text-center mt-[-20px] drop-shadow-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-[452px] h-[80px] rounded-[20px] bg-white/10 border border-white/0 shadow-[0_0_42px_rgba(0,0,0,0.58),inset_0_30px_12px_-21px_rgba(255,255,255,0.32)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 group overflow-hidden mt-[30px]"
            disabled={loading}
            onClick={handleSubmit}
          >
            <span className="font-poppins font-semibold text-[24px] text-white tracking-wide">
              Login
            </span>
          </button>
        </form>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default AdminLogin;
