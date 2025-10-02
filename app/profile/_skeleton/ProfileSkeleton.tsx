// app/profile/SkeletonProfile.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function SkeletonProfile() {
  return (
    <div className="max-w-5xl mx-auto p-4 h-[calc(100vh-82px)] animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row p-4 md:p-6 md:px-24 gap-6 shadow-lg rounded-2xl">
        <div className="flex flex-1 flex-col md:flex-row md:p-6 md:px-24 items-center gap-6">
          <div className="flex justify-center md:justify-start">
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 w-40 rounded-md" />
            </div>
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <Skeleton className="h-4 w-12 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-14 rounded-md" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-1 w-full rounded-md" /> {/* Separator */}
              <Skeleton className="h-3 w-64 mx-auto md:mx-0 rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32 rounded-md" /> {/* EditProfile */}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex gap-6 mt-8 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="h-3 w-12 mt-2 rounded-md" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 space-y-4">
        <div className="grid w-full grid-cols-3 max-w-md mx-auto gap-2">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>

        {/* Message vide au lieu des posts */}
        <div className="mt-4">
          <Skeleton className="h-4 w-64 mx-auto rounded-md" />
        </div>
      </div>
    </div>
  );
}
