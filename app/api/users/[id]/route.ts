// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { put } from "@vercel/blob"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { updateUserSchema } from "@/schema/user/updateUser.schema"

// ✅ Validation avec Zod


/**
 * GET /api/users/[id]
 * Récupère un utilisateur + relations
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ attendre params
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts:true
      }
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  try {
    const userSession = auth.api.getSession({
      headers: await headers()
    })
    const userConnected = await userSession
    if(!userConnected) return NextResponse.json({ error: "Non connecté" }, { status: 404 })

    if (userConnected.user.id !== id) {
      return NextResponse.json({error: `tu dois être ${userConnected.user.name} pour effectuer cette modification !`})
    }
    const body = await req.json()

    const data = {
      firstname: body.firstname,
      lastname: body.lastname,
      bio: body.bio,
      phoneNumber: body.phoneNumber,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
    }

    // ⚡ Gestion image
    // const file = formData.get("image") as File | null
    // if (file) {
    //   const blob = await put(`users/${id}-${file.name}`, file, { access: "public" })
    //   data.image = blob.url
    // }

    // ✅ Validation Zod
    const parsed = updateUserSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }

    // ✅ Mise à jour Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: parsed.data,
    })

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 })
  }
}
