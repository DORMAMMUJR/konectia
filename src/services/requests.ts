import type { ServiceRequest } from "@/types";
import mockRequests from "./mocks/requests.json";

export async function getRequests(): Promise<ServiceRequest[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRequests as ServiceRequest[]), 600);
  });
}
