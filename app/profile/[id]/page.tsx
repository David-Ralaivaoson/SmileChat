// app/profile/[id]/page.tsx

import UserProfileClient from "./UserProfile"


interface ProfilePageProps {
  params: Promise<{ id: string }> // params est un Promise maintenant
}

export default async function ShowProfilePage({ params }: ProfilePageProps) {
  const { id } = await params // ✅ attendre le promise

  return <UserProfileClient userId={id} />
}
