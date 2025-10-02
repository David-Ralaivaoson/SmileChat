// app/profile/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import SkeletonProfile from "./_skeleton/ProfileSkeleton";
import { Separator } from "@/components/ui/separator";
import EditProfile from "./EditProfile";

export default function ProfilePage() {
    const {data, isPending} = useSession()
    const user = data?.user
    if(isPending){
        return <SkeletonProfile />
    }

  return (
    <div className="max-w-5xl mx-auto p-4 h-[calc(100vh-82px)] dark:text-white ">
      {/* Header */}
      <div className="flex flex-col md:flex-row p-4 md:p-6 md:px-24 gap-6 shadow-lg rounded-2xl">
        <div className="flex flex-1 flex-col md:flex-row md:p-6 md:px-24 items-center gap-6">
          <div className="flex justify-center md:justify-start">
            <Avatar className="h-36 w-36">
              {/* Ajouter l'avatar ici */}
              <AvatarImage src="/images/users/user.png" alt="User Avatar" />
              <AvatarFallback><h1 className="font-black text-gray-500 text-xl text-center ">{data?.user.name[0]}</h1></AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              {/* <div className="flex gap-2">
                <Button size="sm">Follow</Button>
                <Button variant="secondary" size="sm">
                  Message
                </Button>
              </div> */}
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
                Bio lorem ipsum dolor sit amet ✨
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <EditProfile />
        </div>
      </div>

      {/* Highlights */}
      <div className="flex gap-6 mt-8 overflow-x-auto pb-2">
        {["Travel", "Food", "Friends", "Work"].map((highlight) => (
          <div key={highlight} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden">
              {/* <Image
                src="/avatar.jpg"
                alt={highlight}
                width={64}
                height={64}
                className="object-cover"
              /> */}
            </div>
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
  );
}

const PostCard = ()=>{
  return (
    <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post) => (
              <Card
                key={post}
                className="relative group aspect-square overflow-hidden"
              >
                {/* <Image
                  src={`/posts/${post}.jpg`}
                  alt={`Post ${post}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                /> */}
              </Card>
            ))}
    </div>
  )
}
