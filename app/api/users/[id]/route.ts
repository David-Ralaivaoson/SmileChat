// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { updateUserSchema } from "@/schema/user/updateUser.schema"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    const userSession = auth.api.getSession({ headers: await headers() })
    const userConnected = await userSession

    if (!userConnected) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 })
    }

    if (userConnected.user.id !== id) {
      return NextResponse.json(
        { error: `Tu dois être ${userConnected.user.name} pour effectuer cette modification !` },
        { status: 403 }
      )
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

    const parsed = updateUserSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: parsed.data,
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Erreur lors de la modification" },
      { status: 500 }
    )
  }
}
