import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 bg-gradient-to-r from-primary-red via-[#a50101] to-primary-dark-red shadow-lg flex items-center justify-between px-20">
      <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="
               -ml-12
                w-10 h-10
                bg-[#FFD900]
                rounded-full
                flex items-center justify-center
                hover:scale-110
                transition-all
              "
            >
              <img
                src="/back_arrow.svg"
                alt="Back"
                className="w-5 h-5"
              />
            </button>
          )}

  <div className="font-paytone text-white text-3xl">
    JOS JIS
  </div>
</div>
      
      <div className="flex items-center gap-10">
        <NavLink 
          to="/home" 
          className={({ isActive }) => 
            `font-roboto text-lg transition-colors ${isActive ? 'text-black bg-accent-yellow px-4 py-1 rounded-full' : 'text-white hover:text-accent-yellow'}`
          }
        >
          Beranda
        </NavLink>
        <NavLink 
          to="/menu" 
          className={({ isActive }) => 
            `font-roboto text-lg transition-colors ${isActive ? 'text-black bg-accent-yellow px-4 py-1 rounded-full' : 'text-white hover:text-accent-yellow'}`
          }
        >
          Menu
        </NavLink>
        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `font-roboto text-lg transition-colors ${isActive ? 'text-black bg-accent-yellow px-4 py-1 rounded-full' : 'text-white hover:text-accent-yellow'}`
          }
        >
          Keranjang
        </NavLink>
        <NavLink 
          to="/status" 
          className={({ isActive }) => 
            `font-roboto text-lg transition-colors ${isActive ? 'text-black bg-accent-yellow px-4 py-1 rounded-full' : 'text-white hover:text-accent-yellow'}`
          }
        >
          Pesanan
        </NavLink>
        <NavLink 
          to="/" 
          className="font-roboto text-lg text-white hover:text-accent-yellow transition-colors"
        >
          Keluar
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
