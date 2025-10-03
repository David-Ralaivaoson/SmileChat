import { useQuery } from "@tanstack/react-query"

async function fetchUser(userId: string) {
  const res = await fetch(`/api/users/${userId}`)
  if (!res.ok) throw new Error("Erreur lors du fetch utilisateur")
  return res.json()
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 1000 * 60, // 1 min avant revalidation
  })
}

async function fetchUsers() {
  const res = await fetch(`/api/users`)
  if (!res.ok) throw new Error("Erreur lors du fetch des utilisateurs")
  return res.json()
}
export function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60, // 1 min avant revalidation
  })
}
