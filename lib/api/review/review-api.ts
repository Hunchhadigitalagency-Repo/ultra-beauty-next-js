import api from "@/services/api-instance";

export const postReview = async (slug_name: string, review: string, rating: string) => {
    const response = await api.post("/reviews/", {
        slug_name,
        review,
        rating
    });
    return response;
};
