import api from "./api";

export const reviewService = {

  getReviews: async (foodId) => {

    const res = await api.get(`/reviews/${foodId}`);

    return res.data;

  },

  addReview: async (data) => {

    const res = await api.post("/reviews", data);

    return res.data;

  }

};