import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function HeaderSkeleton({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
        className
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2 flex-1">
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Skeleton className="h-8 w-8 rounded-md" /> {/* logo */}
            <Skeleton className="hidden lg:block h-6 w-28 rounded-md" /> {/* SmileChat text */}
          </div>

          {/* Navigation menu */}
          <div className="flex flex-1 items-center justify-center w-full">
            <div className="flex flex-1 items-center w-full gap-8">
              {/* Search input (desktop only) */}
              <div className="hidden md:block flex-1">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              {/* Nav icons */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center justify-end gap-3">
          <Skeleton className="h-8 w-8 rounded-md" /> {/* ModeToggle */}
          <Skeleton className="h-9 w-20 rounded-md" /> {/* AuthButton */}
        </div>

        {/* Mobile search */}
        <div className="md:hidden">
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
      </div>
    </header>
  )
}
