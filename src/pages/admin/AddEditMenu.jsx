import React, { useState } from "react";

const imgRectangle4174 = "/admin/placeholder.png";
const imgIconamoonCloseBold = "/admin/close.svg";
const imgMdiTick = "/admin/tick.svg";
const imgBack = "/admin/back.svg";

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "",
  price: "",
  is_active: true,
  images: [],
};

const ProductFormModal = ({ product, onClose, onSave }) => {
  const isEdit = !!product;

  const [form, setForm] = useState(
    isEdit
      ? {
          name: product?.name || "",
          description: product?.description || "",
          category: product?.category || "",
          price: product?.price || "",
          is_active: product?.is_active ?? true,
        }
      : { ...EMPTY_FORM }
  );
  const [previews, setPreviews] = useState(
    isEdit && product?.img_urls ? product.img_urls : [],
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    // simpan file asli
    set("images", files);

    // buat preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama produk wajib diisi";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Harga harus berupa angka positif";
    return e;
  };

  const submitForm = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    onSave({
      ...(isEdit
        ? product
        : {
            id: uid(),
            img_urls: [],
            created_at: new Date().toISOString(),
          }),
      ...form,
      images: form.images,
      price: String(Number(form.price)),
      category: form.category.trim() || null,
    });
    console.log("FILES:", form.images);
  };

  return (
  <div
    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >

        <div
          // onSubmit={submitForm}
          className="bg-[rgba(217,217,217,0.7)] border border-white rounded-[25px] shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto relative p-[30px]"
        >
          {/* Close Button */}
          <div
            className="absolute top-[20px] right-[30px] bg-[#d20102] border border-white rounded-[10px] size-[30px] flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
            onClick={onClose}
          >
            <img
              alt="Close"
              src={imgIconamoonCloseBold}
              className="size-[28px]"
            />
          </div>

          <h2 className="font-roboto font-semibold text-[24px] text-black text-center mb-[25px]">
            {isEdit ? "Edit Menu" : "Tambah Menu"}
          </h2>

          {/* Form Fields */}
          <div className="space-y-[15px]">
            {/* Nama Menu */}
            <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[60px] flex items-center px-[20px]">
              <input
                type="text"
                name="name"
                placeholder="Nama Menu"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </div>

            {/* Kategori */}
            <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[60px] flex items-center px-[20px]">
              <select
                name="category"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="" disabled>
                  -- Pilih Kategori --
                </option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Best Seller">Best Seller</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[120px] p-[20px]">
              <textarea
                name="description"
                placeholder="Deskripsi Menu"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full h-full resize-none leading-[30px] tracking-[0.54px]"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            {/* Harga */}
            <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[60px] flex items-center px-[20px]">
              <div className="flex items-center w-full">
                <span className="font-roboto text-[18px] text-black mr-2">
                  Rp
                </span>
                <input
                  type="number"
                  name="price"
                  min="0"
                  placeholder="13.000"
                  className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Area (Simplified for local storage demo) */}
          <div className="mt-[48px] flex items-center gap-[40px]">
            {previews[0] && (
              <div className="w-[160px] h-[100px] border border-black rounded-[20px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden bg-white/20">
                <img
                  src={previews[0]}
                  alt={`preview`}
                  className="size-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="font-roboto text-[18px] text-black mb-2 font-semibold">
                Tambah Gambar
              </p>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="w-full bg-[#f6f1ed] border border-black rounded-[10px] h-[40px] px-4 font-roboto text-[14px]"
                onChange={handleImage}
              />
            </div>
          </div>

          {/* Status Options */}
          {/* <div className="mt-[59px] space-y-[20px]">
            {/* Best Seller Checkbox */}
            {/* <div
              className="flex items-center gap-[23px] cursor-pointer"
              onClick={() =>
                setFormData((p) => ({ ...p, isBestSeller: !p.isBestSeller }))
              }
            >
              <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                {formData.isBestSeller && (
                  <img
                    alt="checked"
                    src={imgMdiTick}
                    className="absolute inset-0 size-full"
                  />
                )}
              </div>
              <span className="font-roboto text-[18px] text-white">
                Best Seller
              </span>
            </div> */}

            {/* Stock Options (Radio-like) */}
            <div className="mt-[25px]">
                <p className="font-roboto text-[18px] text-black mb-3 font-semibold">
                  Status Stok
                </p>

                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      checked={form.is_active === true}
                      onChange={() => set("is_active", true)}
                    />
                    <span className="font-roboto text-[18px] text-black">
                      Stok Tersedia
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      checked={form.is_active === false}
                      onChange={() => set("is_active", false)}
                    />
                    <span className="font-roboto text-[18px] text-black">
                      Stok Tidak Tersedia
                    </span>
                  </label>
                </div>
              </div>


          {/* Save Button */}
          <button
            type="submit"
            onClick={submitForm}
            className="mt-[35px] w-full h-[60px] bg-gradient-to-b bg-accent-yellow rounded-[40px] shadow-[0px_15px_10px_0px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span className="font-roboto font-extrabold text-[30px] text-brown">
              Simpan
            </span>
          </button>
        </div>
      </div>
    
  );
}

export default ProductFormModal;
