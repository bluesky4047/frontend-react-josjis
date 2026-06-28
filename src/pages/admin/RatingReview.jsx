import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const imgVector = "/admin/star review.svg"; // Star icon
const imgVector3 = "/admin/hand_meal.svg";

import { useRatings } from "../../services/adminRating/ratingsContext";

const INITIAL_REVIEWS = [
  {
    name: "Alex Trie",
    rating: 5,
    comment:
      "Penyetan ayamnya enak banget, sambalnya pedas mantap! Service juga cepat.",
  },
  {
    name: "Budi Santoso",
    rating: 4,
    comment:
      "Lele gorengnya garing, nasi hangat. Cuma sayang tadi nunggunya agak lama pas ramai.",
  },
  {
    name: "Siti Aminah",
    rating: 5,
    comment: "Langganan terus di sini, harga terjangkau rasa bintang lima!",
  },
  {
    name: "Dedi Kurniawan",
    rating: 3,
    comment: "Rasa oke, tapi es tehnya kurang manis tadi.",
  },
];

const RatingReview = () => {
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  const { ratings = [], meta, isLoading, query, setQuery } = useRatings();
  const data = ratings || [];

  const totalReviews = data.length;

  const averageRating = totalReviews
  ? (
      data.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
      totalReviews
    ).toFixed(1)
  : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
  const count = data.filter(
      (r) => Number(r.rating) === star
    ).length;

    return {
      star,
      count,
      percent: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    setPendingOrdersCount(
      orders.filter((o) => o.status === "Menunggu").length
    );
  }, []);

  return (
    <AdminLayout>
      <div className="p-[37px]">

        {/* Header Section */}
<div className="flex justify-between items-start mb-6">
  <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
    <h2 className="font-roboto font-extrabold text-[28px] text-white">
      Rating & Review
    </h2>

    <p className="font-roboto text-[18px] text-white mt-[12px]">
      Lihat semua ulasan pelanggan
    </p>
  </div>

  <div
    className="relative cursor-pointer"
    onClick={() => (window.location.href = "/admin/orders")}
  >
    <div className="w-[173px] h-[45px] mt-[18px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 flex items-center pl-[11px]">
        <div className="size-[24px]">
          <img
            alt=""
            src={imgVector3}
            className="size-full object-contain"
          />
        </div>

        <span className="font-roboto font-extrabold text-[18px] text-[#743b0e] ml-[8px]">
          Pesanan Baru
        </span>
      </div>
    </div>

    <div className="absolute -top-[18px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
      <span className="font-roboto font-medium text-[18px] text-[#743b0e]">
        {pendingOrdersCount}
      </span>
    </div>
  </div>
</div>

{/* Statistik */}
<div className="flex gap-4 mb-6">
  {/* Total Review */}
  <div className="w-[320px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white">
    <img
    src="/admin/total review.svg"
    alt="review"
    className="w-16 h-16 mb-4"
  />
    <p className="text-sm opacity-70">
      Total Review
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {totalReviews}
    </h2>

    <p className="mt-2 opacity-70">
      Semua Review Pelanggan
    </p>
  </div>

  {/* Rating & Distribusi */}
  <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white">
    <div className="flex gap-10 items-center">
      <div>
        <p className="text-xl font-semibold">
          Reviews
        </p>

        <h2 className="text-5xl font-bold mt-2">
          {averageRating}
        </h2>

        <p className="mt-2 opacity-80">
          ({totalReviews} Review)
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {ratingDistribution.map((item) => (
          <div
            key={item.star}
            className="flex items-center gap-3"
          >
            <span className="w-8">
              {item.star}★
            </span>

            <div className="flex-1 h-3 bg-white/20 rounded-full">
              <div
                className="h-3 bg-yellow-400 rounded-full"
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>

            <span className="w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        {/* Reviews List */}
        <div
        className="
          bg-white/5
          backdrop-blur-md
          border
          border-white/10
          rounded-[15px]
          p-[24px]
          hover:bg-white/10
          hover:scale-[1.01]
          transition-all
          duration-300
          shadow-[0_10px_20px_rgba(0,0,0,0.15)]
          space-y-[16px]
        ">
          {ratings?.map((review, i) => (
            <div
              key={i}
              className="
              rounded-[15px]
              border
              border-white/10
              bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.08)_100%)]
              backdrop-blur-xl
              shadow-[inset_0_10px_10px_-8px_rgba(255,255,255,0.2),0_0_20px_rgba(0,0,0,0.15)]
              p-[24px]
              hover:bg-white/10
              hover:scale-[1.01]
              transition-all
              duration-300
            "
            >
              <div className="flex justify-between items-center mb-[10px]">
                <h4 className="font-roboto font-bold text-[18px] text-white">
                  {review?.name ?? "anonymous"}
                </h4>
                <div className="flex">
                  {[...Array(5)].map((_, star) => (
                    <div
                      key={star}
                      className="size-[20px] relative flex items-center justify-center"
                    >
                      <img
                        alt="star"
                        src={imgVector}
                        className={`size-full object-contain ${star < review.rating ? "opacity-100" : "opacity-20"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-roboto text-[16px] text-white/80 italic">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RatingReview;