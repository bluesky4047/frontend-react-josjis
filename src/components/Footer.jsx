import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark-red py-12 px-20 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
         <img 
          src="https://www.figma.com/api/mcp/asset/02ef8417-3542-419d-99db-ee564588dca5" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="font-paytone text-3xl mb-4">Mengapa Jos Jis?</h3>
          <p className="font-roboto text-xl max-w-2xl opacity-90 leading-relaxed">
            Kami menyajikan penyetan autentik dengan sambal ulek dadakan dan bahan segar setiap hari, untuk rasa yang tak terlupakan.
          </p>
        </div>
        
        <div className="text-center mt-8">
          <h4 className="font-paytone text-2xl mb-2">Penyetan Jos Jis</h4>
          <p className="font-roboto text-xl italic opacity-80">“Pedesnya Jos, Rasanya Jis”</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
