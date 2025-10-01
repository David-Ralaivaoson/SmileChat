import LeftSidebar from "@/components/layout/LeftSidebar";
import MainFeed from "@/components/layout/MainFeed";
import RightSidebar from "@/components/layout/RightSidebar";

export default function HomePage() {
  return (
  <main className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 
                  md:gap-x-4 md:px-4 md:max-w-7xl md:mx-auto pt-4">

    {/* Sidebar gauche */}
    <section className="hidden md:block md:col-span-1 lg:col-span-3 h-[calc(100vh-82px)] overflow-y-auto">
      <LeftSidebar />
    </section>

    {/* Centre / MainFeed */}
    <section className="col-span-1 md:col-span-3 lg:col-span-6 
                      h-screen md:h-[calc(100vh-82px)] overflow-y-auto 
                      md:px-0 md:mx-0">
      <MainFeed />
    </section>

    {/* Sidebar droite */}
    <section className="hidden lg:block lg:col-span-3 h-[calc(100vh-82px)] overflow-y-auto">
      <RightSidebar />
    </section>
  </main>

  );
}
