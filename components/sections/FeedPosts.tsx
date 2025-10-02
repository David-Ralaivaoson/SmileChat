"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaEllipsisVertical } from "react-icons/fa6";

interface FeedPost {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  tags: string[];
}

const mockPosts: FeedPost[] = [
  {
    id: 1,
    title: "Un design futuriste pour l’ère moderne",
    description:
      "Découvrez comment le design numérique réinvente l’élégance et le luxe à travers les expériences immersives.",
    image: "images/posts/1.jpg",
    author: "Élodie Laurent",
    authorAvatar: "images/users/user.png",
    date: "01 Oct 2025",
    tags: ["Design", "Innovation", "Luxe"],
  },
  {
    id: 2,
    title: "L’IA au service de l’élégance",
    description:
      "Intelligence artificielle et créativité : une nouvelle alliance pour façonner l’avenir de l’esthétique.",
    image: "images/posts/2.jpg",
    author: "David Moreau",
    authorAvatar: "images/users/user.png",
    date: "30 Sep 2025",
    tags: ["IA", "Futur", "Technologie"],
  },
];


export default function FeedPosts() {
  return (
    <main className="w-full bg-gradient-to-br p-2 px-0">
      <h1 className="font-semibold text-xl mb-2">Fil d'actualités</h1>
      <div className="grid grid-cols-1 gap-6">
        {mockPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl transition-transform hover:shadow-2xl">
                <div className="flex items-center justify-between mx-2">
                    <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-slate-400">{post.date}</p>
                    </div>
                  </div>
                    <Button variant="ghost">
                        <FaEllipsisVertical size={18}/>
                    </Button>
                </div>
              <div className="relative w-full overflow-hidden max-h-[450px] bg-gray-200">
                {/* <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                /> */}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 leading-relaxed">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="rounded-full bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 text-white border border-white/10"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white shadow-md hover:opacity-90"
                  >
                    Lire +
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
