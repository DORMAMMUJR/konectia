import type { Review } from "@/types";
import mockReviews from "./mocks/reviews.json";

export async function getReviews(): Promise<Review[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReviews as Review[]), 600);
  });
}
