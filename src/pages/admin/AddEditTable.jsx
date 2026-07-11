import React, { useState } from "react";

const imgRectangle4174 = "/admin/placeholder.png";
const imgIconamoonCloseBold = "/admin/close.svg";
const imgMdiTick = "/admin/tick.svg";
const imgBack = "/admin/back.svg";

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const EMPTY_FORM = {
  name: "",
  capacity: 0,
};

const TableFormModal = ({ table, onClose, onSave }) => {
  const isEdit = !!table;

  const [form, setForm] = useState(
    isEdit
      ? {
          name: table?.name || "",
          capacity: table?.capacity || 1,
        }
      : { ...EMPTY_FORM },
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama produk wajib diisi";
    if (
      !form.capacity ||
      isNaN(Number(form.capacity)) ||
      Number(form.capacity) < 1
    )
      e.capacity = "Kapasitas harus berupa angka positif";
    return e;
  };

  const submitForm = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    if (isEdit) {
      onSave({
        id: table.id,
        name: form.name,
        capacity: Number(form.capacity),
      });
    } else {
      onSave({
        name: form.name,
        capacity: Number(form.capacity),
      });
    }
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
          {isEdit ? "Edit Meja" : "Tambah Meja"}
        </h2>

        {/* Form Fields */}
        <div className="space-y-[15px]">
          {/* Nama Menu */}
          <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[60px] flex items-center px-[20px]">
            <input
              type="text"
              name="name"
              placeholder="Nama Meja"
              className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>

          {/* Kategori */}
          <div className="bg-[#f6f1ed] border border-black rounded-[15px] h-[60px] flex items-center px-[20px]">
            <div className="flex items-center w-full">
              <span className="font-roboto text-[18px] text-black mr-2">
                Kapasitas
              </span>
              <input
                type="number"
                name="capacity"
                min="1"
                placeholder="1"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                required
              />
            </div>
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
        {/* <div className="mt-[25px]">
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
        </div> */}

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
};

export default TableFormModal;
