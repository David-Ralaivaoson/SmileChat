"use client"

import { useAllUsers } from '@/actions/api/user'
import { Users } from '@/types/users'
import Link from 'next/link'
import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { Skeleton } from "@/components/ui/skeleton"

export default function UsersSugg() {
  const { data: users, isLoading, error } = useAllUsers()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.5,
      spacing: 15,
    },
  })

  if (isLoading) return <div className="text-center py-10"><UsersSuggSkeleton /></div>
  if (error) return <div className="text-center py-10 text-red-500">Error loading users</div>

  return (
    <div className="w-full">
      <div className="relative">
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {users.map((user: Users) => (
            <div key={user.id} className="keen-slider__slide">
              <Link
                href={`/profile/${user.id}`}
                className="bg-white h-full shadow-md rounded-xl border border-gray-200 p-3 flex flex-col items-center hover:scale-105 transform transition duration-300"
              >
                
                  <img
                    src={user.image ?? "/images/users/user.png"}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200"
                  />
                <h3 className="mt-2 font-semibold text-sm text-gray-800 text-center">
                  {user.name}
                </h3>
                <span className="mt-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  Prestataire
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Flèches */}
        {slider && (
          <>
            <button
              onClick={() => slider.current?.prev()}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-indigo-100 transition"
            >
              ‹
            </button>
            <button
              onClick={() => slider.current?.next()}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-indigo-100 transition"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  )
}


function UsersSuggSkeleton() {
  // Nombre de slides fictifs
  const slides = Array.from({ length: 5 })

  return (
    <div className="w-full">
      <div className="relative">
        {/* Slider Skeleton */}
        <div className="flex space-x-4 overflow-hidden h-full">
          {slides.map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-36 h-full bg-white shadow-md rounded-xl border border-gray-200 p-3 flex flex-col items-center"
            >
              {/* Image ronde */}
              <Skeleton className="w-20 h-20 rounded-full border-2 border-indigo-500 animate-pulse" />

              {/* Nom */}
              <Skeleton className="mt-2 w-16 h-4 rounded animate-pulse" />

              {/* Badge */}
              <Skeleton className="mt-1 w-20 h-3 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Flèches */}
        <button className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 opacity-50 cursor-not-allowed">
          ‹
        </button>
        <button className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 opacity-50 cursor-not-allowed">
          ›
        </button>
      </div>
    </div>
  )
}