"use client"

import React from "react"
import { useSession } from "@/lib/auth-client"
import { useUser } from "@/actions/api/user"
import { redirect } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import EditProfile from "../EditProfile"
import SkeletonProfile from "../_skeleton/ProfileSkeleton"
import { getRequiredUser } from "@/actions/auth-session"

interface Props {
  userId: string
}

export default function UserProfileClient({ userId }: Props) {
  const { data : user, isPending, error } = useUser(userId)
  const {data : session} = useSession()
  if(session?.user.id === userId){
    redirect('/profile')
  }
  
  if (isPending) return <SkeletonProfile />
  if (!user) return <p>Utilisateur non trouvé</p>
  if (error) return <p>Erreur: {error.message}</p>




  // Redirection si l'utilisateur n'est pas le propriétaire
 

  return (
    <div className="max-w-5xl mx-auto p-4 h-[calc(100vh-82px)] dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row p-4 md:p-6 md:px-24 gap-6 shadow-lg rounded-2xl">
        <div className="flex flex-1 flex-col md:flex-row md:p-6 md:px-24 items-center gap-6">
          <div className="flex justify-center md:justify-start">
            <Avatar className="h-36 w-36">
              <AvatarImage src={user?.image ?? "/images/users/user.png"} alt="User Avatar" />
              <AvatarFallback>
                <h1 className="font-black text-gray-500 text-xl text-center">
                  {user?.name[0]}
                </h1>
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
            </div>
            <div className="flex justify-center md:justify-start gap-6 mt-4 text-sm">
              <span>
                <b>0</b> posts
              </span>
              <span>
                <b>0</b> followers
              </span>
              <span>
                <b>0</b> following
              </span>
            </div>
            <div className="mt-4">
              <Separator />
              <p className="text-center md:text-start text-sm text-muted-foreground">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex gap-6 mt-8 overflow-x-auto pb-2">
        {["Travel", "Food", "Friends", "Work"].map((highlight) => (
          <div key={highlight} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden" />
            <span className="text-xs mt-2">{highlight}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="reels">Reels</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4">
          <p className="text-center text-muted-foreground">Aucun Publication pour le moment.</p>
        </TabsContent>
        <TabsContent value="reels" className="mt-4">
          <p className="text-center text-muted-foreground">Aucun réelle pour le moment.</p>
        </TabsContent>
        <TabsContent value="tagged" className="mt-4">
          <p className="text-center text-muted-foreground">Aucun publication taggé pour le moment.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
