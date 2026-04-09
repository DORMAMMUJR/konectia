import type { Payment } from "@/types";
import mockPayments from "./mocks/payments.json";

export async function getPayments(): Promise<Payment[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPayments as Payment[]), 500);
  });
}
