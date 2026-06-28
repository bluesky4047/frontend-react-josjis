import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    if (type === 'customer') {
      navigate('/home');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <img 
        src="/Login admin.png" 
        alt="" 
        className="absolute inset-0 size-full object-cover pointer-events-none" 
      />

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-[588px] h-[718px] rounded-[40px] border-2 border-white/0 bg-gradient-to-b from-white/0 to-white/10 backdrop-blur-md shadow-[0_0_42px_rgba(0,0,0,0.58),inset_0_30px_12px_-21px_rgba(0,0,0,0.32)] flex flex-col items-center pt-[107px] px-12 animate-slide-up">
        <h1 className="font-paytone text-[64px] text-white leading-tight mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-widest uppercase">
          JOS JIS
        </h1>
        <p className="font-roboto text-white text-[16px] mb-[125px] opacity-90 font-normal text-center">
          Silahkan Pilih Akses Masuk Anda
        </p>

        <div className="w-full space-y-[39px]">
          {/* Customer Button */}
          <button 
            onClick={() => handleLogin('customer')}
            className="w-full h-[105px] rounded-[40px] bg-gradient-to-r from-white/0 to-white/10 border border-white/0 shadow-[0_0_42px_rgba(0,0,0,0.58),inset_0_30px_12px_-21px_rgba(16,16,16,0.58)] flex items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <div className="w-[53px] h-[53px] flex items-center justify-center mx-auto">
              <img src="/mdi_user.svg" alt="" className="size-full object-contain" />
            </div>
            <span className="font-poppins font-bold text-[24px] text-white -translate-x-35">Customer</span>
          </button>

          {/* Admin Button */}
          <button 
            onClick={() => handleLogin('admin')}
            className="w-full h-[105px] rounded-[40px] bg-gradient-to-r from-white/0 to-white/10 border border-white/0 shadow-[0_0_42px_rgba(0,0,0,0.58),inset_0_30px_12px_-21px_rgba(16,16,16,0.58)] flex items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <div className="w-[72px] h-[72px] object-contain -translate-x-4">
              <img src="/admin/clarity_administrator-solid.svg" alt="" className="size-full object-contain" />
            </div>
            <span className="font-poppins font-bold text-[24px] text-white -translate-x-4">Admin</span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default Login;
