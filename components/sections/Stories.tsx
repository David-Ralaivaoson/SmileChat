"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSession } from "@/lib/auth-client";

export default function Stories() {
  const {data, isPending} = useSession()
  const {isMobile} = useIsMobile()
  const perView = isMobile ? 3 : 4
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: perView, spacing: 2 }, // espacement réduit à 4px
  });

  // Autoplay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function autoplay() {
      timer = setTimeout(() => {
        instanceRef.current?.next();
        autoplay();
      }, 10000);
    }
    autoplay();
    return () => clearTimeout(timer);
  }, [instanceRef]);

  const stories = [
    { id: "1", name: "Alice", img: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "David", img: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Sophie", img: "https://i.pravatar.cc/150?img=3" },
    { id: "4", name: "Lucas", img: "https://i.pravatar.cc/150?img=4" },
    { id: "5", name: "Emma", img: "https://i.pravatar.cc/150?img=5" },
  ];

  return (
    <section id="Stories">
      <h1 className="font-semibold text-xl mb-2">Stories</h1>
      <div className="flex items-center gap-1 w-full overflow-hidden">
        {/* Bloc Add Story (fixe) */}
        <div className=" relative flex-shrink-0 w-[80px] h-38 bg-red-100 flex flex-col items-center justify-end rounded-xl overflow-hidden">
            {data?.user.image ? (
              <Image src={data.user.image} alt={`Profil de ${data.user.name}`} />
            ) : (
              <h1 className="text-bold text-6xl text-center">{data?.user.name[0]}</h1>
            )}
          <div className=" relative w-12 h-12 rounded-xl bg-gray-200 flex flex-col items-center justify-center shadow-md overflow-hidden">
            <button className=" bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg shadow">
              +
            </button>
          </div>
          <span className="mt-1 text-xs font-medium text-gray-700">
            Ajouter
          </span>
        </div>

        {/* Carousel Stories */}
        <div ref={sliderRef} className="keen-slider flex flex-1">
          {stories.map((story) => (
            <div
              key={story.id}
              className="keen-slider__slide relative h-38 flex flex-col items-center cursor-pointer rounded-xl overflow-hidden"
            >
              <div className="relative w-48 h-full rounded-xl bg-red-200 shadow-md overflow-hidden">
                {/* <Image
                  src={story.img}
                  alt={story.name}
                  fill
                  className="object-cover"
                /> */}
              </div>
              <span className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gray-100"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
