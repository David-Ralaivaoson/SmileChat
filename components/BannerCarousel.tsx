"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true,  })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-screen block mx-0 mx-auto h-4"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="mx-0 h-[500px] ">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6"> 
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden"/>
      <CarouselNext className="hidden"/>
    </Carousel>
  )
}
