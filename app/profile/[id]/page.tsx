// app/profile/[id]/page.tsx
'use client'
import { useSession } from "@/lib/auth-client"
import UserProfileClient from "./UserProfile"
import { redirect } from "next/navigation"


interface ProfilePageProps {
  params: Promise<{ id: string }> // params est un Promise maintenant
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params // ✅ attendre le promise

  

  return <UserProfileClient userId={id} />
}
