import z from "zod";

// Validation avec Zod moderne
export const updateUserSchema = z.object({
  image: z.string().optional().nullable(),
  bio: z.string().max(180, ' 180 caractères maximum').optional(),
  firstname: z.string().min(2, '2 caractères minimum').max(50, '50 caractères maximum').optional().nullable(),
  lastname: z.string().min(2, '2 caractères minimum').max(50, '50 caractères maximum').optional().nullable(),
  phoneNumber: z.string().min(10, 'Le numéro téléphone doit être valide').max(13, 'Le numéro téléphone doit être valide').optional(),
  address: z.string().min(5, 'Adresse requise').max(255).optional(),
  city: z.string().min(5, 'Ville requise').max(100).optional(),
  country: z.string().min(5, 'Pays requis').max(100).optional(),
  postalCode: z.string().min(2, 'Code postal requis').max(20).optional(),
  dateOfBirth: z.date().optional(),
})

export type UserUpdateFormData = z.infer<typeof updateUserSchema>