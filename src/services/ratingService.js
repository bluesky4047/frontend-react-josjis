import { api } from "./api";

export const ratingService = {
  submitRating: async (ratingData) => {
    // ratingData expects: { orderId, rating, comment }
    const res = await api.post("/ratings", {
      orderId: ratingData.orderId,
      rating: Number(ratingData.rating),
      comment: ratingData.comment || ratingData.review || "",
    });
    return res.data;
  }
};
