// app/api/users/[id]/route.ts
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma" // adapte ton chemin
import { put } from "@vercel/blob"

// ✅ Validation avec Zod
const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  image: z.string().optional(), // peut contenir une URL déjà uploadée
})

/**
 * GET /api/users/[id]
 * Récupère un utilisateur + relations
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ attendre params
  try {
    const user = await prisma.user.findUnique({
      where: { id: id }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/users/[id]
 * Modifie un utilisateur + upload image
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ⚡ On gère FormData (utile pour l'upload d'image)
    const formData = await req.formData()

    const name = formData.get("name") as string | null
    const email = formData.get("email") as string | null
    const file = formData.get("image") as File | null

    // ✅ Validation Zod (sans l’image pour l’instant)
    const parsed = updateUserSchema.safeParse({
      name,
      email,
      image: file ? file.name : undefined,
    })
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    let imageUrl: string | undefined = undefined

    // ⚡ Upload image si présente
    if (file) {
      const blob = await put(`users/${params.id}-${file.name}`, file, {
        access: "public", // rend l’URL publique
      })
      imageUrl = blob.url
    }

    // ✅ Mise à jour dans Prisma
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(parsed.data.name && { name: parsed.data.name }),
        ...(parsed.data.email && { email: parsed.data.email }),
        ...(imageUrl && { image: imageUrl }),
      },
      
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    )
  }
}
