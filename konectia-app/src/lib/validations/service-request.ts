import { z } from "zod";

export const serviceRequestSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título es demasiado largo"),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(2000, "La descripción es demasiado larga"),
  budgetMin: z
    .number()
    .min(0, "El presupuesto mínimo no puede ser negativo"),
  budgetMax: z
    .number()
    .min(0, "El presupuesto máximo no puede ser negativo"),
  budgetUnit: z.enum(["fixed", "hourly", "daily", "monthly"]),
  urgency: z.enum(["urgent", "new", "standard"]),
  categoryId: z.string().uuid("Selecciona una categoría válida"),
  location: z.string().min(2, "La ubicación es obligatoria"),
}).refine((data) => data.budgetMax >= data.budgetMin, {
  message: "El presupuesto máximo debe ser mayor o igual al mínimo",
  path: ["budgetMax"],
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;
