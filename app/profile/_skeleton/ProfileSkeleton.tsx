// app/profile/SkeletonProfile.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function SkeletonProfile() {
  return (
    <div className="max-w-5xl mx-auto p-4 animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <Skeleton className="h-36 w-36 rounded-full" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Skeleton className="h-8 w-40 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
          <div className="flex gap-6 text-sm mt-2">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>
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

        {/* Posts Skeleton */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card
              key={i}
              className="relative aspect-square overflow-hidden"
            >
              <Skeleton className="absolute inset-0 w-full h-full rounded-sm" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
