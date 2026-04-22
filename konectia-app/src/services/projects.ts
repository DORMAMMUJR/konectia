import type { Project } from "@/types";
import mockProjects from "./mocks/projects.json";

export async function getProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects as Project[]), 600);
  });
}
