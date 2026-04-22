import { prisma } from "@/lib/prisma";
import type { Payment } from "@/types";

export async function getPayments(userId?: string): Promise<Payment[]> {
  const where = userId
    ? { project: { OR: [{ clientId: userId }, { professionalId: userId }] } }
    : {};

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return payments.map((pay) => ({
    id: pay.id,
    description: pay.description,
    amount: pay.amount,
    status: pay.status as "received" | "released" | "pending",
    date: pay.date.toISOString().split("T")[0],
    transactionId: pay.transactionId,
  }));
}
