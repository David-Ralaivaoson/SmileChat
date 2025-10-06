import { UserUpdateFormData } from "@/schema/user/updateUser.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

async function fetchUser(userId: string) {
  const res = await fetch(`/api/users/${userId}`)
  if (!res.ok) throw new Error("Erreur lors du fetch utilisateur")
  return res.json()
}

export function useUser(userId?: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId
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


async function updateUser(id: string, formData: UserUpdateFormData) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
  console.log(res);
  

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error?.[0]?.message || "Erreur lors de la mise à jour")
  }

  return res.json()
}


export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: UserUpdateFormData) => updateUser(id, formData),
    onSuccess: (data) => {
      // ✅ Revalidation du cache pour la query "user"
      queryClient.invalidateQueries({ queryKey: ["user", id] })
    },
    onError: (error: Error) => {
      toast(`${error.name} : ${error.message}`)
    },
  })
}
